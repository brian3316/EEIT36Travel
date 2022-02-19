import React, { useState , useEffect} from 'react'
import { Marker, useJsApiLoader, useLoadScript, GoogleMap, LoadScript, DirectionsRenderer, Autocomplete } from '@react-google-maps/api';
import { margin, padding } from '@mui/system';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import DeleteIcon from '@mui/icons-material/Delete';


import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import './map.css'
import { ButtonBase } from '@mui/material';
import PlanTableTest from './PlanTableTest';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';

import Carousel from 'react-material-ui-carousel'

// Modal
const style = {
  position: 'absolute',
  top: '55%',
  left: '32%',
  transform: 'translate(-50%, -50%)',
  width: 330,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};




// Modal 
const containerStyle = {

  width: '100%',
  height: '100%'
};
let autocomplete = null;//自動完成的結果
let openhour = null;

function MyComponent() {
//
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleSent = () => {setPlace({"place_id":placedetail.place_id,"place_name":placedetail.name});
  /* setOpen(false); */}
//

  const [center, setCenter] = useState({
    lat: 24.1369434,
    lng: 120.6369918
  })
  const [mark, setMark] = useState({

  })

  const [placedetail, setPlacedetail] = useState([]);
  const [placeopen, setPlaceopen] = useState([]);
  const [place, setPlace] = useState("");

  let lists = null;
  let picurl = '';

  const [zoomin, setZoomin] = useState(18)//自動完成後zoomin用
  const [resault, setResault] = useState({})//direction 
  const { isLoaded, loadError } = useLoadScript({
  //  AIzaSyAyzMJTILn9Et7hkWpxfA3jyOdILF7zCig
   
    googleMapsApiKey: "AIzaSyC-PEqQflUzaDeh1SUbTI1wSS1onLCvTKY",
    libraries: ["places"]
  })

 
  
  
  

  if (loadError) {
    return <div>Map cannot be loaded right now, sorry.</div>
  }
  return isLoaded ? (
    <>
     
      
      <div className='maps'>
        <div className='plan'><PlanTableTest setResault={setResault} detail={placedetail} place={place} setOpen ={setOpen}/*把方法丟給table給他取用*//></div>
        <div>
          {/* {  <LoadScript
        googleMapsApiKey="AIzaSyAyzMJTILn9Et7hkWpxfA3jyOdILF7zCig"
        libraries:["places"]
      > */}

          <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={zoomin}
          >
            <></>
            <Autocomplete
              onLoad={(auto) => { autocomplete = auto }/**/}
              onPlaceChanged={() => {
                
                
              /*   console.log(autocomplete.getPlace().photos[0].getUrl());
                console.log(autocomplete.getPlace());
                picurl = autocomplete.getPlace().photos[0].getUrl();
 */

                if (autocomplete.getPlace().geometry!=undefined) {
                  setPlacedetail(autocomplete.getPlace());
                  setCenter(autocomplete.getPlace().geometry.location);//重新定位
                  setMark(autocomplete.getPlace().geometry.location);//標記
                  setZoomin(20);//拉近
                  {handleOpen()};
                } else {
                  
                }
                

               
              
              }}
            >
              <input
                id='yoyoyo'
                type="text"
                placeholder="搜尋 Google 地圖"
                style={{
                  boxSizing: `border-box`,
                  border: `1px solid transparent`,
                  width: `280px`,
                  height: `40px`,
                  padding: `0 12px`,
                  borderRadius: `3px`,
                  boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
                  fontSize: `14px`,
                  outline: `none`,
                  textOverflow: `ellipses`,
                  position: "absolute",
                  left: "50%",
                  marginLeft: "-120px"
                }}
              />
            </Autocomplete>
            
            <Marker
              position={mark}
            />
            <DirectionsRenderer
              // required
              options={{
                directions: (resault != null) ? resault : null
              }}

            />
          </GoogleMap>


          <div>
            
          <Modal
        sx={{overflow:'scroll'}}
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        hideBackdrop="true"
        
       /*  sx={{display:'flex'}} */
      >
        <Box sx={style}>
        {/* <Button variant="outlined"  sx={{width:'10px'}} size='small' onClick={handleClose} style={{float: 'right'}}  startIcon={<DeleteIcon />} >X</Button> */}
        <IconButton aria-label="delete" onClick={handleClose} style={{float: 'right'}}>
       <CloseIcon />
        </IconButton>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            <a href={placedetail.url}>{placedetail.name}</a>
            <hr></hr>
          </Typography>
          <Typography inline id="modal-modal-description" sx={{ mt: 2 }}>
           <b>電話：</b><br/>{placedetail.formatted_phone_number}<br></br><br></br>
           <b>地址：</b><br/>{placedetail.formatted_address} <br></br><br></br>
           
           
            <b>
           {/*  {placedetail.opening_hours==undefined?null:placedetail.opening_hours.weekday_text[0]}  */}
           
           {/*  {placedetail.opening_hours==undefined?null:placedetail.opening_hours.map((res)=>{return res.weekday_text})}  */}
           {placedetail.opening_hours==undefined?null:"開放時間： "} 
           </b>
           <br></br>
           {/* {placedetail.opening_hours==undefined?null:JSON.stringify(placedetail.opening_hours.weekday_text)}  */}
           {placedetail.opening_hours==undefined?null:placedetail.opening_hours.weekday_text[0]}
           {placedetail.opening_hours==undefined?null:<br></br>}
           {placedetail.opening_hours==undefined?null:placedetail.opening_hours.weekday_text[1]}
           {placedetail.opening_hours==undefined?null:<br></br>}
           {placedetail.opening_hours==undefined?null:placedetail.opening_hours.weekday_text[2]}
           {placedetail.opening_hours==undefined?null:<br></br>}
           {placedetail.opening_hours==undefined?null:placedetail.opening_hours.weekday_text[3]}
           {placedetail.opening_hours==undefined?null:<br></br>}
           {placedetail.opening_hours==undefined?null:placedetail.opening_hours.weekday_text[4]}
           {placedetail.opening_hours==undefined?null:<br></br>}
           {placedetail.opening_hours==undefined?null:placedetail.opening_hours.weekday_text[5]}
           {placedetail.opening_hours==undefined?null:<br></br>}
           {placedetail.opening_hours==undefined?null:placedetail.opening_hours.weekday_text[6]}
           {placedetail.opening_hours==undefined?null:<br></br>}
         
           <br></br>
          {/*  <img src={placedetail.photos[0].getUrl()} width={270} height={200}></img>   */}
           <Carousel>
           {placedetail.photos==undefined?null:<img src={placedetail.photos[0].getUrl()} width={270} height={200}></img>}
           {placedetail.photos==undefined?null:<img src={placedetail.photos[1].getUrl()} width={270} height={200}></img>}
           {placedetail.photos==undefined?null:<img src={placedetail.photos[2].getUrl()} width={270} height={200}></img>}
           </Carousel>

           <Button  color="primary" onClick={handleSent} variant="contained" style={{marginLeft:'28%',marginTop:'10%'}}>加入行程</Button>
           {/* 三元運算 */}

          {/* test: {placeopen} */}
         {/*  test2: {placedetail.opening_hours.weekday_text[0]} */}

           
           {/* 開放時間： <br></br>
           {
           placedetail.opening_hours.weekday_text[0] 
           }<br></br>
            {
           placedetail.opening_hours.weekday_text[1] 
           }<br></br>
            {
           placedetail.opening_hours.weekday_text[2] 
           }<br></br>
            {
           placedetail.opening_hours.weekday_text[3] 
           }<br></br>
            {
           placedetail.opening_hours.weekday_text[4] 
           }<br></br>
            {
           placedetail.opening_hours.weekday_text[5] 
           }<br></br>
            {
           placedetail.opening_hours.weekday_text[6] 
           }<br></br> */}
           
          
          
          
          </Typography>
        </Box>
      </Modal>
      
      
      
      </div>



          {/* </LoadScript>  } */}
        </div>
      </div>


    </>
  ) : <></>
}

export default React.memo(MyComponent)



