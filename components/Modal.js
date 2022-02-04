import React, { useEffect } from "react";
import 'antd/dist/antd.css';
import { Button } from 'antd';
import styled from "styled-components";
import Image from "next/image";

const ModalSection = styled.div.attrs(() => ({
  className: `fixed z-20 left-0 right-0 -top-10 bottom-0 bg-current flex items-center justify-center`
}))``;

const ModalContent = styled.div.attrs(() => ({
  className: `flex flex-col space-y-4 bg-white w-1/2 rounded-lg`
}))``;

const ModalHeader = styled.div.attrs(() => ({
  className: `flex flex-row justify-between px-2 pt-2`
}))``;

const ModalBody = styled.div.attrs(() => ({
  className: `flex px-2 w-full`
}))``;

const ImageWrapper = styled.div.attrs(() => ({
  className: `relative w-full h-96`
}))``;

const ModalFooter = styled.div.attrs(() => ({
  className: `flex px-2 pb-2 justify-end`
}))``;

export default function Modal(props) {
  const { show, hideModal, movie } = props;

  const closeOnEscapeKeyDown = e => {
    if ((e.charCode || e.keyCode) === 27) {
      hideModal();
    }
  };

  useEffect(() => {
    document.body.addEventListener("keydown", closeOnEscapeKeyDown);
    return function cleanup() {
      document.body.removeEventListener("keydown", closeOnEscapeKeyDown);
    };
  }, []);

  if (!show) {
    return null;
  }

  return (
    <ModalSection onClick={() => hideModal()}>
      <ModalContent onClick={e => e.stopPropagation()}>
        <ModalHeader>
          <h1 className="text-lg font-semibold">
            {movie?.title}
          </h1>
        </ModalHeader>
        <ModalBody>
          <ImageWrapper>
            <Image
              className="rounded-lg"
              src={movie?.imageLargeUrl}
              alt="test"
              layout="fill"
            />
          </ImageWrapper>
        </ModalBody>
        <ModalFooter>
          <Button
            type='primary'
            onClick={() => hideModal()}
          >
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </ModalSection>
  )
}
