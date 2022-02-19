import React, { useState,useEffect } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import AddIcon from '@mui/icons-material/Add';
import './journeyhome.css'
import Fab from '@mui/material/Fab';
import { Link,useNavigate } from 'react-router-dom';
import { Avatar } from '@mui/material';
import { Data } from '@react-google-maps/api';
import JourneyDialog from './JourneyDialog';
import Stack from '@mui/material/Stack';
import Grow from '@mui/material/Grow';

import MovingIcon from '@mui/icons-material/Moving';
import WrongLocationIcon from '@mui/icons-material/WrongLocation';



let memberid =window.localStorage.memberid;//登入功能完整後 ，變成到localstorge取值 
export default function JourneyHome({ openMap, setOpenMap }) {
  const [journeyopen, setJourneyOpen] = useState(false);
  const [data, setData] = useState([]);
  setOpenMap(true)
  const [open, setOpen] = useState(false);
  let nagative =useNavigate();
  function fetchData(){
    fetch("http://localhost:8080/journey/memberid="+memberid)
    .then((res)=>{
      return res.json();
    })
    .then((result)=>{
      console.log(result)
      setData(result)
  }

  )
}
function continuteButton(e){
  fetch("http://localhost:8080/journey/"+e.target.id)
    .then((res)=>{
      return res.json();
    })
    .then((result)=>{
      console.log(result)
      window.localStorage.jsondata = JSON.stringify(result);
      nagative("/map")
  })
}
function deleteButton(e){
  
  fetch("http://localhost:8080/journey/"+e.target.id.slice(3), {//update
        method: 'DELETE'
      }).then((res )=>{  return res.json() })               
      .catch(error => console.log(error) )
      .then(response =>{
        console.log(response)
        window.location.reload();
      });
}
  useEffect(fetchData,[]);

  
  return (
    <>
  

    <div style={{ width: '100%', height: '100vh' ,backgroundColor:'#e8eaf6',overflow:'scroll'}}>
      <div className='journey-home-title'>
      <Typography fontFamily="'RocknRoll One', sans-serif" sx={{marginX:'50px'}} textAlign="left" gutterBottom variant="h3" component="div">
           規劃專屬行程
           <Button disabled></Button>
          <Fab title='開始規劃' onClick={() => { setJourneyOpen(true); setOpen(true); setOpenMap(false); }} sx={{ backgroundColor: 'goldenrod' }}><AddIcon></AddIcon></Fab>
          </Typography>
       
        {/* <Link to="/map" ><Fab title='開始規劃' onClick={() => setJourneyOpen(true)} sx={{ backgroundColor: 'goldenrod' }}><AddIcon></AddIcon></Fab></Link> */}
      </div>

    

       <Box /* sx={{ display: 'flex' }} */>
      <div className='journey-home-container' >
      
      {data.map((item,id)=>{
        let temp = `./img/img${id%7+1}.jpg`
        let beginDate = JSON.parse(item.journeydetail).beginDate
        let date = new Date(beginDate)
        date.setDate(date.getDate()+JSON.parse(item.journeydetail).daysNum-1)
        let endDate = date.toISOString().slice(0,10)
        return (
          <Grow in='true' timeout={(id+1)*1000}>
        <Card sx={{ width: 250 }} variant="outlined" >
        <CardMedia
          component="img"
          alt="green iguana"
          height="140"
          image={temp}
        />
        <CardContent>
          <Typography  textAlign="center" gutterBottom variant="h5" component="div">
            {JSON.parse(item.journeydetail).title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {beginDate+"~"+endDate }
          </Typography>
        </CardContent>
        <CardActions>
             {/*  <Stack direction="row" justifyContent="center"
        alignItems="center"
        spacing={2} > */}
        
          <Button color='primary' variant="outlined" endIcon={<MovingIcon id={item.journeyid} onClick={continuteButton}/>} sx={{marginX:'10px'}} size="small" id={item.journeyid} onClick={continuteButton}>繼續旅程</Button>
          <Button color='warning' variant="outlined" endIcon={<WrongLocationIcon  />} size="small" id={"del"+item.journeyid} onClick={deleteButton}>旅程掰掰</Button>
          
         {/* </Stack> */}
        </CardActions>
      </Card>
      </Grow>
      )})}
      </div>
      </Box>
    </div>
    {open ? <JourneyDialog open={open} setOpen={setOpen} openMap={openMap} setOpenMap={setOpenMap} /> : ""}
    </>
  );
}