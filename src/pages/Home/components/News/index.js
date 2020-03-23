import React from 'react';
import { useHistory } from 'react-router-dom';
import Typography from 'components/Typography';
import SubmitReportButton from 'components/SubmitReportButton';
import Button from 'components/Button';
import {
  Wrapper,
  ButtonsWrapper,
  WrapperCards,
  EmptyState
} from './index.view';
import eventTracker from 'utils/eventTracker';
import ReliableReportNews from '../ReliableReport';
import { useReport } from 'contexts/report.context';
import { CardsLoading } from 'components/Card';

const News = () => {
  const history = useHistory();

  const { fetching, reliableReports } = useReport();

  return (
    <Wrapper>
      <Typography variant="body" weight="normal">
        ข่าวน่าเชื่อถือจากชุมชน
      </Typography>
      <WrapperCards>
        {fetching ? (
          <CardsLoading rows={2} />
        ) : (
          <>
            {reliableReports.length ? (
              <ReliableReportNews />
            ) : (
              <EmptyState>ไม่มีข้อมูล</EmptyState>
            )}
          </>
        )}
      </WrapperCards>

      <ButtonsWrapper>
        <Button
          outline
          onClick={() => {
            history.push('/report');
            eventTracker({ type: 'allNewsClicked', id: 'allNewsClicked' });
          }}
        >
          ข่าวทั้งหมด
        </Button>
        <SubmitReportButton />
      </ButtonsWrapper>
    </Wrapper>
  );
};

export default News;
