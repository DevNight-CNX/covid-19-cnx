import React from 'react';
import { useHistory } from 'react-router-dom';
import Typography from 'components/Typography';
import Card, { CardsLoading } from 'components/Card';
import SubmitReportButton from 'components/SubmitReportButton';
import Button from 'components/Button';
import {
  Wrapper,
  ButtonsWrapper,
  WrapperCards,
  EmptyState
} from './index.view';
import { useReport } from 'contexts/report.context';
import Slider from 'react-slick';
import { isEmpty } from 'lodash';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import eventTracker from 'utils/eventTracker';

const News = () => {
  const { fetching, reliableReports, viewReportDetail } = useReport();
  const settings = {
    className: '',
    dots: false,
    infinite: true,
    slidesToScroll: 1,
    adaptiveHeight: true,
    autoplay: true,
    autoplaySpeed: 5000
  };
  const history = useHistory();

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
            {reliableReports.length === 99 ? (
              <Slider {...settings}>
                {reliableReports.map((report, i) => {
                  if (i % 2) return null;
                  const secReport = reliableReports[i + 1];
                  return (
                    <div key={i}>
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
                        date={report.date}
                        address={report.address}
                      />
                      {!isEmpty(secReport) ? (
                        <Card
                          key={secReport.id}
                          report={secReport}
                          onClick={viewReportDetail}
                          image={secReport.image}
                          header={secReport.header}
                          content={secReport.content}
                          avatar={secReport.avatar}
                          reference={secReport.link}
                          location={secReport.location}
                          another={secReport.header.another}
                          id={secReport.id}
                          dislikes={secReport.dislikes}
                          likes={secReport.likes}
                          date={secReport.date}
                        />
                      ) : null}
                    </div>
                  );
                })}
              </Slider>
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
