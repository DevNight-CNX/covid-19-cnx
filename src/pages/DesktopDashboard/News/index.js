import React from 'react';
import styled from 'styled-components';
import SituationNews from 'pages/News/index.view';
import eventTracker from 'utils/eventTracker';
import { useNews } from 'contexts/news.context';
import { Skeleton } from 'antd';

const Wrapper = styled.div`
  display: grid;
  grid-row-gap: 16px;
  grid-template-columns: 1fr;
  border-radius: 4px;
  height: 748px;
  overflow-y: auto;
`;

const SituationNewsWrapper = styled.div`
  background-color: ${({ theme }) => theme.color.neutralColor.white};
  border-radius: 4px;
  align-items: center;
  padding: 0px 16px 16px 16px;
`;

const HeaderWrapper = styled.div`
  background: #fff;
  box-shadow: inset 0px -1px 0px #f0f0f0;
  z-index: 10;
  width: 448px;
  height: 60px;
`;

const Container = styled.div`
  ${({ theme: { font } }) => font.mainFont()};
  color: ${({ theme }) => theme.color.neutralColor.black};
  align-items: center;
  display: flex;
  justify-content: space-between;
  margin: 0 auto;
  max-width: ${({ mxwidth }) => mxwidth};
  padding: 19px 24px;
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

const Situation = () => {
  const { news, newsLoading } = useNews();
  const onClickCard = (url, id) => {
    window.open(url);
    eventTracker({ type: 'cardNewsClicked', id });
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
          <SkeletonWrapper>
            <Skeleton title={false} />
          </SkeletonWrapper>
          <SkeletonWrapper>
            <Skeleton title={false} />
          </SkeletonWrapper>
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
      <HeaderWrapper>
        <Container mxwidth="680px">ข่าวสถานการณ์ปัจจุบัน</Container>
      </HeaderWrapper>
      <SituationNewsWrapper>
        {renderLoading()}
        <SituationNews news={news} onClickCard={onClickCard} />
      </SituationNewsWrapper>
    </Wrapper>
  );
};

export default Situation;
