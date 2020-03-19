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
      {/* {data.map(item => {
        return <CarouselContent>{item.title}</CarouselContent>;
      })} */}
      <CarouselContent>
        <Microlink url="https://www.cm108.com/w/23986/" size="large" />
      </CarouselContent>
      <CarouselContent>
        <Microlink url="https://www.cm108.com/w/23986/" size="large" />
      </CarouselContent>
      <CarouselContent>
        <Microlink url="https://www.cm108.com/w/23986/" size="large" />
      </CarouselContent>
      <CarouselContent>
        <Microlink url="https://instagram.com/p/Bu1-PpyHmCn/" size="large" />
      </CarouselContent>
    </Carousel>
  );
};

export default NewsCarousel;
