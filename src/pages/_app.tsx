import type { AppProps } from 'next/app';
import { SearchBox } from '../components/SearchBox';
import '../styles/globals.scss';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <SearchBox />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
