import React from 'react';
import styled from 'styled-components';
import newsIcon from '../assets/news.svg';
import rippleIcon from '../assets/ripple.svg';

const Wrapper = styled.div`
  border-radius: 2px;
  background-color: ${({ theme }) => theme.color.white};
  padding: 0px 2px;
  bottom: 20px;
  right: 18px;
  position: absolute;
  padding-top: 13px;
  padding-right: 14px;
  box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.1);
`;

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const NewsIconWrapper = styled(IconWrapper)`
  padding-left: 13px;
`;

const Icon = styled.img`
  width: ${({ width }) => width}px;
`;

const Detail = styled.p`
  ${({ theme }) => theme.typography.caption()}
  color: ${({ theme }) => theme.color.neutralColor.darkGray};
  margin: 0;
`;

const NewsDetail = styled(Detail)`
  margin-left: 12px;
`;

const IconDetail = () => {
  return (
    <Wrapper>
      <NewsIconWrapper>
        <Icon src={newsIcon} width={14} />
        <NewsDetail>ข่าวเกี่ยวกับ COVID-19</NewsDetail>
      </NewsIconWrapper>
      <IconWrapper>
        <Icon src={rippleIcon} width={40} />
        <Detail>ผู้ป่วย COVID-19</Detail>
      </IconWrapper>
    </Wrapper>
  );
};

export default IconDetail;
