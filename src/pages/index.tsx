import axios from 'axios';
import { ProductCard } from '../components/ProductCard';
import styles from '../styles/pages/home.module.scss';

type ProductProps = {
  items: Item[];
  categories: String[];
};

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

const Home = ({ items }: ProductProps) => {
  return (
    <div className={styles.container}>
      {items.map((item) => (
        <ProductCard key={item.id} item={item} />
      ))}
    </div>
  );
};

export default Home;

export async function getServerSideProps() {
  const response = await axios.get('/api/items?search=:query');

  return {
    props: {
      items: response.data.items,
      categories: response.data.categories,
    },
  };
}
