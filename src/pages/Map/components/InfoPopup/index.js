import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  background-color: red;
`;

const Message = styled.p`
  color: #fff;
`;

const InfoPopup = ({ message }) => {
  return (
    <Wrapper>
      <Message>Hello {message}</Message>
    </Wrapper>
  );
};

export default InfoPopup;
