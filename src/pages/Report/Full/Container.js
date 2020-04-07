import React from 'react';
import PropTypes from 'prop-types';
import { useReport, parseReportToCard } from 'contexts/report.context';
import { List } from 'antd';
import CardCustom, { CardsLoading } from 'components/Card';
import styled from 'styled-components';

const CardsLoadingWrapper = styled.div`
  padding: 16px;
`;

const ContainerPropTypes = {
  isFull: PropTypes.bool
};

const Container = ({ isFull }) => {
  const { reports, viewReportDetail, fetching } = useReport();

  const showReports = () => {
    if (reports.length) {
      return reports[0].index === reports.length - 1
        ? reports.map(report => {
            return (
              <CardCustom
                onClick={viewReportDetail}
                isFull={isFull}
                {...parseReportToCard(report)}
              />
            );
          })
        : reports.reverse().map(report => {
            return (
              <CardCustom
                onClick={viewReportDetail}
                isFull={isFull}
                {...parseReportToCard(report)}
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

Container.propTypes = ContainerPropTypes;

export default Container;
