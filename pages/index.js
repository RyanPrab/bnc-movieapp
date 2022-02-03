import Head from 'next/head'
import Layout from '../components/Layout'
import axios from 'axios';
import MovieList from '../components/MovieList';

export default function Home(props) {
  const { movies } = props;
  return (
    <Layout>
      <div>
        <Head>
          <title>Bank Neo Commerce - Frontend Test</title>
          <meta name="description" content="Bank Neo Commerce" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <div className="flex flex-col items-center flex-1 flex-shrink-0">
          <MovieList movies={movies?.data}/>
        </div>
      </div>
    </Layout>
  )
}

export async function getServerSideProps(context) {
  const endpoint = `https://private-2fff44-bncfetest.apiary-mock.com/movies`;
  const movieResp = await axios.get(endpoint)
    .catch(err => {
      if (process.env.NODE_ENV === 'development') {
        console.error(err);
      }

      return null;
    });

  const movies = movieResp?.data;
  return {
    props: {
      movies: movies || null
    }
  }
}
