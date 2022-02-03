import React, { useRef } from 'react';
import styled from 'styled-components';
import Header from './Header';

const FixedContainer = styled.div.attrs(() => ({
  className: `fixed top-0 inset-x-0`
}))`
  top: 0;
  z-index: 30;
`;

const PageContainer = styled.div.attrs(() => ({
  className: `pt-32`
}))``;

export default function DefaultLayout(props) {
  const containerRef = useRef(null);

  return (
    <>
      <FixedContainer ref={containerRef}>
        <Header/>
      </FixedContainer>
      <PageContainer>
        {props.children}
      </PageContainer>
    </>
  );
};
