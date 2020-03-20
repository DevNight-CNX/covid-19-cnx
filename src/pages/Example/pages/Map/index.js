import React from 'react';
import styled from 'styled-components';
import Map from 'components/Map';

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
`;

const MapPage = () => {
  return (
    <Wrapper>
      <Map />
    </Wrapper>
  );
};

export default MapPage;
