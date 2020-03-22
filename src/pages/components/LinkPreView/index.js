/* stylelint-disable property-no-vendor-prefix */
/* stylelint-disable value-no-vendor-prefix */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { Card as AntdCard } from 'antd';

const Card = styled(AntdCard)`
  width: 100%;
  max-width: 500px;
  height: 120px;
  .ant-card-body {
    padding: 0px !important;
  }
  cursor: pointer;
`;

const CoverImage = styled.div`
  background-color: ${({ theme }) => theme.color.neutralColor.lightGray100};
  background-image: ${({ imageUrl }) => imageUrl};
  background-size: contain;
  height: 260px;
  width: 100%;
  max-width: 500px;
`;

const TextWrapper = styled.div`
  height: 120px;
  width: 100%;
`;

const Title = styled.div`
  ${({ theme }) => theme.typography.bodyLargeHighlight()}
  padding: 8px 16px 0px 16px;
  overflow: hidden;
  height: 80px;
  p {
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
  }
`;

const Footer = styled.div`
  ${({ theme }) => theme.typography.body()}
  padding: 8px 16px 0px 16px;
  bottom: 0;
  width: 100%;
  position: absolute;
  padding-bottom: 4px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const LinkPreview = ({ item, onClick }) => {
  return (
    <Card onClick={() => onClick(item.newsLink, item.id)}>
      {/* <CoverImage /> */}
      <TextWrapper>
        <Title>
          <p>{item.title}</p>
        </Title>
        <Footer>{item.newsLink}</Footer>
      </TextWrapper>
    </Card>
  );
};

LinkPreview.propTypes = { item: PropTypes.object, onClick: PropTypes.func };

export default LinkPreview;
