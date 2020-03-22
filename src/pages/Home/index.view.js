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

const Header = styled.header`
  padding: 62px 24px 16px;
`;

const Headline = styled.h1`
  ${({ theme }) => theme.typography.subtitle()}
  color: ${({ theme }) => theme.color.dark};
  margin-bottom: 8px;
`;

const LastUpdateStatus = styled.p`
  ${({ theme }) => theme.typography.body()}
  color: ${({ theme }) => theme.color.dark};
  margin-bottom: 8px;
`;

const Notice = styled.p`
  ${({ theme }) => theme.typography.body()}
  color: ${({ theme }) => theme.color.logicColor.warning};
  margin: 0;
`;

const NewsContainer = styled.div`
  width: 100%;
  position: relative;
  margin-top: 24px;
`;

export {
  Wrapper,
  Container,
  MapContainer,
  Header,
  Headline,
  LastUpdateStatus,
  Notice,
  NewsContainer
};
