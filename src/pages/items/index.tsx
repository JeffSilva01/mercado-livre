import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { ProductCard } from '../../components/ProductCard';
import api from '../../services/api';
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

type SellerAddress = {
  state: {
    id: string;
    name: string;
  };
};

const Items: NextPage = () => {
  const [products, setProducts] = useState<Item[]>([]);
  const { query } = useRouter();

  useEffect(() => {
    async function getProducts() {
      const response = await api.get(`/api/items?search=${query.search}`);
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
