import React from 'react';
import PropTypes from 'prop-types';
import CardCustom from 'components/Card';

const DetailPropTypes = { report: PropTypes.array };

const Detail = ({ report }) => {
  return (
    <CardCustom
      image={report.image}
      header={report.header}
      content={report.content}
      avatar={report.image}
      reference={report.link}
      location={report.location}
      another={report.header.another}
      id={report.id}
      dislikes={report.dislikes}
      likes={report.likes}
    />
  );
};

Detail.propTypes = DetailPropTypes;

export default Detail;
