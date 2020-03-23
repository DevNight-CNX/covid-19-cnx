import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { ReactComponent as CloseIcon } from './assets/close.svg';
import { ReactComponent as BackIcon } from './assets/back.svg';
import { Wrapper, Container, Title, BackLink } from './index.view';

const CancelHeader = ({ icon: Icon, label, link, mxwidth }) => {
  const { goBack, push } = useHistory();
  const customizedLink = () => (link ? push(link) : goBack());
  return (
    <Wrapper>
      <Container mxwidth={mxwidth}>
        <Title>
          {Icon ? <Icon /> : null} {label}
        </Title>
        <BackLink onClick={customizedLink}>
          <CloseIcon />
        </BackLink>
      </Container>
    </Wrapper>
  );
};
CancelHeader.propTypes = {
  label: PropTypes.string,
  link: PropTypes.string,
  icon: PropTypes.node,
  mxwidth: PropTypes.string
};
CancelHeader.defaultProps = {
  label: 'Back',
  link: '',
  icon: null,
  mxwidth: 'auto'
};

const GoBackHeader = ({ label, link, mxwidth }) => {
  const { goBack, push } = useHistory();
  const customizedLink = () => (link ? push(link) : goBack());
  return (
    <Wrapper>
      <Container mxwidth={mxwidth}>
        <BackLink onClick={customizedLink}>
          <BackIcon />
          <span style={{ transform: 'translateY(2px)' }}>{label}</span>
        </BackLink>
      </Container>
    </Wrapper>
  );
};
GoBackHeader.propTypes = {
  label: PropTypes.string,
  link: PropTypes.string,
  mxwidth: PropTypes.string
};
GoBackHeader.defaultProps = {
  label: 'Back',
  link: '',
  mxwidth: 'auto'
};

export { CancelHeader, GoBackHeader };
