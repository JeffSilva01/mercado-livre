import axios from 'axios';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { ProductCard } from '../../components/ProductCard';
import styles from '../../styles/pages/home.module.scss';

type Item = {
  id: string;
  title: string;
  price: {
    currency: string;
    amount: Number;
    decimals: Number;
  };
  pictures: string;
  condition: string;
  free_shipping: boolean;
  state: string;
};

const Items: NextPage = () => {
  const [products, setProducts] = useState<Item[]>([]);
  const { query } = useRouter();

  useEffect(() => {
    async function getProducts() {
      const response = await axios.get(
        `https://mercado-pago.vercel.app/api/items?search=${query.search}`
      );
      setProducts(response.data.results);
    }

    getProducts();
  }, [query.search]);

  return (
    <div className={styles.container}>
      {products.map((product) => (
        <ProductCard key={product.id} item={product} />
      ))}
    </div>
  );
};

export default Items;
