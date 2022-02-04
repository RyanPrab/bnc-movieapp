import Head from 'next/head'
import Layout from '../../components/Layout'
import axios from 'axios';
import DetailMovie from '../../components/DetailMovie';
import MovieLang from '../../assets/lang/movies.json';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import { ArrowLeftOutlined } from '@ant-design/icons';

const Title = styled.h1.attrs(() => ({
  className: `text-md md:text-lg text-amber-400 font-semibold`
}))``;

const Description = styled.div.attrs(() => ({
  className: `text-sm md:text-md font-semibold`
}))``;

export default function DetailPage(props) {
  const { movies } = props;
  const router = useRouter();
  const locale = router?.locale;
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
            <ArrowLeftOutlined
              className="text-black h-7 w-7 xs:h-8 xs:w-8 cursor-pointer px-1"
              onClick={() => { router.back(); }}
            />
            <Title>
              {movieLang[0].introTitle}
            </Title>
            <Description>
              {movieLang[0].introDesc}
            </Description>
          </div>
          <DetailMovie movie={movies?.data} />
        </div>
      </div>
    </Layout>
  )
}

export async function getServerSideProps(context) {
  const { query } = context;
  const id = query?.slug;
  const endpoint = `https://private-2fff44-bncfetest.apiary-mock.com/movies/${id}`;
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
