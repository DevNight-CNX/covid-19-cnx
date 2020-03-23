/* stylelint-disable property-no-vendor-prefix */
/* stylelint-disable value-no-vendor-prefix */

import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

import { Card as AntdCard } from 'antd';
import { ReactComponent as DefaultImage } from './assets/defaultImage.svg';

const Card = styled(AntdCard)`
  width: 100%;
  max-width: 500px;
  height: 100px;
  .ant-card-body {
    padding: 0px !important;
  }
  cursor: pointer;
`;

const TextWrapper = styled.div`
  height: 100px;
  width: 100%;
`;

const Title = styled.div`
  ${({ theme }) => theme.typography.bodyLargeHighlight()}
  padding: 8px 16px 0px 68px;
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
  padding: 8px 16px 0px 68px;
  bottom: 0;
  width: 100%;
  position: absolute;
  padding-bottom: 4px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const LogoImage = styled.div`
  width: 64px;
  height: 64px;
  position: absolute;
  background-size: contain;
  background-position: center;
  background-repeat: repeat;
  ${props => css`
    background-image: url(${props.src});
  `};
`;

const StyledDefaultImage = styled(DefaultImage)`
  width: 64px;
  height: 64px;
  position: absolute;
`;

const LinkPreview = ({ item, onClick }) => {
  return (
    <Card onClick={() => onClick(item.newsLink, item.id)}>
      <TextWrapper>
        {item.logo ? <LogoImage src={item.logo} /> : <StyledDefaultImage />}
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
