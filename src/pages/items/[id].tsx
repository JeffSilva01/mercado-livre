import { GetStaticPaths, GetStaticProps } from 'next';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { api } from '../../services/api';
import styles from '../../styles/pages/product-items.module.scss';

type ProductProp = {
  item: Item;
  description: string;
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
  soldQuantity: number;
};

type Price = {
  currency: string;
  amount: Number;
  decimals: Number;
};

const Product = ({ item, description }: ProductProp) => {
  const { isFallback } = useRouter();

  if (isFallback) {
    return <h1>loading...</h1>;
  }

  return (
    <div className={styles.container}>
      <section className={styles.sectionDetail}>
        <Image src={item.pictures} alt='foto' width='500' height='500' />
        <div>
          <span>Novo - {item.soldQuantity} vendidos</span>
          <strong>{item.title}</strong>
          <p className={styles.andesMoneyAmount}>
            <span>{item.price.currency}</span>
            <span>{item.price.amount}</span>
            <span className={styles.andesMoneyAmount__cents}>
              {item.price.decimals.toString().padEnd(2, '0')}
            </span>
          </p>
          <button>Comprar</button>
        </div>
      </section>
      {description && (
        <section className={styles.sectionDescription}>
          <h2>Descrição do produto</h2>
          <p>{description}</p>
        </section>
      )}
    </div>
  );
};

export default Product;

export const getStaticPaths: GetStaticPaths = async () => {
  const response = await api.get('/sites/MLB/search?q=:query');

  const ids = response.data.results.map((item: Item) => {
    return { params: { id: item.id } };
  });

  return {
    paths: ids,
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const itemId = context.params?.id;
  let description;

  try {
    const { data } = await api.get(`/items/${itemId}/description`);

    if (data) {
      description = data.text === '' ? data.plain_text : data.text;
    }
  } catch (error) {
    description = '';
  }

  try {
    const { data } = await api.get(`/items/${itemId}`);

    const [amount, decimals] = data.price.toString().split('.');

    const newItem = {
      id: data.id,
      title: data.title,
      pictures: data.pictures[0].url,
      condition: data.condition,
      state: data.seller_address.state.name,
      freeShipping: data.shipping.free_shipping,
      soldQuantity: data.sold_quantity,
      price: {
        amount: Number(amount),
        decimals: decimals ? Number(decimals) : 0,
        currency: 'R$',
      },
    };

    return {
      props: {
        item: newItem,
        description,
      },
      revalidate: 5 * 60, // 5 minutes
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
};
