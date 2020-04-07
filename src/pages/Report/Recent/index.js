import React from 'react';
import { useReport, parseReportToCard } from 'contexts/report.context';
import Card from 'components/Card';
import styled from 'styled-components';

const Wrapper = styled.div`
  padding-top: 8px;
`;

const RecentReport = () => {
  const { reports } = useReport();

  return (
    <Wrapper>
      {reports.slice(0, 3).map(report => (
        <Card {...parseReportToCard(report)} />
      ))}
    </Wrapper>
  );
};

export default RecentReport;
