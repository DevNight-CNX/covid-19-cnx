import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import CardCustom, { CardsLoading } from 'components/Card';
import { getReportById } from 'services/report';
import styled from 'styled-components';
import { GoBackHeader } from 'components/BarNavigation/navigation';

const Container = styled.div`
  max-width: 680px;
  width: 100%;
  margin: 15px auto 36px;
`;

const DetailPropTypes = { match: PropTypes.object };

const Detail = ({ match }) => {
  const [report, setReport] = useState();

  useEffect(() => {
    getReport();
  }, []);

  const getReport = () => {
    getReportById(match.params.id).then(res => {
      setReport(res);
    });
  };

  const IsFull = () => {
    if (match.path !== '/report/:id') {
      return true;
    }
    return false;
  };

  return (
    <>
      <GoBackHeader mxwidth="680px" link={'/report'} />
      <Container>
        {report ? (
          <>
            <CardCustom
              isFull={IsFull()}
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
              address={report.address}
            />
          </>
        ) : (
          <CardsLoading rows={1} />
        )}
      </Container>
    </>
  );
};

Detail.propTypes = DetailPropTypes;

export default Detail;
