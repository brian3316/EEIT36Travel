import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import { LineChart, Line, XAxis, YAxis, Label, ResponsiveContainer,Tooltip } from 'recharts';
import Title from './Title';
import axios from 'axios'
import { useEffect,useState } from 'react';

/* _7VMGdQjHx47DOxMkbnfTUDsMIJ2nXx3LDQgY */


const token = 'token ghp'
const url = 'https://api.github.com/repos/EEIT36-Travel/Brian_Web_Demo/traffic/clones'
let clones = [];



export default function Chart() {

  const theme = useTheme();
  /* const config = require('config') */
  async function fetchapi(){
    try {
     const res = await axios({
      method: 'get',
      url: url,
      headers: {
        Authorization: token,
        Accept: 'application/vnd.github.v3+json'
      }
    });
    clones = res.data.clones;
    console.log(clones);
    clones.map((dataa)=>{
      console.log(dataa.timestamp.substr(5,5));
      dataa.timestamp = dataa.timestamp.substr(5,5)
    })
    console.log(process.env.githubtoken);
    console.log(clones);
    setData(clones)
    
    /* clones.map((res)=>{
      data.push(res.timestamp,res.count)
    })
    console.log(data);
     */
    
    /* test = {
     message: okres.commit.message,
     author:  okres.commit.author.name,
     time: okres.commit.author.date,
     email: okres.commit.author.email
     }
     console.log(test);
      setData(test)  */ 
    } catch (error) {
        console.log(error);
    }
  }

  const [data, setData] = useState([])
  useEffect(() => {
    fetchapi();
    
  }, [])


  return (
    <React.Fragment>
      <Title>旅遊專案Clone次數</Title>
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
            dataKey="timestamp"
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
              Clone 次數
            </Label>
          </YAxis>
          <Tooltip />
          <Line type="monotone" dataKey="count" stroke="#8884d8" activeDot={{ r: 8 }} />
          <Line type="monotone" dataKey="uniques" stroke="#82ca9d" />
          {/* <Line
            isAnimationActive={true}
            type="monotone"
            dataKey="count"
            stroke={theme.palette.primary.main}
            dot={false}
          /> */}
        </LineChart>
      </ResponsiveContainer>
    </React.Fragment>
  );
}
