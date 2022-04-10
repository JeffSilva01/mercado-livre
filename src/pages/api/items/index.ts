import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';

type ResponseType = {
  results: Item[];
  available_filters: Available_filters[];
};

type Available_filters = {
  name: string;
  values: Value[];
};

type Value = {
  name: string;
};

type Item = {
  id: string;
  title: string;
  thumbnail: string;
  shipping: { free_shipping: boolean };
  condition: string;
  address: { state_name: string };
  price: number;
};

export default async function getItem(
  request: NextApiRequest,
  response: NextApiResponse
) {
  try {
    const searchResponse = await axios.get<ResponseType>(
      `https://api.mercadolibre.com/sites/MLA/search?q=${request.query.search}`
    );

    const filterCategory = searchResponse.data.available_filters.find(
      (filter) => filter.name === 'Categorías'
    );

    const items = searchResponse.data.results.map((item) => {
      const [amount, decimals] = item.price.toString().split('.');

      const newItem = {
        id: item.id,
        title: item.title,
        pictures: item.thumbnail,
        free_shipping: item.shipping.free_shipping,
        condition: item.condition,
        state: item.address.state_name,
        price: {
          currency: 'R$',
          amount: Number(amount),
          decimals: Number(decimals),
        },
      };

      return newItem;
    });

    const data = {
      items,
      categories: filterCategory?.values.map((category) => category.name),
    };

    response.status(200).json(data);
  } catch (error) {
    response.status(500).json({ error: true, message: 'error' });
  }
}
