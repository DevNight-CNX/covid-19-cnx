import React from 'react';
import {
  XYPlot,
  LineMarkSeries,
  VerticalGridLines,
  HorizontalGridLines,
  XAxis,
  YAxis
} from 'react-vis';
import moment from 'moment';

const Graph = () => {
  const data = [
    { x: 0, y: 8 },
    { x: 1, y: 5 },
    { x: 2, y: 4 },
    { x: 3, y: 9 },
    { x: 4, y: 1 },
    { x: 5, y: 7 },
    { x: 6, y: 6 },
    { x: 7, y: 3 },
    { x: 8, y: 2 },
    { x: 9, y: 0 }
  ];

  const width = window.innerWidth;
  const height = window.innerHeight;

  const timestamp = new Date('25 March 2020').getTime();
  const ONE_DAY = 86400000;

  const DATA = [
    { x: ONE_DAY * 1, y: 15 },
    { x: ONE_DAY * 2, y: 19 },
    { x: ONE_DAY * 3, y: 20 },
    { x: ONE_DAY * 4, y: 30 },
    { x: ONE_DAY * 5, y: 30 }
  ].map(el => {
    return { x: el.x + timestamp, y: el.y };
  });

  return (
    <XYPlot
      height={height}
      width={width}
      xDomain={[timestamp - 0 * ONE_DAY, timestamp + 15 * ONE_DAY]}
      yDomain={[15, 50]}
      xType="time"
    >
      {/* <VerticalGridLines />
      <HorizontalGridLines /> */}
      <XAxis
        tickFormat={(...props) => {
          return moment(props[0]).format('D MMM');
        }}
      />
      <YAxis />
      <LineMarkSeries
        data={DATA}
        lineStyle={{ stroke: 'red' }}
        markStyle={{ stroke: 'red', fill: 'red' }}
        // curve={'curveMonotoneX'}
      />
    </XYPlot>
  );
};

export default Graph;
