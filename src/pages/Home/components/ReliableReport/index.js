import React from 'react';
import styled from 'styled-components';
import Card, { CardsLoading } from 'components/Card';
import { useReport } from 'contexts/report.context';
import Slider from 'react-slick';
import { isEmpty } from 'lodash';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const ReliableReportNews = () => {
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
                    address={report.address}
                  />
                ) : null}
              </div>
            );
          })}
        </Slider>
      )}
    </WrapperCards>
  );
};

export default ReliableReportNews;

const WrapperCards = styled.div`
  margin-top: 15px;
`;
