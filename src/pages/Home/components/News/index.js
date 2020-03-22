import React from 'react';
import Typography from 'components/Typography';
import Card, { CardsLoading } from 'components/Card';
import SubmitReportButton from 'components/SubmitReportButton';
import Button from 'components/Button';
import { Wrapper, ButtonsWrapper, WrapperCards } from './index.view';
import { useReport } from 'contexts/report.context';

const News = () => {
  const { fetching, reliableReports, viewReportDetail } = useReport();
  return (
    <Wrapper>
      <Typography variant="body" weight="normal">
        แหล่งข่าวน่าเชื่อถือ
      </Typography>
      <WrapperCards>
        {fetching ? (
          <CardsLoading />
        ) : (
          reliableReports.map(report => {
            return (
              <Card
                key={report.id}
                report={report}
                onClick={viewReportDetail}
                image={report.image}
                header={report.header}
                content={report.content}
                avatar={report.avatar}
                reference={report.link}
                location={report.location}
                another={report.header.another}
                id={report.id}
                dislikes={report.dislikes}
                likes={report.likes}
              />
            );
          })
        )}
      </WrapperCards>

      <ButtonsWrapper>
        <Button outline={'true'}>ข่าวทั้งหมด</Button>
        <SubmitReportButton />
      </ButtonsWrapper>
    </Wrapper>
  );
};

export default News;
