import React from 'react';
import styled from 'styled-components';
import newsIcon from '../assets/news.svg';
import rippleIcon from '../assets/ripple.svg';

const Wrapper = styled.div`
  background-color: ${({ theme }) => theme.color.white};
  padding: 0px 2px;
  bottom: 16px;
  right: 16px;
  position: absolute;
  padding-top: 11px;
  padding-right: 14px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.25);
  border-radius: 4px;
`;

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const NewsIconWrapper = styled(IconWrapper)`
  padding-left: 9px;
`;

const Icon = styled.img`
  width: ${({ width }) => width}px;
`;

const Detail = styled.p`
  ${({ theme }) => theme.typography.bodySmall()}
  color: ${({ theme }) => theme.color.neutralColor.darkGray};
  margin: 0;
`;

const NewsDetail = styled(Detail)`
  margin-left: 8px;
`;

const IconDetail = () => {
  return (
    <Wrapper>
      <NewsIconWrapper>
        <Icon src={newsIcon} width={21} />
        <NewsDetail>แหล่งข่าว</NewsDetail>
      </NewsIconWrapper>
      <IconWrapper>
        <Icon src={rippleIcon} width={38} />
        <Detail>ผู้ป่วย</Detail>
      </IconWrapper>
    </Wrapper>
  );
};

export default IconDetail;
