import React from 'react';
import Typography from 'components/Typography';
import Buttons from 'components/Button';
import { ReactComponent as AddNewsIcon } from './assets/AddNews.svg';

import { Wrapper, ButtonsWrapper } from './index.view';

const News = () => {
  return (
    <Wrapper>
      <Typography variant="body" weight="normal">
        แหล่งข่าวน่าเชื่อถือ
      </Typography>
      <ButtonsWrapper>
        <Buttons outline={'true'}>ข่าวทั้งหมด</Buttons>
        <Buttons icon={<AddNewsIcon />}>รายงานข่าว</Buttons>
      </ButtonsWrapper>
    </Wrapper>
  );
};

export default News;
