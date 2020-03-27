import React from 'react';
import { useHistory } from 'react-router-dom';
import { Button, Skeleton } from 'antd';
import styled from 'styled-components';
import { useNews } from 'contexts/news.context';
import LinkPreview from './LinkPreView';
import eventTracker from 'utils/eventTracker';
import Typography from 'components/Typography';

const CarouselContent = styled.div`
  width: 100%;
  height: 100%;
  color: black;
  display: flex;
  justify-content: center;
  @media only screen and (max-width: 768px) {
    margin-bottom: 8px;
  }
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
    max-width: 90vw;
    width: 100%;
  }
`;

const NewsListWrapper = styled.div`
  width: 100%;
  > div:not(:first-child) {
    margin-top: 8px;
  }
  @media only screen and (min-width: 1100px) {
    display: none !important;
  }
`;

const ButtonsWrapper = styled.div`
  text-align: right;
  margin-top: 16px;
`;

const LinkButton = styled(Button)`
  && {
    ${({ theme }) => theme.typography.bodyLarge()};
    color: ${({ theme }) => theme.color.primaryColor.blueRibbon};
  }
`;

const SkeletonWrapper = styled.div`
  border: 1px solid ${({ theme }) => theme.color.neutralColor.lightGray100};
  box-sizing: border-box;
  border-radius: 4px;
  padding: 18px 24px;
  max-width: 498px;
  margin: 0 auto;
  margin-bottom: 8px;
`;

const NewsCarousel = () => {
  const history = useHistory();

  const { news, newsLoading } = useNews();

  const onClickCard = (url, id) => {
    window.open(url);
    eventTracker({ type: 'carouselClicked', id });
  };

  const renderLoading = () => {
    if (newsLoading) {
      return (
        <>
          <SkeletonWrapper>
            <Skeleton title={false} />
          </SkeletonWrapper>
          <SkeletonWrapper>
            <Skeleton title={false} />
          </SkeletonWrapper>
        </>
      );
    }
    return null;
  };

  return (
    <Wrapper>
      <NewsListWrapper>
        <Typography variant="body" weight="normal">
          ข่าวสถานการณ์ปัจจุบัน
        </Typography>
        {renderLoading()}
        {news.slice(0, 3).map((item, index) => {
          return (
            <CarouselContent key={index}>
              <LinkPreview item={item} onClick={onClickCard} />
            </CarouselContent>
          );
        })}
        {news.length > 0 ? (
          <ButtonsWrapper>
            <LinkButton
              type="link"
              onClick={() => {
                history.push('/news');
                eventTracker({
                  type: 'allSituationNewsClicked',
                  id: 'allSituationNewsClicked'
                });
              }}
            >
              อ่านทั้งหมด >
            </LinkButton>
          </ButtonsWrapper>
        ) : null}
      </NewsListWrapper>
    </Wrapper>
  );
};

export default NewsCarousel;
