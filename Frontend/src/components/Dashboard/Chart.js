import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import { LineChart, Line, XAxis, YAxis, Label, ResponsiveContainer } from 'recharts';
import Title from './Title';

// Generate Sales Data
function createData(time, amount) {
  return { time, amount };
}

const data = [
  
 
  createData('01-11',1768),
  createData('01-12',1418),
  createData('01-13',2170),
  createData('01-14',974),
  createData('01-15',298),
  createData('01-16',2261),
  createData('01-17',1164),
  createData('01-18',1333),
  createData('01-19',1203),
  createData('01-20',1024),
  createData('01-21',383),
  createData('01-22',941),
  createData('01-23',148),
  createData('01-24',580),
  createData('01-25',160),
  createData('01-26',51),
  createData('01-27',74),
  createData('01-28',662),
  createData('01-29',167),
  createData('01-30',91),
  createData('01-31',35),
  createData('02-01',33),
  createData('02-02',539)
];
let date = new Date();
let month = date.getMonth();

switch (month) {
  case 0:
    month = '一月API使用次數'
    break;

  case 1:
    month = '二月API使用次數' 
  
  default:
    month = 'API使用次數'
    break;
}


export default function Chart() {
  const theme = useTheme();

  return (
    <React.Fragment>
      <Title>{month}</Title>
      <ResponsiveContainer>
        <LineChart
          data={data}
          margin={{
            top: 16,
            right: 16,
            bottom: 0,
            left: 24,
          }}
        >
          <XAxis
            dataKey="time"
            stroke={theme.palette.text.secondary}
            style={theme.typography.body2}
          />
          <YAxis
            stroke={theme.palette.text.secondary}
            style={theme.typography.body2}
          >
            <Label
              angle={270}
              position="left"
              style={{
                textAnchor: 'middle',
                fill: theme.palette.text.primary,
                ...theme.typography.body1,
              }}
            >
              使用次數
            </Label>
          </YAxis>
          <Line
            isAnimationActive={true}
            type="monotone"
            dataKey="amount"
            stroke={theme.palette.primary.main}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </React.Fragment>
  );
}
