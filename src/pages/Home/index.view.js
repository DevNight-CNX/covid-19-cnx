import styled from 'styled-components';

const Wrapper = styled.div``;

const MapContainer = styled.div`
  width: 100%;
  height: 344px;
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

const NewsCredibilityContainer = styled.div`
  position: relative;
  width: 100%;
`;

const NewsCredibility = styled.p`
  ${({ theme }) => theme.typography.body()};
  color: ${({ theme }) => theme.color.neutralColor.black};
  margin-bottom: 8px;
  padding-left: 24px;
`;

const ButtonsWrapper = styled.div`
  display: flex;
  justify-content: center;
  padding: 2px;
`;

export {
  Wrapper,
  MapContainer,
  Header,
  Headline,
  LastUpdateStatus,
  Notice,
  NewsContainer,
  NewsCredibilityContainer,
  NewsCredibility,
  ButtonsWrapper
};
