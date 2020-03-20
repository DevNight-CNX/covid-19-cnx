import React, { useEffect, useState } from 'react';
import { Carousel as AntdCarousel } from 'antd';
import styled from 'styled-components';
import { getNews } from 'services/data';
import Microlink from '@microlink/react';

const CarouselContent = styled.div`
  width: 100%;
  height: 100%;
  color: black;
  display: flex;
  justify-content: center;
`;

const Carousel = styled(AntdCarousel)`
  position: relative;
  .slick-dots {
    display: none !important;
  }

  margin: auto;
  width: 100%;
  max-width: 500px;
  height: 100%;

  @media only screen and (max-width: 500px) {
    min-width: 360px;
    max-width: 100vw;
    width: 100%;
  }
`;

const NewsCarousel = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    getNews().then(res => setData(res.data));
  }, []);

  return (
    <Carousel autoplay>
      {data.map((item, index) => {
        return item.newsLink ? (
          <CarouselContent key={index}>
            <Microlink url={item.newsLink} size="large" />
          </CarouselContent>
        ) : null;
      })}
    </Carousel>
  );
};

export default NewsCarousel;
