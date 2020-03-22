import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import CardCustom from 'components/Card';
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

  return report ? (
    <>
      <GoBackHeader mxwidth="680px" />
      <Container>
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
      </Container>
    </>
  ) : null;
};

Detail.propTypes = DetailPropTypes;

export default Detail;
