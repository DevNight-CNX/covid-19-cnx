import React, { useState, useEffect } from 'react';
import { getReportList } from 'services/report';
import { List } from 'antd';
import CardCustom from 'components/Card';
import styled from 'styled-components';

const Container = styled.div`
  max-width: 680px;
  width: 100%;
  margin: auto !important;
  margin-bottom: 36px !important;
`;

const FullReport = () => {
  const [reportList, setReportList] = useState([]);

  useEffect(() => {
    getReportList().then(res => setReportList(res));
  }, []);

  return (
    <List>
      <Container>
        {reportList.map(report => {
          return (
            <CardCustom
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
      </Container>
    </List>
  );
};

export default FullReport;
