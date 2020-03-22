import styled from 'styled-components';

const Wrapper = styled.div``;
const Container = styled.div`
  width: 100%;
  max-width: 960px;
  margin: 0 auto;
`;

const MapContainer = styled.div`
  height: 344px;
  position: relative;
  width: 100%;
`;

const HeaderWrapper = styled.header`
  padding: 62px 24px 16px;
`;

const NewsContainer = styled.div`
  width: 100%;
  position: relative;
  margin-top: 24px;
`;

const SummaryWrapper = styled.div`
  padding: 16px 24px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 16px 32px;
  justify-content: center;
`;

const FakeNewsReportWrapper = styled.div`
  margin-top: 19px;
`;

export {
  Wrapper,
  Container,
  MapContainer,
  HeaderWrapper,
  NewsContainer,
  SummaryWrapper,
  FakeNewsReportWrapper
};
