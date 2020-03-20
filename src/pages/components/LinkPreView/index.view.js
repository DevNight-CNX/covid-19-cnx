import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { Card as AntdCard, Skeleton as AntdSkeleton } from 'antd';

const Card = styled(AntdCard)`
  width: 500px;
  height: 380px;
  .ant-card-body {
    padding: 0px !important;
  }
`;

const CoverImage = styled.div`
  background-color: ${({ theme }) => theme.color.neutralColor.lightGray100};
  background-image: ${({ imageUrl }) => imageUrl};
  background-size: contain;
  height: 260px;
  width: 500px;
`;

const TextWrapper = styled.div`
  height: 120px;
  width: 100%;
`;

const Skeleton = styled(AntdSkeleton)`
  width: 90% !important;
  margin: auto;

  .ant-skeleton-paragraph :nth-child(2n) {
    display: none;
  }
`;

const Title = styled.div``;

const Descriptions = styled.div``;

const Footer = styled.div``;

const LinkPreviewView = () => {
  return (
    <Card>
      <CoverImage />
      <TextWrapper>
        <Skeleton active rows={2} />
        <Title></Title>
        <Descriptions></Descriptions>
        <Footer></Footer>
      </TextWrapper>
    </Card>
  );
};

LinkPreviewView.propTypes = {};

export default LinkPreviewView;
