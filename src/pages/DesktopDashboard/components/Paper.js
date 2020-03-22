import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Wrapper = styled.div`
  border-radius: 4px;
  grid-area: ${({ grid }) => grid};
  overflow: hidden;
`;

const Container = styled.div`
  background: ${({ noBg }) => (noBg ? 'transparent' : '#ffffff')};
`;

const Title = styled.p`
  ${({ theme }) => theme.typography.bodyLarge()}
  color: ${({ theme }) => theme.color.neutralColor.black};
  margin-bottom: 8px;
`;

const PaperPropTypes = {
  children: PropTypes.node,
  grid: PropTypes.string,
  noBg: PropTypes.bool,
  title: PropTypes.string
};

const Paper = ({ children, grid, noBg, title }) => {
  return (
    <Wrapper grid={grid}>
      <Title>{title}</Title>
      <Container noBg={noBg}>{children}</Container>
    </Wrapper>
  );
};

Paper.propTypes = PaperPropTypes;

export default Paper;
