import React from 'react';
import { useReport } from 'contexts/report.context';
import { List } from 'antd';
import CardCustom, { CardsLoading } from 'components/Card';
import styled from 'styled-components';

const Container = ({ isFull }) => {
  const { reports, viewReportDetail, fetching } = useReport();

  const showReports = () => {
    if (reports.length) {
      return reports[0].index === reports.length - 1
        ? reports.map(report => {
            return (
              <CardCustom
                key={report.id}
                report={report}
                onClick={viewReportDetail}
                image={report.image}
                header={report.header}
                content={report.content}
                avatar={report.avatar}
                reference={report.link}
                location={report.location}
                another={report.header.another}
                id={report.id}
                dislikes={report.dislikes}
                likes={report.likes}
                address={report.address}
                date={report.date}
                isFull={isFull}
              />
            );
          })
        : reports.reverse().map(report => {
            return (
              <CardCustom
                key={report.id}
                report={report}
                onClick={viewReportDetail}
                image={report.image}
                header={report.header}
                content={report.content}
                avatar={report.avatar}
                reference={report.link}
                location={report.location}
                another={report.header.another}
                id={report.id}
                dislikes={report.dislikes}
                likes={report.likes}
                address={report.address}
                date={report.date}
                isFull={isFull}
              />
            );
          });
    }
  };

  return (
    <List>
      {fetching ? (
        <CardsLoadingWrapper>
          <CardsLoading />
        </CardsLoadingWrapper>
      ) : (
        showReports()
      )}
    </List>
  );
};

export default Container;

const CardsLoadingWrapper = styled.div`
  padding: 16px;
`;
