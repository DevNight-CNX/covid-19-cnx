import React, { useEffect, useState } from 'react';
import { Carousel as AntdCarousel } from 'antd';
import styled from 'styled-components';
import { getNews } from 'services/data';
import Microlink from '@microlink/react';
import LinkPreview from './LinkPreView';

const CarouselContent = styled.div`
  width: 100%;
  height: 100%;
  color: black;
  display: flex;
  justify-content: center;

  && {
    .microlink_card {
      height: auto;
    }

    .microlink_card__media_image {
      min-height: 255px;
    }

    @media only screen and (max-width: 480px) {
      .microlink_card__media_image {
        background-size: contain;
        min-height: 187px;
      }
    }
  }
`;

const Carousel = styled(AntdCarousel)`
  position: relative;

  margin: auto;
  width: 100%;
  max-width: 500px;
  height: 100%;

  @media only screen and (max-width: 500px) {
    min-width: 360px;
    max-width: 90vw;
    width: 100%;
  }
`;

const NewsCarousel = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    getNews().then(res => setData(res.data));
  }, []);

  return (
    <Carousel dots={false}>
      {data.map((item, index) => {
        return (
          <CarouselContent key={index}>
            {/* <Microlink url={item.newsLink} size="large" /> */}
            <LinkPreview />
          </CarouselContent>
        );
      })}
    </Carousel>
  );
};

export default NewsCarousel;
