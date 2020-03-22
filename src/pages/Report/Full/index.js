import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { getReportList } from 'services/report';
import { List } from 'antd';
import CardCustom from 'components/Card';
import { GoBackHeader } from 'components/BarNavigation/navigation';

const Container = styled.div`
  max-width: 680px;
  width: 100%;
  margin: 15px auto 36px;
`;

const FullReportPropTypes = { history: PropTypes.object };

const FullReport = ({ history }) => {
  const [reportList, setReportList] = useState([]);

  useEffect(() => {
    getReportList().then(res => setReportList(res));
  }, []);

  const onClickCard = id => {
    history.push(`/report/${id}`);
  };

  return (
    <>
      <GoBackHeader mxwidth="680px" />
      <Container>
        {reportList.reverse().map(report => {
          return (
            <CardCustom
              key={report.id}
              report={report}
              onClick={onClickCard}
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
            />
          );
        })}
      </Container>
    </>
  );
};

FullReport.propTypes = FullReportPropTypes;

export default FullReport;
