import React from 'react';
import { useHistory } from 'react-router-dom';
import Button from 'components/Button';
import { ReactComponent as AddNewsIcon } from './assets/AddNews.svg';
import eventTracker from 'utils/eventTracker';

const SubmitReportButton = () => {
  const history = useHistory();
  const onClickButton = () => {
    eventTracker({ type: 'reportNewsClicked', id: 'reportNewsClicked' });
    history.push('/submit');
  };

  return (
    <Button icon={<AddNewsIcon />} onClick={onClickButton}>
      รายงานข่าว
    </Button>
  );
};

export default SubmitReportButton;
