import Image from 'next/image';

export function SearchBox() {
  return (
    <header>
      <section>
        <Image
          src='/images/Logo_ML.png'
          width='50'
          height='35'
          alt='Mercado Livre Brasil - Onde comprar e vender de Tudo'
        />
        <div>
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
