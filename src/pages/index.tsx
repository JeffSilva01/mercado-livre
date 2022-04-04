import type { NextPage } from 'next';
import { SearchBox } from '../components/SearchBox';

const Home: NextPage = () => {
  return (
    <>
      <SearchBox />
      <h1>hello world!</h1>
    </>
  );
};

export default Home;
