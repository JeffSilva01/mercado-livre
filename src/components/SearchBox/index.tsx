import Image from 'next/image';
import styles from '../../styles/components/SearchBox.module.scss';

export function SearchBox() {
  return (
    <header className={styles.header}>
      <section>
        <Image
          src='/images/Logo_ML.png'
          width='53'
          height='36'
          alt='Mercado Livre Brasil - Onde comprar e vender de Tudo'
        />
        <div className={styles.search}>
          <input type='text' />
          <button>
            <Image
              src='/images/ic_Search.png'
              width='20'
              height='20'
              alt='Mercado Livre Brasil - Onde comprar e vender de Tudo'
            />
          </button>
        </div>
      </section>
    </header>
  );
}
