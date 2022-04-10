import Image from 'next/image';
import Link from 'next/link';
import styles from '../../styles/components/ProductCard.module.scss';

type ProductCardProps = {
  item: Item;
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

export function ProductCard({ item }: ProductCardProps) {
  return (
    <div className={styles.container}>
      <Image
        src={item.pictures}
        alt='teste'
        width='180'
        height='180'
        className={styles.productImage}
      />
      <div className={styles.sectionDetail}>
        <p className={styles.andesMoneyAmount}>
          <span>{item.price.currency}</span>
          <span>{item.price.amount}</span>
          <span className={styles.andesMoneyAmount__cents}>
            {item.price.decimals && '00'}
          </span>
          {item.free_shipping && (
            <Image
              src='/images/ic_shipping.png'
              width='20'
              height='20'
              alt='seal'
            />
          )}
        </p>

        <Link href={`/items/${item.id}`}>
          <a>{item.title}</a>
        </Link>
        <p>{item.condition}</p>
      </div>
      <span>{item.state}</span>
    </div>
  );
}
