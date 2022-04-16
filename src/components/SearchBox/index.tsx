import Image from 'next/image';
import { useRouter } from 'next/router';
import { useRef } from 'react';
import styles from '../../styles/components/SearchBox.module.scss';

export function SearchBox() {
  const inputSearchRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  function pushSearch() {
    const inputSearchValue = inputSearchRef?.current?.value;
    router.push(`/?search='${inputSearchValue}`);
  }

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
          <input
            ref={inputSearchRef}
            type='text'
            placeholder='Nunca pare de buscar'
            onKeyUp={(event) => {
              event.code === 'Enter' && pushSearch();
            }}
          />
          <button onClick={pushSearch}>
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
