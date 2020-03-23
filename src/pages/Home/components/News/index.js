import React from 'react';
import Typography from 'components/Typography';
import Card, { CardsLoading } from 'components/Card';
import SubmitReportButton from 'components/SubmitReportButton';
import Button from 'components/Button';
import { Wrapper, ButtonsWrapper, WrapperCards } from './index.view';
import { useReport } from 'contexts/report.context';
import Slider from 'react-slick';
import { isEmpty } from 'lodash';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const News = () => {
  const { fetching, reliableReports, viewReportDetail } = useReport();
  const settings = {
    className: '',
    dots: false,
    fade: true,
    infinite: true,
    slidesToScroll: 1,
    adaptiveHeight: true,
    autoplay: true,
    autoplaySpeed: 5000
  };
  return (
    <Wrapper>
      <Typography variant="body" weight="normal">
        แหล่งข่าวน่าเชื่อถือ
      </Typography>
      <WrapperCards>
        {fetching ? (
          <CardsLoading rows={2} />
        ) : (
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
                    />
                  ) : null}
                </div>
              );
            })}
          </Slider>
        )}
      </WrapperCards>

      <ButtonsWrapper>
        <Button outline linkTo="/report">
          ข่าวทั้งหมด
        </Button>
        <SubmitReportButton />
      </ButtonsWrapper>
    </Wrapper>
  );
};

export default News;
