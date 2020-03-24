import React from 'react';
import styled from 'styled-components';
import FakeNewCount from 'pages/Report/FakeNews/FakeNewCount';
import Explanation from 'pages/Report/FakeNews/Explanation';
import ReliableReportNews from 'pages/Home/components/ReliableReport';

const Wrapper = styled.div`
  display: grid;
  grid-row-gap: 16px;
  grid-template-columns: 1fr;
`;

const ReliableReportNewsWrapper = styled.div`
  background-color: ${({ theme }) => theme.color.neutralColor.white};
`;

const ReliableReport = ({ isFull }) => {
  return (
    <Wrapper>
      <ReliableReportNewsWrapper>
        <ReliableReportNews isFull={isFull} />
      </ReliableReportNewsWrapper>
      <FakeNewCount />
      <Explanation />
    </Wrapper>
  );
};

export default ReliableReport;
