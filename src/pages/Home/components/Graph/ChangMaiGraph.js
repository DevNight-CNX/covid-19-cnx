import React from 'react';
import PropTypes from 'prop-types';
import { prop } from 'ramda';

import { useConstantSummarys } from 'contexts/constantSummarys.context';
import useResponsive from 'utils/useResponsive';
import GraphView from './index.view';

const ChiangMaiGraph = () => {
  const { constantSummarysCNX } = useConstantSummarys();

  const { isDesktop } = useResponsive();

  const maxDayRange = isDesktop ? 9 : 5;

  const cnxData =
    constantSummarysCNX.length > maxDayRange
      ? constantSummarysCNX.slice(
          Math.max(constantSummarysCNX.length - maxDayRange, 0)
        )
      : constantSummarysCNX;

  const timestamp = () => {
    return new Date(prop('id', cnxData[0])).setHours(0, 0, 0, 0);
  };

  const parsedData = cnxData.map((el, index) => {
    return {
      ...el.data,
      id: el.id,
      x: el.x * index + 1 + timestamp(),
      y: el.y
    };
  });

  const yDomain = () => {
    if (parsedData.length) {
      return [
        Number(prop('y', parsedData[0]) || 0) - 50,
        Number(prop('y', parsedData[Math.abs(parsedData.length - 1)]) || 0) + 50
      ];
    } else {
      return [0, 2000];
    }
  };

  const getDifferenceInfected = index => {
    if (index === 0) {
      if (constantSummarysCNX.length - (maxDayRange + 1) >= 0) {
        return (
          parsedData[index]['ผู้ติดเชื้อ'] -
          constantSummarysCNX[constantSummarysCNX.length - (maxDayRange + 1)]
            .data['ผู้ติดเชื้อ']
        );
      } else {
        return null;
      }
    } else {
      return (
        parsedData[index]['ผู้ติดเชื้อ'] - parsedData[index - 1]['ผู้ติดเชื้อ']
      );
    }
  };

  const props = {
    getDifferenceInfected,
    yDomain,
    parsedData,
    rawData: cnxData
  };

  return <GraphView {...props} />;
};

ChiangMaiGraph.propTypes = { isFilterInChiangmai: PropTypes.bool };

export default ChiangMaiGraph;
