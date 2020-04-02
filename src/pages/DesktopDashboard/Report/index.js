import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Route, Switch, withRouter } from 'react-router-dom';
import SubmitReportButton from 'components/SubmitReportButton';
import CreateReport from 'pages/Report/Create';
import ReportDetail from 'pages/Report/Detail';
import ReportList from 'pages/Report/Full/Container';

const Footer = styled.footer`
  border-top: 1px solid #f0f0f0;
  padding: 12px 16px;
  display: flex;
  justify-content: flex-end;
`;

const Content = styled.div`
  max-height: 620px;
  overflow-y: auto;
`;

const ReportDetailWrapper = props => {
  useEffect(() => {
    const reportDetailSection = document.getElementById(
      'report-detail-section-desktop'
    );
    if (reportDetailSection) {
      window.scrollTo({
        top: reportDetailSection.offsetTop,
        left: 0,
        behavior: 'smooth'
      });
    }
  }, []);
  return (
    <div id="report-detail-section-desktop">
      <ReportDetail {...props} />
    </div>
  );
};

const Report = ({ match }) => {
  const IsFull = () => {
    if (match.path !== '/report/:id') {
      return true;
    }
    return false;
  };
  return (
    <>
      <Content>
        <Switch>
          <Route path="/submit" component={CreateReport} />
          <Route path="/report/:id" component={ReportDetailWrapper} />
          <Route path="/" component={() => <ReportList isFull={IsFull} />} />
        </Switch>
      </Content>
      <Switch>
        <Route path="/submit" component={null} />
        <Route
          path="/"
          render={() => (
            <Footer>
              <SubmitReportButton />
            </Footer>
          )}
        />
      </Switch>
    </>
  );
};

export default withRouter(Report);
