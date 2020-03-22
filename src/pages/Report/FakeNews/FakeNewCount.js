import React from 'react';
import styled from 'styled-components';
import fakeNewsIcon from './assets/fakeNews.svg';

const Wrapper = styled.div`
  ${({ theme }) => theme.typography.body()};
  color: ${({ theme }) => theme.color.error};
  background-color: ${({ theme }) => theme.color.neutralColor.background};
  padding: 8px 0;
  position: relative;
  text-align: center;
`;

const FakeNewCount = () => {
  return (
    <Wrapper>
      <img src={fakeNewsIcon} alt="FakeNewsIcon" style={{ paddingRight: 16 }} />
      ข่าวปลอมที่ตรวจพบ 1,987
    </Wrapper>
  );
};

export default FakeNewCount;
