import React from 'react';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import routeUrlProvider, { EXAMPLE } from 'constants/route-paths';
import {
  Wrapper,
  ButtonWrapper,
  Title,
  Container,
  Header,
  Logo,
  Circle
} from './index.view';
import Button from 'components/Button';

const HomePropTypes = {
  history: PropTypes.object
};

const Home = ({ history }) => {
  const { t } = useTranslation();
  return (
    <Wrapper>
      <Circle />
      <Header>
        <Logo />
      </Header>
      <Container>
        <Title>{t('introduce')}</Title>
        <ButtonWrapper>
          <Button
            onClick={() => {
              history.push(routeUrlProvider.getForLink(EXAMPLE));
            }}
          >
            {t('viewExample')}
          </Button>
        </ButtonWrapper>
      </Container>
    </Wrapper>
  );
};

Home.propTypes = HomePropTypes;

export default Home;
