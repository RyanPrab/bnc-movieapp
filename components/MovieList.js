import React from 'react';
import 'antd/dist/antd.css';
import { Row, Col } from 'antd';
import styled from 'styled-components';
import Image from 'next/image';
import { StarFilled } from '@ant-design/icons';

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

export default function MovieList(props) {
  const { movies } = props;

  return (
    <Section>
      <Row gutter={[20,8]} align="center">
        {
          movies?.data?.slice(0, 10).map((movie, index) => {
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
                  <div className="flex space-x-0.5 pt-2">
                    {Array(movie?.rating).fill('').map((_, i) => (
                      <Rating key={i} />
                    ))}
                  </div>
                </MovieInfo>
              </Column>
            )
          })
        }
      </Row>
    </Section>
  )
}
