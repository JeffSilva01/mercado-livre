import Image from 'next/image';
import api from '../../services/api';
import styles from '../../styles/pages/product-items.module.scss';

type ProductProp = {
  item: Item;
};

type Item = {
  id: string;
  title: string;
  price: Price;
  pictures: string;
  condition: string;
  free_shipping: Boolean;
  sold_quantity: Number;
  description: string;
};

type Price = {
  currency: string;
  amount: Number;
  decimals: Number;
};

const Product = ({ item }: ProductProp) => {
  return (
    <div className={styles.container}>
      <section className={styles.sectionDetail}>
        <Image src={item.pictures} alt='foto' width='500' height='500' />
        <div>
          <span>Novo - 234 vendidos</span>
          <strong>{item.title}</strong>
          <p className={styles.andesMoneyAmount}>
            <span>{item.price.currency}</span>
            <span>{item.price.amount}</span>
            <span className={styles.andesMoneyAmount__cents}>
              {item.price.decimals}
            </span>
          </p>
          <button>Comprar</button>
        </div>
      </section>
      {item.description && (
        <section className={styles.sectionDescription}>
          <h2>Descrição do produto</h2>
          <p>{item.description}</p>
        </section>
      )}
    </div>
  );
};

export default Product;

type getItems = {
  items: Item[];
};

export async function getStaticPaths() {
  const response = await api.get<getItems>('/api/items?search=:query');

  return {
    paths: response.data.items.map((item) => ({
      params: {
        id: item.id,
      },
    })),
    fallback: true,
  };
}

type Params = {
  params: {
    id: string;
  };
};

export async function getStaticProps({ params }: Params) {
  const response = await api.get(`/api/items/${params.id}`);

  return {
    props: {
      item: response.data,
    },
    revalidate: 5 * 60, // 5 minutos
  };
}
