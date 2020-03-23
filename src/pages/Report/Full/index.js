import React from 'react';
import styled from 'styled-components';
import { GoBackHeader } from 'components/BarNavigation/navigation';
import Container from './Container';

const Wrapper = styled.div`
  max-width: 680px;
  width: 100%;
  margin: 15px auto 36px;
`;

const FullReport = () => {
  return (
    <>
      <GoBackHeader mxwidth="680px" />
      <Container>
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
      </Container>
    </>
  );
};

export default FullReport;
