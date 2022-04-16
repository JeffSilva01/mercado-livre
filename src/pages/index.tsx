import { GetServerSideProps } from 'next';
import { ProductCard } from '../components/ProductCard';
import { api } from '../services/api';
import styles from '../styles/pages/home.module.scss';

type HomeProps = {
  items: Item[];
  categories: string[];
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

const Home = ({ items }: HomeProps) => {
  return (
    <div className={styles.container}>
      {items.map((item) => (
        <ProductCard key={item.id} item={item} />
      ))}
    </div>
  );
};

export default Home;

type GetItemsResponse = {
  results: Result[];
  available_filters: AvailableFilter[];
};

type AvailableFilter = {
  id: string;
  values: FilterValues[];
};

type FilterValues = {
  name: string;
};

type Result = {
  id: string;
  title: string;
  thumbnail: string;
  condition: string;
  shipping: Shipping;
  address: Address;
  price: number;
};

type Address = {
  state_name: string;
};

type Shipping = {
  free_shipping: true;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const page = context.query.page || '0';
  const search = context.query.search || ':query';

  const response = await api.get<GetItemsResponse>(
    `/sites/MLB/search?q=${search}&offset=${page}`
  );

  const items = response.data.results.map((item) => {
    const [amount, decimals] = item.price.toString().split('.');

    return {
      id: item.id,
      title: item.title,
      pictures: item.thumbnail,
      condition: item.condition,
      state: item.address.state_name,
      freeShipping: item.shipping.free_shipping,
      price: {
        amount: Number(amount),
        decimals: decimals ? Number(decimals) : 0,
        currency: 'R$',
      },
    };
  });
  return {
    props: {
      items,
    },
  };
};
