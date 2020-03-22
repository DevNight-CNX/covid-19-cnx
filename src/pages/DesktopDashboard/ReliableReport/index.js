import React from 'react';
import styled from 'styled-components';
import FakeNewCount from 'pages/Report/FakeNews/FakeNewCount';
import Explanation from 'pages/Report/FakeNews/Explanation';

const Wrapper = styled.div`
  display: grid;
  grid-row-gap: 16px;
  grid-template-columns: 1fr;
`;

const ReliableReport = () => {
  return (
    <Wrapper>
      <FakeNewCount />
      <Explanation />
    </Wrapper>
  );
};

export default ReliableReport;
