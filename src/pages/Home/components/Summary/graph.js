import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  XYPlot,
  LineMarkSeries as DefaultLineMarkSeries,
  VerticalGridLines,
  XAxis,
  Hint
} from 'react-vis';
import moment from 'moment';
import { useConstantSummarys } from 'contexts/constantSummarys.context';
import { prop } from 'ramda';
import useResponsive from 'utils/useResponsive';
import styled from 'styled-components';

const HintContent = styled.div`
  background-color: rgba(32, 33, 36, 1);
  width: 120px;
  color: ${({ theme }) => theme.color.white};
  padding: 16px;
  border-radius: 4px;
  ${({ theme }) => theme.typography.link()}
`;

const Graph = ({ isFilterInChiangmai = false }) => {
  const { constantSummarys, constantSummarysCNX } = useConstantSummarys();

  const [hintValue, setHintValue] = useState();
  const [hintIndex, setHintIndex] = useState(0);

  const { isDesktop } = useResponsive();

  const oneDay = 86400000;

  const dayRange = isDesktop ? 8 * oneDay : 4 * oneDay;

  const maxDayRange = isDesktop ? 9 : 5;

  const cnxData =
    constantSummarysCNX.length > maxDayRange
      ? constantSummarysCNX.slice(
          Math.max(constantSummarysCNX.length - maxDayRange, 0)
        )
      : constantSummarysCNX;

  const thaiData =
    constantSummarys.length > maxDayRange
      ? constantSummarys.slice(
          Math.max(constantSummarys.length - maxDayRange, 0)
        )
      : constantSummarys;

  const timestamp = () => {
    return isFilterInChiangmai
      ? new Date(prop('id', cnxData[0])).setHours(0, 0, 0, 0)
      : new Date(prop('id', thaiData[0])).setHours(0, 0, 0, 0);
  };

  const parseThaiData = thaiData.map((el, index) => {
    return {
      ...el.data,
      id: el.id,
      x: el.x * index + 1 + timestamp(),
      y: el.y
    };
  });

  const parseCnxData = cnxData.map((el, index) => {
    return {
      ...el.data,
      id: el.id,
      x: el.x * index + 1 + timestamp(),
      y: el.y
    };
  });

  const dataSet = () => {
    return isFilterInChiangmai ? parseCnxData : parseThaiData;
  };

  const yDomain = () => {
    if (isFilterInChiangmai) {
      if (parseCnxData.length) {
        return [
          Number(prop('y', parseCnxData[0]) || 0) - 50,
          Number(
            prop('y', parseCnxData[Math.abs(parseCnxData.length - 1)]) || 0
          ) + 50
        ];
      } else {
        return [0, 2000];
      }
    } else {
      if (parseThaiData.length) {
        return [
          Number(prop('y', parseThaiData[0]) || 0) - 200,
          Number(
            prop('y', parseThaiData[Math.abs(parseThaiData.length - 1)]) || 0
          ) + 200
        ];
      } else {
        return [0, 2000];
      }
    }
  };

  const graphWidth = () => {
    return isDesktop ? 640 : window.innerWidth - 48;
  };

  const getDifferenceInfected = index => {
    if (index === 0) {
      if (
        isFilterInChiangmai &&
        constantSummarysCNX.length - (maxDayRange + 1) >= 0
      ) {
        return (
          parseCnxData[index]['ผู้ติดเชื้อ'] -
          constantSummarysCNX[constantSummarysCNX.length - (maxDayRange + 1)]
            .data['ผู้ติดเชื้อ']
        );
      } else if (
        !isFilterInChiangmai &&
        constantSummarys.length - (maxDayRange + 1) >= 0
      ) {
        return (
          parseThaiData[index]['ผู้ติดเชื้อ'] -
          constantSummarys[constantSummarys.length - (maxDayRange + 1)].data[
            'ผู้ติดเชื้อ'
          ]
        );
      } else {
        return null;
      }
    } else {
      return isFilterInChiangmai
        ? parseCnxData[index]['ผู้ติดเชื้อ'] -
            parseCnxData[index - 1]['ผู้ติดเชื้อ']
        : parseThaiData[index]['ผู้ติดเชื้อ'] -
            parseThaiData[index - 1]['ผู้ติดเชื้อ'];
    }
  };

  return (
    <XYPlot
      height={149}
      width={graphWidth()}
      xDomain={[timestamp(), timestamp() + dayRange]}
      yDomain={yDomain()}
      xType="time"
      margin={{ left: 10, right: 10, top: 10, bottom: 40 }}
      onMouseLeave={() => {
        setHintValue();
        setHintIndex(0);
      }}
    >
      <VerticalGridLines tickTotal={maxDayRange - 1} width={20} />
      <XAxis
        tickTotal={maxDayRange - 1}
        tickSize={0}
        tickFormat={(...props) => {
          return moment(props[0]).format('D');
        }}
      />
      <DefaultLineMarkSeries
        data={dataSet()}
        lineStyle={{ stroke: 'red' }}
        markStyle={{ stroke: 'red', fill: 'white', strokeWidth: 2 }}
        onNearestXY={(value, { index }) => {
          setHintValue(value);
          setHintIndex(index);
        }}
      />
      {hintValue ? (
        <Hint value={hintValue}>
          <HintContent>
            <p>{moment(hintValue.id).format('D MMMM YYYY')}</p>
            <div>ติดเชื้อสะสม</div>
            <div>{hintValue['ผู้ติดเชื้อ']} ราย</div>
            <div>
              {getDifferenceInfected(hintIndex)
                ? `+ ${getDifferenceInfected(hintIndex)} คน`
                : ``}
            </div>
          </HintContent>
        </Hint>
      ) : null}
    </XYPlot>
  );
};

Graph.propTypes = { isFilterInChiangmai: PropTypes.bool };

export default Graph;
