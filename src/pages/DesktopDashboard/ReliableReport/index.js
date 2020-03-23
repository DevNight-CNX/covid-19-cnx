import React from 'react';
import styled from 'styled-components';
import FakeNewCount from 'pages/Report/FakeNews/FakeNewCount';
import Explanation from 'pages/Report/FakeNews/Explanation';
import News from 'pages/Home/components/News';
import ReliableReportNews from 'pages/Home/components/ReliableReport';

const Wrapper = styled.div`
  display: grid;
  grid-row-gap: 16px;
  grid-template-columns: 1fr;
`;

const ReliableReportNewsWrapper = styled.div`
  display: grid;
  grid-template-columns: 443px;
`;

const ReliableReport = () => {
  return (
    <Wrapper>
      <ReliableReportNewsWrapper>
        <ReliableReportNews />
      </ReliableReportNewsWrapper>
      <FakeNewCount />
      <Explanation />
    </Wrapper>
  );
};

export default ReliableReport;
