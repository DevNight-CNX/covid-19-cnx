import React from 'react';
import styled from 'styled-components';
import { Route, Switch } from 'react-router-dom';
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
  max-height: 720px;
  overflow-y: auto;
`;

const Report = () => {
  return (
    <>
      <Content>
        <Switch>
          <Route path="/submit" component={CreateReport} />
          <Route path="/report/:id" component={ReportDetail} />
          <Route path="/" component={ReportList} />
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

export default Report;
