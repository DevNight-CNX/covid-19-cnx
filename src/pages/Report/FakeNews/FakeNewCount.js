import React from 'react';
import numeral from 'numeral';
import styled from 'styled-components';
import { useReport } from 'contexts/report.context';
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
  const { fakeReports } = useReport();
  return (
    <Wrapper>
      <img src={fakeNewsIcon} alt="FakeNewsIcon" style={{ paddingRight: 16 }} />
      ข่าวปลอมที่ตรวจพบ {numeral(fakeReports.length).format('0,0')}
    </Wrapper>
  );
};

export default FakeNewCount;
