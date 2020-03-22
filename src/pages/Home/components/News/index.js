import React from 'react';
import Typography from 'components/Typography';
import SubmitReportButton from 'components/SubmitReportButton';
import Button from 'components/Button';

import { Wrapper, ButtonsWrapper } from './index.view';

const News = () => {
  return (
    <Wrapper>
      <Typography variant="body" weight="normal">
        แหล่งข่าวน่าเชื่อถือ
      </Typography>
      <ButtonsWrapper>
        <Button outline={'true'}>ข่าวทั้งหมด</Button>
        <SubmitReportButton />
      </ButtonsWrapper>
    </Wrapper>
  );
};

export default News;
