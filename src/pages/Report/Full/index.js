import React from 'react';
import styled from 'styled-components';
import { List } from 'antd';
import CardCustom from 'components/Card';
import { GoBackHeader } from 'components/BarNavigation/navigation';
import { useReport } from 'contexts/report.context';

const Container = styled.div`
  max-width: 680px;
  width: 100%;
  margin: 15px auto 36px;
`;

const FullReport = () => {
  const { reports, viewReportDetail } = useReport();

  return (
    <>
      <GoBackHeader mxwidth="680px" />
      <Container>
        <List>
          {reports.map(report => {
            return (
              <CardCustom
                key={report.id}
                report={report}
                onClick={viewReportDetail}
                image={report.image}
                header={report.header}
                content={report.content}
                avatar={report.image}
                reference={report.link}
                location={report.location}
                another={report.header.another}
                id={report.id}
                dislikes={report.dislikes}
                likes={report.likes}
              />
            );
          })}
        </List>
      </Container>
    </>
  );
};

export default FullReport;
