import Button from '@mui/material/Button';
import React, { useEffect, useState } from 'react'
import './myblog.css'
import MovingIcon from '@mui/icons-material/Moving';


export default function BlogShow() {
    let memberid;
    let journeyid;
    const [blog, setBlog] = useState([]);
    const [journey, setJourney] = useState([]);



    useEffect(() => {
        memberid = window.localStorage.memberid;
        getmemberblog(memberid)
        getmemberjourney(memberid)
    }, [])
    function popcard(e) {

        journeyid = document.getElementById(`popcard-${e.target.id.slice(8, 11)}`).value.slice(9, 13)
        document.getElementById("journeyname").innerHTML = `為 <b>${document.getElementById("popcard-" + e.target.id.slice(8, 11)).closest('div').querySelector('h5').innerText}</b> 寫下一些回憶`
        document.getElementById("buttonForNewBlog").setAttribute("style", "")
        document.getElementById("buttonForNewBlog").innerText = "出發 ➢"
    }
    function getmemberblog(id) {
        fetch(`http://localhost:8080/blog/memberid=${id}`)
            .then((res) => {
                return res.json();
            })
            .then((result) => {
                for (let i = 0; i < result.length; i++) {
                    console.log(result[i].blogdetail)
                    result[i].blogdetail = JSON.parse(result[i].blogdetail)
                }
                setBlog(result)
            })


    }

    function getmemberjourney(id) {
        fetch(`http://localhost:8080/journey/memberid=${id}`)
            .then((res) => {
                console.log(res)
                return res.json();
            })
            .then((result) => {
                console.log(result)

                for (let i = 0; i < result.length; i++) {
                    console.log(result[i].blogdetail)
                    result[i].journeydetail = JSON.parse(result[i].journeydetail)
                }
                setJourney(result)
            })

    }
    function editExistBlog(e) {
        fetch(`http://localhost:8080/blog/${e.target.id.slice(6, 10)}`)
            .then((res) => {
                return res.json();
            })
            .then((result) => {
                window.localStorage.blog = JSON.stringify(result)
                window.localStorage.removeItem("journeyforblog")
                window.location.href = "/Blogeditor";
            })

    }
    function editExistJourney() {

        fetch(`http://localhost:8080/journey/${journeyid}`)
            .then((res) => {
                return res.json();
            })
            .then((result) => {
                window.localStorage.journeyforblog = JSON.stringify(result)
                window.localStorage.removeItem("blog")
                window.location.href = "/Blogeditor";
            })

    }
    function deleteBlog(e) {

        fetch(`http://localhost:8080/blog/${e.target.id.slice(6, 10)}`, {
            method: "DELETE"
        })
            .then((res) => {
                window.location.reload();
            })

    }
    return (

        <div >
            <div class="demo" style={{ backgroundImage: 'url("/images/563231_l.jpg")', backgroundSize: 'cover', paddingRight: '100px', backgroundPosition: 'center', paddingBottom: '100px' }}>
                <h2 class="penName">我的遊記<i class="fa fa-paper-plane" aria-hidden="true" style={{ marginLeft: '10px' }}></i>
                    <button class="button" onClick={() => window.location.href = "#popup"} style={{ marginLeft: '280px' }}>
                        <a href="#popup" style={{ color: "black" }}><i class="fa fa-pencil-square-o" aria-hidden="true"></i></a>
                    </button>
                </h2>

                <div class="popup" id="popup">
                    <a
                        class="popup__close"
                        href="#"
                    >X</a>
                    <div class="popup-inner">
                        <div style={{ marginTop: '30px' }}>
                            <h2>—撰寫遊記—</h2>


                        </div>
                        <p id='journeyname'>-選擇想要新增的旅遊紀錄吧-</p>
                        {/*   <button id ={"buttonForNewBlog"}onClick={editExistJourney} style={{ marginLeft: '650px', marginBottom: '13px', display:"none" }}></button> */}
                        <button id={"buttonForNewBlog"} color='success' variant="contained" style={{ display: 'none' }} size="large" onClick={editExistJourney}>出發 ➢</button>
                        <div class="popup__text">
                            {journey.map((item, id) => {
                                return <div><input type='radio' id={`popcard-${id}`} name='popcard' style={{ display: "none" }} value={"journeyid" + item.journeyid} />
                                    <div class="popCard" id={`element-${id}`} onClick={popcard}>
                                        <div id={`element-${id}`} class="" >
                                            <img id={`element-${id}`} src="\blogimg\b1\44879896482_720c553daa_c.jpg" class="img-fluid" alt="" style={{ height: '100px', width: '150px' }} />
                                        </div>
                                        <div id={`element-${id}`} class="myblog-content" style={{ padding: '10px' }}>
                                            <h5 style={{ overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', fontWeight: 'bold' }} id={`element-${id}`}>{item.journeydetail.title}</h5>
                                            <div id={`element-${id}`}>{`(${item.journeydetail.beginDate})`}</div>
                                        </div>
                                    </div></div>
                            })}



                        </div>

                    </div>
                </div>
                <div class="mainCard">

                    {/* <div class="mainCardHeader"></div> */}
                    <div class="mainCardContent" >
                        {blog.map((item) => {
                            console.log(item.blogdetail)
                            //item.blogdetail = JSON.parse(item.blogdetail);
                            return <div class="miniCard">
                                <div class="myblog-imgbox" >
                                    <img src={item.blogdetail.url} class="img-fluid" alt="" style={{ height: '105px', width: '186px', objectFit: 'cover' }} />
                                </div>
                                <div class="myblog-content" style={{ padding: '10px' }}>
                                    <h5 id="myblog-cardtitle" >{item.blogdetail.title}</h5>
                                    <p id="myblog-descript" >{item.blogdetail.decrption}</p>
                                    <button onClick={deleteBlog} id={`blogid${item.blogid}`} class="btn btn-secondary" style={{ fontSize: '12px',marginLeft:'42px' }}>刪除 <i class="fa fa-angle-right"></i></button>
                                    <button onClick={editExistBlog} id={`blogid${item.blogid}`} class="btn btn-secondary" style={{ fontSize: '12px', marginLeft: '7px' }}>編輯 <i class="fa fa-angle-right"></i></button>
                                </div>
                            </div>


                        })}

                    </div>
                </div>

            </div>


        </div>
    )
}