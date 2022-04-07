import { useEffect } from 'react';
import api from '../../../services/api';

const Product = () => {
  useEffect(() => {
    async function getProduct() {
      const response = await api.get('/items/MLA1119448510');
      console.log(
        '🚀 ~ file: [id].tsx ~ line 7 ~ useEffect ~ response',
        response.data
      );
    }
    getProduct();
  }, []);

  return <h1>Product</h1>;
};

export default Product;
