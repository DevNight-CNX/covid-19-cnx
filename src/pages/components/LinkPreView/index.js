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
  ${({ theme }) => theme.typography.bodyLarge()}
  padding: 37px 16px 0px 16px;
  overflow: hidden;
  height: 80px;
  p {
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
`;

const LinkWrapper = styled.div`
  ${({ theme }) => theme.typography.caption()}
  color: ${({ theme }) => theme.color.neutralColor.lightGray300};
  padding: 16px 16px 0px 16px;
  top: 0;
  width: 100%;
  position: absolute;
  padding-bottom: 4px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const LogoImage = styled.div`
  width: 16px;
  height: 16px;
  position: absolute;
  background-size: contain;
  background-position: center;
  background-repeat: repeat;
  ${props => css`
    background-image: url(${props.src});
  `};
  box-sizing: border-box;
  border-radius: 2px;
  top: 14px;
  right: 16px;
`;

const StyledDefaultImage = styled(DefaultImage)`
  padding: 4px;
  width: 16px;
  height: 16px;
  position: absolute;
  box-sizing: border-box;
`;

const LinkPreview = ({ item, onClick }) => {
  const url = new URL(item.newsLink);
  return (
    <Card onClick={() => onClick(item.newsLink, item.id)}>
      <TextWrapper>
        <LinkWrapper>{url.hostname}</LinkWrapper>
        {item.logo ? <LogoImage src={item.logo} /> : <StyledDefaultImage />}
        <Title>
          <p>{item.title}</p>
        </Title>
      </TextWrapper>
    </Card>
  );
};

LinkPreview.propTypes = { item: PropTypes.object, onClick: PropTypes.func };

export default LinkPreview;
