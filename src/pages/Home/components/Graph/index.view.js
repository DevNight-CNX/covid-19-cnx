import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  XYPlot,
  LineMarkSeries as DefaultLineMarkSeries,
  VerticalGridLines,
  XAxis,
  Hint
} from 'react-vis';
import moment from 'moment';
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

const GraphView = ({ rawData, yDomain, parsedData, getDifferenceInfected }) => {
  const { isDesktop } = useResponsive();
  const [hintValue, setHintValue] = useState();
  const [hintIndex, setHintIndex] = useState(0);
  const [width, setWidth] = useState(isDesktop ? 640 : window.innerWidth - 48);

  useEffect(() => {
    const handleResize = () => {
      setWidth(isDesktop ? 640 : window.innerWidth - 48);
    };
    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', () =>
      !isDesktop ? setHintValue(null) : null
    );
  }, []);

  const oneDay = 86400000;

  const dayRange = isDesktop ? 8 * oneDay : 4 * oneDay;

  const timestamp = () => new Date(prop('id', rawData[0])).setHours(0, 0, 0, 0);

  const maxDayRange = isDesktop ? 9 : 5;

  return (
    <XYPlot
      height={149}
      width={width}
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
        data={parsedData}
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

GraphView.propTypes = {
  rawData: PropTypes.array,
  yDomain: PropTypes.func,
  parsedData: PropTypes.array,
  getDifferenceInfected: PropTypes.func
};

export default GraphView;
