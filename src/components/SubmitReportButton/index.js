import React from 'react';
import Button from 'components/Button';
import { ReactComponent as AddNewsIcon } from './assets/AddNews.svg';
import eventTracker from 'utils/eventTracker';

const onClickButton = () => {
  eventTracker({ type: 'reportNewsClicked', id: 'reportNewsClicked' });
};

const SubmitReportButton = () => {
  return (
    <Button icon={<AddNewsIcon />} onClick={onClickButton}>
      รายงานข่าว
    </Button>
  );
};

export default SubmitReportButton;
