import React from 'react';
import { useReport } from 'contexts/report.context';
import { List } from 'antd';
import CardCustom, { CardsLoading } from 'components/Card';

const Container = () => {
  const { reports, viewReportDetail, fetching } = useReport();
  return (
    <List>
      {fetching ? (
        <CardsLoading />
      ) : (
        reports.reverse().map(report => {
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
              date={report.date}
            />
          );
        })
      )}
    </List>
  );
};

export default Container;
