import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import Button from 'components/Button';
import { ReactComponent as AddNewsIcon } from './assets/AddNews.svg';
import eventTracker from 'utils/eventTracker';

const SubmitReportButtonPropTypes = {
  onClick: PropTypes.func
};

const SubmitReportButton = ({ onClick }) => {
  const history = useHistory();
  const onClickButton = event => {
    eventTracker({ type: 'reportNewsClicked', id: 'reportNewsClicked' });
    history.push('/submit');

    if (onClick) {
      onClick(event);
    }
  };

  return (
    <Button icon={<AddNewsIcon />} onClick={onClickButton}>
      รายงานข่าว
    </Button>
  );
};

SubmitReportButton.propTypes = SubmitReportButtonPropTypes;

export default SubmitReportButton;
