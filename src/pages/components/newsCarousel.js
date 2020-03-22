import React, { useEffect, useState, useRef } from 'react';
import { Carousel as AntdCarousel } from 'antd';
import styled from 'styled-components';
import { getNews } from 'services/data';
import { useNews } from 'contexts/news.context';
import LinkPreview from './LinkPreView';
import { RightCircleOutlined, LeftCircleOutlined } from '@ant-design/icons';

const CarouselContent = styled.div`
  width: 100%;
  height: 100%;
  color: black;
  display: flex;
  justify-content: center;
`;

const Carousel = styled(AntdCarousel)`
  position: relative;
`;

const Wrapper = styled.div`
  position: relative;
  display: flex;
  margin: auto;
  width: 100%;
  max-width: 500px;
  height: 100%;
  align-items: center;

  @media only screen and (max-width: 500px) {
    min-width: 360px;
    max-width: 90vw;
    width: 100%;
  }
`;

const NextButton = styled(RightCircleOutlined)`
  right: 0;
  position: absolute;
  font-size: 32px;
  z-index: 10;
  color: ${({ theme }) => theme.color.neutralColor.lightGray300} !important;
  margin-right: 10px;
  transform: translateX(45px);

  @media only screen and (max-width: 768px) {
    display: none !important;
  }
`;

const PreviousButton = styled(LeftCircleOutlined)`
  position: absolute;
  font-size: 32px;
  z-index: 10;
  color: ${({ theme }) => theme.color.neutralColor.lightGray300} !important;
  margin-left: 10px;
  transform: translateX(-45px);

  @media only screen and (max-width: 768px) {
    display: none !important;
  }
`;

const CarouselWrapper = styled.div`
  width: 100%;
`;

const NewsCarousel = () => {
  const carousel = useRef(null);

  const { news } = useNews();

  const onNext = () => {
    carousel.current.next();
  };

  const onPrevious = () => {
    carousel.current.prev();
  };

  return (
    <Wrapper>
      {news.length > 0 ? (
        <>
          <PreviousButton onClick={onPrevious} />
          <NextButton onClick={onNext} />
        </>
      ) : null}
      <CarouselWrapper>
        <Carousel ref={carousel} dots={false} autoplay>
          {news.map((item, index) => {
            return (
              <CarouselContent key={index}>
                <LinkPreview item={item} />
              </CarouselContent>
            );
          })}
        </Carousel>
      </CarouselWrapper>
    </Wrapper>
  );
};

export default NewsCarousel;
