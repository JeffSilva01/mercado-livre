import { NextApiRequest, NextApiResponse } from 'next';
import api from '../../../services/api';

export default async function getItem(
  request: NextApiRequest,
  response: NextApiResponse
) {
  try {
    const itemResponse = await api.get(
      `https://api.mercadolibre.com/items/${request.query.id}`
    );
    const descriptionResponse = await api.get(
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
