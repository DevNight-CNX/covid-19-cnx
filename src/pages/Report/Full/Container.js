import React from 'react';
import { useReport } from 'contexts/report.context';
import { List } from 'antd';
import CardCustom, { CardsLoading } from 'components/Card';

const Container = () => {
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
              />
            );
          });
    }
  };

  return <List>{fetching ? <CardsLoading /> : showReports()}</List>;
};

export default Container;
