import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function getItem(
  request: NextApiRequest,
  response: NextApiResponse
) {
  try {
    const itemResponse = await axios.get(
      `https://api.mercadolibre.com/items/${request.query.id}`
    );
    const descriptionResponse = await axios.get(
      `https://api.mercadolibre.com/items/${request.query.id}/description`
    );

    const [amount, decimals] = itemResponse.data.price.toString().split('.');

    const item = {
      id: itemResponse.data.id,
      title: itemResponse.data.title,
      price: {
        currency: 'R$',
        amount: Number(amount),
        decimals: Number(decimals),
      },
      pictures: itemResponse.data.pictures[0].url,
      condition: itemResponse.data.condition,
      free_shipping: itemResponse.data.shipping.free_shipping,
      sold_quantity: itemResponse.data.sold_quantity,
      description: descriptionResponse.data.text,
    };

    response.status(200).json(item);
  } catch (error) {
    response.status(500).json({ error: true, message: 'error' });
  }
}
