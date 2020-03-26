import React from 'react';
import styled from 'styled-components';
import newsIcon from '../assets/news.svg';
import hospitalIcon from '../assets/hospital.svg';

const Wrapper = styled.div`
  background-color: ${({ theme }) => theme.color.white};
  padding: 10px 14px;
  bottom: 16px;
  right: 16px;
  position: absolute;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.25);
  border-radius: 4px;

  & > div:first-of-type {
    margin-bottom: 8px;
  }
`;

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
`;

// const NewsIconWrapper = styled(IconWrapper)`
//   padding-left: 9px;
// `;

const Icon = styled.img`
  width: ${({ width }) => width}px;
`;

const Detail = styled.p`
  ${({ theme }) => theme.typography.bodySmall()}
  color: ${({ theme }) => theme.color.neutralColor.darkGray};
  margin: 0;
  margin-left: 8px;
`;

const IconDetail = () => {
  return (
    <Wrapper>
      <IconWrapper>
        <Icon src={newsIcon} width={21} />
        <Detail>แหล่งข่าว</Detail>
      </IconWrapper>
      <IconWrapper>
        <Icon src={hospitalIcon} width={21} />
        <Detail>ผู้ป่วย</Detail>
      </IconWrapper>
    </Wrapper>
  );
};

export default IconDetail;
