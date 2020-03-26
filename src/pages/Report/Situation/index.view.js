import React from 'react';
import styled from 'styled-components';
import LinkPreview from '../../components/LinkPreView';

const Wrapper = styled.div`
  position: relative;
  display: flex;
  margin: auto;
  width: 100%;
  height: 100%;
  align-items: center;
  min-width: 360px;
  max-width: 90vw;
`;

const ListContent = styled.div`
  width: 100%;
  height: 100%;
  color: black;
  display: flex;
  justify-content: center;
  @media only screen and (max-width: 768px) {
    margin-bottom: 10px;
  }
`;

const NewsListWrapper = styled.div`
  width: 100%;
  @media only screen and (max-width: 1100px) {
    margin-top: 65px;
  }
`;

const ViewSituationNews = ({ news, onClickCard }) => {
  return (
    <Wrapper>
      <NewsListWrapper>
        {news.map((item, index) => {
          return (
            <ListContent key={index}>
              <LinkPreview item={item} onClick={onClickCard} />
            </ListContent>
          );
        })}
      </NewsListWrapper>
    </Wrapper>
  );
};

export default ViewSituationNews;
