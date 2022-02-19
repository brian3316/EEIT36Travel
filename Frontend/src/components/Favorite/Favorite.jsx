import React, { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Zoom from '@mui/material/Zoom';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import Box from '@mui/material/Box';
import SendIcon from '@mui/icons-material/Send';

import './favorite.css'






let memberid = window.localStorage.memberid
const Favorite = () => {

    const [data, setData] = useState([]);

    function fetchData() {
        fetch("http://localhost:8080/collect/memberid=" + memberid)
            .then((res) => {
                return res.json();
            })
            .then((result) => {
                console.log(result)
                setData(result)
            }

            )
    }

    function test2(e) {

        fetch("http://localhost:8080/blog/" + (e.target.id))
            .then((res) => {
                return res.json()
            })
            .then((result) => {
                window.localStorage.blogdata = JSON.stringify(result)
                window.location.href = "/Blogshow"

            })
    }

    useEffect(fetchData, []);
    return (
        <div >
            {/* <div>
            <h1>收藏頁面</h1>
        </div> */}
            <div style={{ paddingLeft: '250px', paddingTop: '120px', paddingBottom: '250px', display: "flex" }}>

                <div class="cover">

                    <div class="book">

                        <label for="page-1" class="book__page book__page--1">
                            <img src="\img\pexels-photo-1717937.jpeg" alt="" />
                        </label>

                        <label for="page-2" class="book__page book__page--4">
                            <div class="page__content1" id='bloglist1'style={{overflow: 'auto'}}>
                                {/* <h1 class="page__content-title">I</h1> */}
                                <ul class='favorite1' >


                                    {
                                        data.map((item, index) => {
                                            let test = JSON.parse(item.blogdetail).title;
                                            return (
                                                <div >
                                                    {/*  <li>
                                <a href='#'><h3>{test}</h3></a>
                                
                                {JSON.parse(item.blogdetail).decrption}
                                <br></br> <br></br>
                            </li> */}
                                                    <Zoom in='true' timeout={(index + 5) * 1000} id='bloglist'>
                                                        <Card sx={{ maxWidth: 700 /* 345 */, marginBottom: 3, display: 'flex' }}>
                                                            <CardMedia
                                                                component="img"
                                                                alt=""
                                                                /* width="200" */
                                                                
                                                                height="140"
                                                                sx={{ width: 150,objectFit: 'cover' }}
                                                                image={JSON.parse(item.blogdetail).url}
                                                                
                                                            />
                                                            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                                                <CardContent
                                                                    width="100"
                                                                >
                                                                    <Typography gutterBottom variant="h5" component="div" id='favoriteCardTitle'>
                                                                        {test}
                                                                    </Typography>
                                                                    <Typography variant="body2" color="text.secondary" id='favoriteCardScript'>
                                                                        {JSON.parse(item.blogdetail).decrption}
                                                                    </Typography>
                                                                </CardContent>
                                                                <CardActions sx={{paddingBottom:'0px' }}>
                                                                    <Button sx={{ marginLeft: '55%' }} size="smail" id={item.blogid} onClick={test2} endIcon={<SendIcon id={item.blogid} onClick={test2}/>} >瀏覽Blog</Button>
                                                                </CardActions>
                                                            </Box>
                                                        </Card>
                                                    </Zoom>
                                                </div>
                                            )
                                        })
                                    }
                                    {/*   <li><a href='https://github.com/EEIT36-Travel'>星期一二三</a></li>
                    <li>星期二三四五六</li>
                    <li>星期一四五</li>
                    <li>星期二</li> */}




                                </ul>
                                {/* <div class="page__content-blockquote">
                    <p class="page__content-blockquote-text"><a href='https://codepen.io/pascaloliv/pen/LVZaeE'>HARI SELDON — . . . born in the 11,988th year of  </a></p>
                    <p class="page__content-blockquote-text">. . . Undoubtedly his greatest contributions were in the field of psychohistory. Seldon found the field little more than a set of vag </p>
                    <p class="page__content-blockquote-text">. . . The best existing authority we have for the details of his life is the biography written by Gaal Dornick who, as a young </p>
                    <span class="page__content-blockquote-reference">Encyclopedia Galactica*</span>
                </div>
                <div class="page__content-text">
                    <p>His name was Gaal Dornick and he wa </p>
                    <p>There were nearly twenty-five million i </p>
                    <p>To Gaal, this trip was the undoub </p>
                </div> */}

                            </div>

                        </label>

                        {/* Resets the page  */}
                        <input type="radio" name="page" id="page-1" />

                        {/* Goes to the second page  */}
                        <input type="radio" name="page" id="page-2" />

                        <label class="book__page book__page--2">
                            <div class="book__page-front">
                                <div class="page__content1">
                                    <h1 class="page__content1-book-title">旅遊收藏</h1>
                                    <h2 class="page__content1-author">Travel Memory</h2>
                                    <p class="page__content1-credits">
                                        <span><i class="fa fa-pencil" aria-hidden="true"></i>  收集來自不同人的回憶</span>
                                    </p>
                                    <p class="page__content1-credits">
                                        <span><i class="fa fa-pencil" aria-hidden="true"></i>  留下令你心動的場景</span>
                                    </p>
                                </div>
                            </div>
                            <div class="book__page-back" style={{ backgroundImage: 'url("/img/20210407060720899.jpg")', backgroundSize: '100% 100%' }} />
                        </label>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Favorite;
