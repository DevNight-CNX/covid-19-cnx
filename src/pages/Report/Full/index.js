import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { getReportList } from 'services/report';
import { List } from 'antd';
import CardCustom from 'components/Card';
import routeUrlProvider from 'constants/route-paths';
import { GET_REPORT_BY_ID } from 'constants/api-endpoints';

const Container = styled.div`
  max-width: 680px;
  width: 100%;
  margin: auto !important;
  margin-bottom: 36px !important;
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
    <List>
      <Container>
        {reportList.map(report => {
          return (
            <CardCustom
              key={report.id}
              report={report}
              onClick={onClickCard}
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

FullReport.propTypes = FullReportPropTypes;

export default FullReport;
