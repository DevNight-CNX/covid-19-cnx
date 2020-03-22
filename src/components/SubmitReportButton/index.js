import React from 'react';
import Button from 'components/Button';
import { ReactComponent as AddNewsIcon } from './assets/AddNews.svg';

const SubmitReportButton = () => {
  return <Button icon={<AddNewsIcon />}>รายงานข่าว</Button>;
};

export default SubmitReportButton;
