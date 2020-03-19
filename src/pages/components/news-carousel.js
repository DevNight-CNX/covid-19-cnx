import React, { useEffect, useState } from 'react';
import { Carousel as AntdCarousel } from 'antd';
import styled from 'styled-components';
import { getNews } from 'services/data';
import Microlink from '@microlink/react';

const CarouselContent = styled.div`
  width: 100%;
  height: 100%;
  min-height: 30vh;
  background-color: gray;
  color: black;
  display: flex;
  justify-content: center;
`;

const Carousel = styled(AntdCarousel)`
  max-width: 500px;
  .slick-dots {
    display: none !important;
  }
`;

const NewsCarousel = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    getNews().then(res => setData(res.data));
  }, []);

  return (
    <Carousel autoplay>
      {data.map(item => {
        return (
          <CarouselContent>
            <Microlink url={item.newsLink} size="large" />
          </CarouselContent>
        );
      })}
    </Carousel>
  );
};

export default NewsCarousel;
