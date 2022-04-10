import type { AppProps } from 'next/app';
import { SearchBox } from '../components/SearchBox';
import '../styles/globals.scss';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <SearchBox />
      <div className='container'>
        <Component {...pageProps} />
      </div>
    </>
  );
}

export default MyApp;
