import React, { useState, useEffect } from 'react';
import 'antd/dist/antd.css';
import { Row, Col, Spin } from 'antd';
import styled from 'styled-components';
import Image from 'next/image';
import { StarFilled } from '@ant-design/icons';
import useWishlistHandler from "../hooks/useWishlistHandler";
import { Button } from 'antd';
import MovieLang from '../assets/lang/movies.json'
import { useRouter } from 'next/router';
import { LoadingOutlined } from '@ant-design/icons';
import InfiniteScroll from 'react-infinite-scroll-component';

const Section = styled.div.attrs(() => ({
  className: `container`
}))``;

const ImageWrapper = styled.div.attrs(() => ({
  className: `relative w-40 h-52 md:w-full md:h-80 mb-4`
}))``;

const Column = styled(Col)`
  padding: 20px 5px 20px 5px;
  border-style: solid;
  border-width: 2px;
  border-radius: 15px;
  margin: 0 10px 0 0;
`;

const MovieInfo = styled(Col)`
  padding-left: 20px;
`;

const Rating = styled(StarFilled)`
  color: #FFFF00;
`;

const FavoriteButton = styled(Button)`
  font-size: 10px;
  font-weight: bold;
`;

export default function MovieList(props) {
  const { movies } = props;
  const { loading, wishlist, addToWishlist, removeWishlist } = useWishlistHandler();
  const { locale } = useRouter();
  const movieLang = MovieLang?.lang?.filter(m => m.locale === locale);
  const [hasMore, setHasMore] = useState(true);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);

  const spinner = <LoadingOutlined style={{ fontSize: 20 }} spin />;

  const showMoreData = () => {
    setPage(page + 1);
    setLimit(limit * page);
    if (limit >= movies.length) {
      setHasMore(false);
    }
  };

  const isBottom = (el) => {
    return el.getBoundingClientRect().bottom <= window.innerHeight;
  };

  useEffect(() => {
    document.addEventListener('scroll', trackScrolling);

    return () => {
      document.removeEventListener('scroll', trackScrolling);
    }
  });

  const trackScrolling = () => {
    const wrappedElement = document.getElementById('movie-list');
    if (isBottom(wrappedElement)) {
      showMoreData();
    }
  };

  return (
    <Section id='movie-list'>
      <Row gutter={[20,8]} align="center">
        {
          movies?.slice(0, limit).map((movie, index) => {
            const exists = wishlist?.find(w => w.id === movie?.id);
            return (
              <Column xs={12} md={8} xl={6} key={index} align="center">
                <ImageWrapper>
                  <Image
                    className="rounded-md"
                    src={movie?.imageUrl}
                    alt={movie?.name}
                    layout="fill"
                  />
                </ImageWrapper>
                <MovieInfo align="start">
                  {movie?.title}
                  <div className="flex space-x-0.5 py-2">
                    {Array(movie?.rating).fill('').map((_, i) => (
                      <Rating key={i} />
                    ))}
                  </div>
                  <FavoriteButton
                    type='primary'
                    shape='round'
                    danger={exists}
                    onClick={() => {
                      if (exists) {
                        removeWishlist(movie)
                      } else {
                        addToWishlist(movie)
                      }
                    }}
                    disabled={loading}
                  >
                    {!exists ? (`${movieLang[0].addFavorite}`) : (`${movieLang[0].removeFavorite}`)}
                    {loading && (
                      spinner
                    )}
                  </FavoriteButton>
                </MovieInfo>
              </Column>
            )
          })
        }
      </Row>
    </Section>
  )
}
