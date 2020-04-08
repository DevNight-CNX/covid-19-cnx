import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import CardCustom, { CardsLoading } from 'components/Card';
import { getReportById } from 'services/report';
import styled from 'styled-components';
import { GoBackHeader } from 'components/BarNavigation/navigation';
import useResponsive from 'utils/useResponsive';
import { parseReportToCard } from 'contexts/report.context';

const Container = styled.div`
  max-width: 680px;
  width: 100%;
  margin: 0px auto 36px;

  @media only screen and (max-width: 1100px) {
    margin-top: 56px;
  }
`;

const LoadingWrapper = styled.div`
  padding: 8px;
`;

const DetailPropTypes = { match: PropTypes.object };

const Detail = ({ match }) => {
  const [report, setReport] = useState();
  const { isDesktop } = useResponsive();

  useEffect(() => {
    setReport();
    getReport();
  }, [match.params.id]);

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
      <GoBackHeader mxwidth="680px" link={'/report'} isPlaceFixed={isDesktop} />
      <Container>
        {report ? (
          <>
            <CardCustom isFull={IsFull()} {...parseReportToCard(report)} />
          </>
        ) : (
          <LoadingWrapper>
            <CardsLoading rows={1} />
          </LoadingWrapper>
        )}
      </Container>
    </>
  );
};

Detail.propTypes = DetailPropTypes;

export default Detail;
