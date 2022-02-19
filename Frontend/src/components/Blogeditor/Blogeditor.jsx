import { WindowOutlined } from '@mui/icons-material'
import React, { useState } from 'react'
import './blogeditor.css'
import { useEffect } from 'react'

import TextField from '@mui/material/TextField';
import { DropzoneArea } from 'material-ui-dropzone';
import { alertTitleClasses, Button } from '@mui/material';
import { MuiThemeProvider, createTheme, ThemeProvider, styled } from '@mui/material/styles';
import { green } from '@mui/material/colors';
import SaveIcon from '@mui/icons-material/Save';
import { format } from "date-fns/esm";
// "{\"beginDate\":\"2022-01-19\",\"daysNum\":4,\"eachDays\":[{\"eachPlaces\":[{\"placeName\":\"南屯國小\",\"AttractionsId\":\"ChIJ0ZMoF8k9aTQRuCDDop7t6kc\"},{\"placeName\":\"北屯國小\",\"AttractionsId\":\"ChIJHQYfVeAXaTQRnAVJXNo3vIE\"}]},{\"eachPlaces\":[{\"placeName\":\"北區醫院\",\"AttractionsId\":\"ChIJC5WkxxX2AzQRfGB1A1MRrh8\"}]},{\"eachPlaces\":[{\"placeName\":\"西屯國小\",\"AttractionsId\":\"ChIJUyVn5BgWaTQR9DFV9fYc0BY\"}]}]}"
// {"blogid":13,"blogdetail":"{\r\n    \"title\":\"集中營3日遊\",\r\n    \"decrption\":\"decrption\",\r\n    \"eachDay\":[\r\n        {\r\n            \"eachplace\":[\r\n                {\r\n                    \"subTitle\":\"集中營\",\r\n                    \"text\":\"真猶你的\",\r\n                    \"pic\":[\"\",\"\"],\r\n                    \"AttractionsId\":\"123\"\r\n                },\r\n                {\r\n                    \"subTitle\":\"毒氣室\",\r\n                    \"text\":\"..........\",\r\n                    \"pic\":[\"\",\"\"],\r\n                    \"AttractionsId\":\"7777777\"\r\n                },\r\n                {\r\n                    \"subTitle\":\"這裡超好玩\",\r\n                    \"text\":\"內文blablablablabal..........\",\r\n                    \"pic\":[\"\",\"\"],\r\n                    \"AttractionsId\":\"3\"\r\n                }\r\n            \r\n            ]                \r\n        },\r\n        {\r\n            \"eachplace\":[\r\n                {\r\n                    \"subTitle\":\"古色古香的咖啡廳\",\r\n                    \"text\":\"1111111..........\",\r\n                    \"pic\":[\"\",\"\"],\r\n                    \"AttractionsId\":\"123\"\r\n                },\r\n                {\r\n                    \"subTitle\":\"24小時營業的而且還賣滷味的家具店\",\r\n                    \"text\":\"內文blablablablabal..........\",\r\n                    \"pic\":[\"\",\"\"],\r\n                    \"AttractionsId\":\"7777777\"\r\n                },\r\n                {\r\n                    \"subTitle\":\"這裡超好玩\",\r\n                    \"text\":\"內文blablablablabal..........\",\r\n                    \"pic\":[\"\",\"\"],\r\n                    \"AttractionsId\":\"3\"\r\n                }\r\n            \r\n            ]                \r\n        },\r\n            {\r\n                \"eachplace\":[\r\n                    {\r\n                        \"subTitle\":\"古色古香的咖啡廳\",\r\n                        \"text\":\"1111111..........\",\r\n                        \"pic\":[\"\",\"\"],\r\n                        \"AttractionsId\":\"123\"\r\n                    },\r\n                    {\r\n                        \"subTitle\":\"24小時營業的而且還賣滷味的家具店\",\r\n                        \"text\":\"內文blablablablabal..........\",\r\n                        \"pic\":[\"\",\"\"],\r\n                        \"AttractionsId\":\"7777777\"\r\n                    },\r\n                    {\r\n                        \"subTitle\":\"這裡超好玩\",\r\n                        \"text\":\"內文blablablablabal..........\",\r\n                        \"pic\":[\"\",\"\"],\r\n                        \"AttractionsId\":\"3\"\r\n                    }               \r\n                ]                \r\n            }\r\n    ]\r\n}","blogauthority":0,"blogcreatetime":"2022-01-16T16:48:34.000+00:00","blogupdatetime":null,"blogpopular":7}
export default function BlogShow() {
    const [upload, setOpload] = useState(false);
    let blog;
    let data;
    const [populardata, setPopulardata] = useState([]);
    const [memberdata, setMemberdata] = useState([]);
    useEffect(() => {
        getPopularData();
        getMemberData();
    }, []);
    function toBlogPage(e) {

        fetch("http://localhost:8080/blog/" + (e.target.id).slice(6, 8))
            .then((res) => {

                return res.json()
            })
            .then((result) => {
                window.localStorage.blogdata = JSON.stringify(result)
                window.location.href = "/Blogshow"

            })
    }
    function getPopularData() {
        fetch("http://localhost:8080/blog/topblog")
            .then((res) => {

                return res.json()
            })
            .then((result) => {

                for (let i = 0; i < result.length; i++) {
                    console.log(result[i].blogdetail)
                    result[i].blogdetail = JSON.parse(result[i].blogdetail)
                }
                console.log(result)
                setPopulardata(result)
            })
    }
    function getMemberData() {
        //alert(window.localStorage.memberid)
        let id = window.localStorage.memberid
        fetch("http://localhost:8080/member/" + id)
            .then((res) => {

                return res.json()
            })
            .then((result) => {
                setMemberdata(result)
            })
    }
    function initblog() {

        blog = {};
        blog.blogauthority = 0
        blog.blogdetail = {};
        blog.blogdetail.title = "";
        blog.blogdetail.decrption = "";
        blog.blogdetail.eachDay = [];
        blog.blogdetail.url = ""
        if (window.localStorage.journeyforblog) {
            data = JSON.parse(window.localStorage.journeyforblog);
            data.journeydetail = JSON.parse(data.journeydetail);
        }
        if (window.localStorage.blog) {
            existblog();
        } else {
            journeytoblog();
        }
    }
    useEffect(getMemberNickName, [])
    function journeytoblog() {
        for (let i = 0; i < data.journeydetail.eachDays.length; i++) {
            let tempdata = {};
            tempdata.eachplace = [];
            for (let n = 0; n < data.journeydetail.eachDays[i].eachPlaces.length; n++) {
                let tempObject = {};
                tempObject.subTitle = data.journeydetail.eachDays[i].eachPlaces[n].placeName
                tempObject.text = "";
                tempObject.pic = "";
                tempdata.eachplace.push(tempObject)
            }
            blog.blogdetail.eachDay.push(tempdata)

        }
        //window.localStorage.removeItem()
        console.log(blog)
        //blogdata = blog;
    }
    function existblog() {

        blog = JSON.parse(window.localStorage.blog);

        blog.blogdetail = JSON.parse(blog.blogdetail);


        if (blog.blogcreatetime) {
            blog.blogcreatetime = format(new Date(blog.blogcreatetime), "yyyy-MM-dd'T'HH:mm:ss.SSSxxx");
        }
        if (blog.blogupdatetime) {
            blog.blogupdatetime = format(new Date(blog.blogupdatetime), "yyyy-MM-dd'T'HH:mm:ss.SSSxxx");
        }
    }
    function changeText(e) {
        if ((e.target.id + "").includes("area")) {
            blog.blogdetail[(e.target.id.substr(0, e.target.id.length - 4))] = e.target.value
        } else {
            let index1 = (e.target.id).slice(5, 6)
            let index2 = (e.target.id).slice(6, 7)
            blog.blogdetail.eachDay[index1].eachplace[index2].text = e.target.value
        }
    }
    function imagesave(blob, logicname, topimg) {
        fetch(`https://storage.googleapis.com/upload/storage/v1/b/travelproject/o?uploadType=media&name=${logicname}.png`, {
            method: "post",
            body: blob,
            headers: new Headers({
                "Content-Type": "image/png"
            })
        })
            .then((res) => {
                console.log(res)
                if (topimg) {
                    setOpload(true);
                }

            })
    }
    function save() {
        console.log("save" + JSON.stringify(blog))
        let blogdata = blog
        //blogdata.blogdetail.bloger = window.localStorage.nickName;
        blogdata.blogdetail = JSON.stringify(blogdata.blogdetail);
        if (blogdata.blogid) {

            fetch(`http://localhost:8080/blog/`, {
                method: "put",
                body: JSON.stringify(blogdata),
                headers: new Headers({
                    "Content-Type": "application/json"
                })
            }).then((res) => {
                return res.json();
            }).then((result) => {
                fetchdata(blogdata.blogid)
            })
        } else {
            fetch(`http://localhost:8080/blog/member=${window.localStorage.memberid}&journey=${data.journeyid}`, {
                method: "post",
                body: JSON.stringify(blogdata),
                headers: new Headers({
                    "Content-Type": "application/json"
                })
            }).then((res) => {
                return res.json();
            }).then((result) => {
                fetchdata(result.blogid)

            })
        }

    }
    function fetchdata(id) {
        fetch(`http://localhost:8080/blog/${id}`)
            .then((res) => {
                return res.json();
            })
            .then((result) => {
                console.log(result)
                window.localStorage.blog = JSON.stringify(result);
                window.location.reload();
            })
    }
    function imgchange(e) {

        let url = URL.createObjectURL(e.target.files[0])
        document.getElementById((e.target.id).substr(0, e.target.id.length - 5)).setAttribute("src", url)

        let date = new Date();
        let logicname = (e.target.id).substr(0, e.target.id.length - 5) + date.toISOString();
        if ((e.target.id + "").includes("topimg")) {
            blog.blogdetail.url = `https://storage.googleapis.com/travelproject/${logicname}.png`
        } else {

            let index1 = (e.target.id).slice(3, 4)
            let index2 = (e.target.id).slice(4, 5)
            blog.blogdetail.eachDay[index1].eachplace[index2].pic = `https://storage.googleapis.com/travelproject/${logicname}.png`
        }
        imagesave(e.target.files[0], logicname)
    }
    //update
    function imgchange2(files) {

        if (files[0] != undefined) {


            let url = URL.createObjectURL(files[0])
            document.getElementById('topimg2').hidden = false
            document.getElementById('topimg2').setAttribute("src", url)
            let date = new Date();
            let logicname = files[0].name + date.toISOString();
            blog.blogdetail.url = `https://storage.googleapis.com/travelproject/${logicname}.png`

            imagesave(files[0], logicname, true)
            blog.blogdetail = JSON.stringify(blog.blogdetail)
            window.localStorage.blog = JSON.stringify(blog)


        }
    }

    //
    function getMemberNickName() {
        fetch("http://localhost:8080/member/" + window.localStorage.memberid)
            .then((res) => {
                return res.json();
            })
            .then((resault) => {
                window.localStorage.nickName = resault.membernickname;
            })
    }

    initblog();


    return (

        <div style={{ display: 'grid', gridTemplateColumns: '75% 25%' }}>

            <div>
                {/* <div class="bls" style={{ width: '1000px', height: '350px', margin: '70px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <input id='topimginput' type={"file"} onChange={imgchange}></input>
                    <img id='topimg' src={blog.blogdetail.url} style={{ width: '100%', height: '100%', objectFit: 'cover' }}></img>
                </div> */}
                <div style={{ marginLeft: '100px', marginTop: "50px", marginBottom: '60px', width: '900px' }}>
                    {upload == true ?
                        <div></div>
                        : <DropzoneArea
                            acceptedFiles={['image/*']}
                            dropzoneText={"請將封面圖片拖曳至此 或透過點擊增加"}
                            onChange={imgchange2}
                            filesLimit='1'
                            onAlert={(message, variant) => console.log(`${variant}: ${message}`)}
                            fullWidth
                        />

                    }
                    <img id='topimg2' hidden={blog.blogdetail.url ? false : true} src={blog.blogdetail.url} style={{ width: '100%', height: '100%', objectFit: 'cover' }}></img>


                    <br></br><br></br>

                    <TextField
                        id="titlearea"
                        label="標題"
                        placeholder="為您的旅程設下一個標題...."
                        /*  variant="standard" */
                        color="success"
                        focused
                        fullWidth
                        onChange={changeText}
                        defaultValue={blog.blogdetail.title}
                    />
                    <br></br>
                    <br></br>
                    <TextField

                        id="decrptionarea"
                        label="內文"
                        placeholder="為您的旅程增加一些描述...."
                        /*  variant="standard" */
                        color="info"
                        focused
                        fullWidth
                        multiline='true'
                        minRows='4'
                        onChange={changeText}
                        defaultValue={blog.blogdetail.decrption}

                    />
                    {/*   <textarea onChange={changeText} id="titlearea">{(blog.blogdetail.title) ? blog.blogdetail.title : "為您的旅程設下一個標題...."}</textarea>
                    <textarea onChange={changeText} id="decrptionarea">{(blog.blogdetail.decrption) ? blog.blogdetail.decrption : "為您的旅程增加一些描述...."}</textarea>
             */}
                </div>
                <div >
                    <div class="leftcolumn" style={{ backgroundColor: '', overflow: 'auto', height: '1000px' }}>
                        {/* <button onClick={save}>save</button> */}

                        {blog.blogdetail.eachDay.map((item, idex) => {
                            let list = [];
                            for (let i = 0; i < item.eachplace.length; i++) {
                                list.push(<div class="card" style={{ display: 'grid', gridTemplateColumns: '65% 35%' }}>
                                    <div >
                                        <h3><i class="fa fa-map-marker" aria-hidden="true"></i>  {item.eachplace[i].subTitle}</h3>
                                        <textarea onChange={changeText} id={`index${idex}${i}`} type="text" style={{ resize: 'none', height: "270px", width: '615px', overflow: "scroll" }}>{item.eachplace[i].text}</textarea>


                                    </div>
                                    <div>

                                        <input id={`img${idex}${i}input`} type={"file"} onChange={imgchange} name={'test'}></input>
                                        <img id={`img${idex}${i}`} src={item.eachplace[i].pic} style={{ width: '350px', height: '295px', objectFit: 'cover' }}></img>


                                    </div>
                                </div>)
                            }

                            return <><h2 id={idex} style={{ boxShadow: '0 2px', paddingBottom: '10px', width: '400px', marginTop: '60px' }}><i class="fa fa-map-o" aria-hidden="true"></i>  第 {idex + 1} 天</h2>{list}</>
                        })}
                        <Button sx={{ left: '900px', top: '20px' /* position: 'absolute', right:'0px' */ }} onClick={save} color='success' size='large' variant='contained' startIcon={<SaveIcon></SaveIcon>}>儲存編輯內容</Button>
                    </div>
                </div>
            </div>
            <div>
                <div class="rightcolumn">
                    <div style={{ width: '300px', height: '450px', backgroundColor: 'rgba(0,0,0,0.6)', borderRadius: '5px', marginTop: '15px', marginLeft: '20px' }}>

                        <div class="card1" style={{ backgroundColor: 'transparent' }}>

                            <div class="" style={{ color: 'white', fontSize: '24px', fontWeight: 'bold' }}><img alt="Avatar" src={memberdata.membericon} style={{ height: "100px", width: '100px', "border-radius": "50%", marginRight: '10px' }} />{` ${memberdata.membernickname}`}</div>
                            <br />
                            <p style={{ color: 'white', marginBottom: '0px', overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', fontWeight: 'bold', WebkitLineClamp: '2', WebkitBoxOrient: 'vertical' }}>{memberdata.memberintro}</p>
                        </div>

                        <div class="card1" style={{ backgroundColor: 'transparent' }}>
                            <h4 style={{ color: 'white', fontWeight: 'bold' }}><i class="fa fa-newspaper-o" aria-hidden="true" style={{ marginRight: '10px' }}></i>旅遊目錄</h4>
                            <nav style={{ color: 'white' }}>
                                <ul>
                                    {blog.blogdetail.eachDay.map((item, idex) => {
                                        return <li><a href={`#${idex}`} id='blogshow-day' style={{ marginLeft: '37px', resize: 'none', overflow: "scroll", fontWeight: 'bold' }}>第 {idex + 1} 天</a></li>
                                    })}

                                </ul>
                            </nav>
                        </div>
                    </div>
                    <div class="card1">
                        {/* 此處有更改 */}
                        <div style={{ width: '300px', height: '650px', backgroundColor: 'rgba(0,0,0,0.6)', borderRadius: '5px' }}>
                            <div style={{ paddingTop: "15px", color: 'white', paddingLeft: '25px', marginBottom: '30px' }}>
                                <h4 style={{ fontWeight: 'bold' }}><i class="fa fa-star" aria-hidden="true" style={{ marginRight: '15px' }}></i>熱門文章</h4>
                            </div>
                            <ul class="details">
                                {populardata.map((item, id) => {
                                    if (id < 3) {
                                        return <li onClick={toBlogPage} class="" style={{ height: '110px', marginBottom: '70px', cursor: 'pointer' }} >
                                            <div class="blog-card" style={{ height: '160px', width: '260px' }}>
                                                <div class="meta">
                                                    <div id={`blogid${item.blogid}`} class="photo" style={{ backgroundImage: `url(${item.blogdetail.url})`, height: '160px', width: '260px' }}></div>
                                                    {/* `url(${item.blogdetail.url})` */}
                                                    <ul id={`blogid${item.blogid}`} class="details" style={{ height: '160px', width: '105px' }}>
                                                        <li class="fa fa-pencil" id={`blogid${item.blogid}`}>     {item.blogdetail.title}</li>
                                                        <li class="date" id={`blogid${item.blogid}`}>{item.blogcreatetime.slice(0, 10)}</li>

                                                    </ul>
                                                </div>
                                            </div>
                                        </li>
                                    }

                                })}

                            </ul>

                        </div>
                    </div>
                </div>
            </div>

        </div>

    )

}