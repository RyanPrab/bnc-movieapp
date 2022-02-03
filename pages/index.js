import Head from 'next/head'
import Layout from '../components/Layout'
import axios from 'axios';
import MovieList from '../components/MovieList';
import MovieLang from '../assets/lang/movies.json';
import { useRouter } from 'next/router';
import styled from 'styled-components';

const Title = styled.div.attrs(() => ({
  className: `text-md md:text-lg text-amber-400 font-semibold`
}))``;

const Description = styled.div.attrs(() => ({
  className: `text-sm md:text-md font-semibold`
}))``;

export default function Home(props) {
  const { movies } = props;
  const { locale } = useRouter();
  const movieLang = MovieLang?.lang?.filter(m => m.locale === locale);

  return (
    <Layout>
      <div>
        <Head>
          <title>Bank Neo Commerce - Frontend Test</title>
          <meta name="description" content="Bank Neo Commerce" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <div className="flex flex-col items-center flex-1 flex-shrink-0 space-y-4">
          <div className='container'>
            <Title>
              {movieLang[0].introTitle}
            </Title>
            <Description>
              {movieLang[0].introDesc}
            </Description>
          </div>
          <MovieList movies={movies?.data} movieLang={movieLang[0]} />
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
