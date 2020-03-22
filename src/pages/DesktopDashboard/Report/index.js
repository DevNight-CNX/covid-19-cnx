import React from 'react';
import styled from 'styled-components';
import SubmitReportButton from 'components/SubmitReportButton';

const Footer = styled.footer`
  border-top: 1px solid #f0f0f0;
  padding: 12px 16px;
  display: flex;
  justify-content: flex-end;
`;

const Report = () => {
  return (
    <>
      <Footer>
        <SubmitReportButton />
      </Footer>
    </>
  );
};

export default Report;
