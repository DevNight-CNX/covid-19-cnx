import styled from 'styled-components';
import { Switch } from 'antd';

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
  padding: 28px 24px 16px;
`;

const NewsContainer = styled.div`
  width: 100%;
  position: relative;
  margin-top: 24px;
  padding: 16px;
`;

const SummaryWrapper = styled.div`
  padding-top: 8px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 16px 32px;
  justify-content: center;
`;

const FakeNewsReportWrapper = styled.div`
  margin-top: 3px;
`;

const InfoSummaryWrapper = styled.div`
  display: grid;
  padding: 16px 24px;
`;

const InfoSummary = styled.p`
  ${({ theme }) => theme.typography.bodyLarge()};
  color: ${({ theme }) => theme.color.neutralColor.black};
  margin: 0;
`;

const SwitchContainer = styled.div`
  ${({ theme }) => theme.typography.bodyLarge()};
  color: ${({ theme }) => theme.color.neutralColor.black};
  display: flex;
  justify-content: space-between;
`;

const SwitchStyled = styled(Switch)`
  && {
    max-width: 28px;
    min-width: 28px;
    width: 100%;
    height: 16px;
    margin-left: 8px;
    ::after {
      width: 12px;
      height: 12px;
    }
  }
`;

const GraphSummary = styled.div`
  width: '100%';
  height: '150px';
  display: 'flex';
  justify-content: 'center';
  align-items: 'center';
`;

export {
  Wrapper,
  Container,
  MapContainer,
  HeaderWrapper,
  NewsContainer,
  SummaryWrapper,
  FakeNewsReportWrapper,
  InfoSummaryWrapper,
  InfoSummary,
  SwitchContainer,
  SwitchStyled,
  GraphSummary
};
