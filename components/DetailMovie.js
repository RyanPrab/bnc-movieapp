import React, { useState, useEffect } from 'react';
import 'antd/dist/antd.css';
import { Row, Col } from 'antd';
import styled from 'styled-components';
import Image from 'next/image';
import { StarFilled } from '@ant-design/icons';
import Modal from './Modal';

const ImageWrapper = styled.div.attrs(() => ({
  className: `relative w-full h-96`
}))``;

const Title = styled.div.attrs(() => ({
  className: `text-lg font-semibold`
}))``;

const SubInfo = styled.div.attrs(() => ({
  className: `text-sm text-gray-500`
}))``;

const Rating = styled(StarFilled)`
  color: #FFFF00;
`;

export default function DetailMovie(props) {
  const { movie } = props
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (showModal) {
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.body.style.overflow = 'unset';
    }
  }), [showModal];

  return (
    <>
      <Modal
        show={showModal}
        hideModal={() => setShowModal(false)}
        movie={movie}
      />
      <Row gutter={[16, 16]} justify='center' style={{ paddingBottom: '50px', maxWidth: '350px' }}>
        <Col span={24} align="center">
          <ImageWrapper
            onClick={() => setShowModal(true)}
          >
            <Image
              className='rounded-lg'
              src={movie?.imageUrl}
              alt={movie?.title}
              layout="fill"
            />
          </ImageWrapper>
        </Col>
        <Col span={24}>
          <Title>
            {movie?.title}
          </Title>
        </Col>
        <Col span={3}>
          <SubInfo>
            {movie?.year}
          </SubInfo>
        </Col>
        <Col span={21}>
          <SubInfo>
            {movie?.duration}
          </SubInfo>
        </Col>
        <Col span={24}>
          {Array(movie?.rating).fill('').map((_, i) => (
            <Rating key={i} />
          ))}
        </Col>
        <Col span={24}>
          {movie?.desc}
        </Col>
      </Row>
    </>
  );
}
