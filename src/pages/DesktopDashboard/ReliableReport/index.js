import React from 'react';
import styled from 'styled-components';
import FakeNewCount from 'pages/Report/FakeNews/FakeNewCount';
import Explanation from 'pages/Report/FakeNews/Explanation';
import ReliableReportNews from 'pages/Home/components/ReliableReport';

const Wrapper = styled.div`
  display: grid;
  grid-row-gap: 16px;
  grid-template-columns: 1fr;
  border-radius: 4px;
`;

const ReliableReportNewsWrapper = styled.div`
  background-color: ${({ theme }) => theme.color.neutralColor.white};
  border-radius: 4px;
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
