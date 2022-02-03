import Head from 'next/head'
import Layout from '../components/Layout'
import MovieList from '../components/MovieList';
import MovieLang from '../assets/lang/movies.json';
import { useRouter } from 'next/router';
import { useWishlistContext } from "../context/wishlist";
import { MehTwoTone, MehOutlined } from '@ant-design/icons';
import styled from 'styled-components';

const EmptyState = styled.div.attrs(() => ({
  className: `flex flex-col space-y-4 items-center`
}))``;

const TextEmptyState = styled.div.attrs(() => ({
  className: `text-sm md:text-md font-semibold`
}))``;

export default function MyFavorite(props) {
  const [{ wishlist }] = useWishlistContext();
  const { locale } = useRouter();
  const movieLang = MovieLang?.lang?.filter(m => m.locale === locale);

  return (
    <Layout>
      <div>
        <Head>
          <title>Bank Neo Commerce - My Favorite</title>
          <meta name="description" content="Bank Neo Commerce" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <div className="flex flex-col items-center flex-1 flex-shrink-0 space-y-4">
          {wishlist?.length > 0 ? (
            <MovieList movies={wishlist} movieLang={movieLang[0]} />
          ) : (
            <EmptyState>
              <MehOutlined style={{ fontSize: 100 }}/>
              <TextEmptyState>
                {movieLang[0].emptyText}
              </TextEmptyState>
            </EmptyState>
          )}
        </div>
      </div>
    </Layout>
  )
}
