import React, { useEffect, useState, useRef } from 'react';
import { Carousel as AntdCarousel } from 'antd';
import styled from 'styled-components';
import { getNews } from 'services/data';
import LinkPreview from './LinkPreView';
import { RightCircleOutlined, LeftCircleOutlined } from '@ant-design/icons';

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
      background-color: ${({ theme }) => theme.color.neutralColor.lightGray100};
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
  color: ${({ theme }) => theme.color.white} !important;
  margin-right: 10px;
  transform: translateY(-25px);
`;

const PreviousButton = styled(LeftCircleOutlined)`
  position: absolute;
  font-size: 32px;
  z-index: 10;
  color: ${({ theme }) => theme.color.white} !important;
  margin-left: 10px;
  transform: translateY(-25px);
`;

const CarouselWrapper = styled.div`
  width: 100%;
`;

const NewsCarousel = () => {
  const carousel = useRef(null);

  const [data, setData] = useState([]);

  useEffect(() => {
    getNews().then(res => setData(res.data));
  }, []);

  const onNext = () => {
    carousel.current.next();
  };

  const onPrevious = () => {
    carousel.current.prev();
  };

  return (
    <Wrapper>
      {data.length > 0 ? (
        <>
          <PreviousButton onClick={onPrevious} />
          <NextButton onClick={onNext} />
        </>
      ) : null}
      <CarouselWrapper>
        <Carousel ref={carousel} dots={false}>
          {data.map((item, index) => {
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
