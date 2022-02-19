import { width } from '@mui/system';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './blog.css'






function Blog() {
    let temp = 0
    const [populardata, setPopulardata] = useState([])
    const [newblogdata, setNewblogdata] = useState([])
    const [popularbloger, setPopularbloger] = useState([]);
    const navigate = useNavigate;
    useEffect((() => {
        getPopularData()
        getNewblogData()
        getPopularBloger()
    }),
        [])
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
    function getNewblogData() {
        fetch("http://localhost:8080/blog/newblog")
            .then((res) => {

                return res.json()
            })
            .then((result) => {

                for (let i = 0; i < result.length; i++) {
                    console.log(result[i].blogdetail)
                    result[i].blogdetail = JSON.parse(result[i].blogdetail)
                }
                console.log(result)
                setNewblogdata(result)
            })

    }
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
    function blogerClick(e) {
        // fetchData(search)
        window.localStorage.searchbloger = e.target.id;
        window.location.href = "/searchpage"

    }
    function getPopularBloger() {
        fetch("http://localhost:8080/member/popularbloger")
            .then((res) => {

                return res.json()
            })
            .then((result) => {

                console.log("this is popular bloger", result)
                setPopularbloger(result)
            })


    }
    return (
        <div style={{ backgroundImage: 'url("/images/AnyConv.com__E_US5SHVQAIuSbE.jpg")', backgroundSize: '100% 100%' }}>
            <div style={{ paddingTop: '60px', marginLeft: '230px', width: '400px', zIndex: '3' }}>
                <h1 id='blogtitlestyle' ><i class="fa fa-tags" aria-hidden="true" style={{ marginRight: '10px' }}></i>熱門文章</h1>
                {/* <img src='\img\未命名-1.jpg' style={{width:'180px',height:'45px',marginBottom:'15px'}}></img> */}
            </div>
            <div class="container-xl" style={{ zIndex: '-1', border: 'solid', borderWidth: '3px', borderRadius: '15px', borderColor: 'rgba(255,255,255,0.1)', backgroundColor: 'rgba(0,0,0,0.5)', Filter: 'blur(20px)' }}>
                <div class="row">
                    <div class="col-md-10 mx-auto">
                        <div id="myCarousel" class="carousel slide" data-ride="carousel" data-interval="0">
                            {/* <!-- Carousel indicators --> */}
                            <ol class="carousel-indicators">

                                {populardata.map((item, id) => {
                                    if (id % 3 == 0) {
                                        temp++;
                                        return <li data-target="#myCarousel" ></li>

                                    }
                                })}

                            </ol>

                            <div class="carousel-inner">
                                {populardata.map((item, index) => {
                                    if (index == 0) {
                                        let lists = [];
                                        for (let i = index; i <= (index + 2); i++) {
                                            if (populardata[i]) {
                                                lists.push(<div class="col-sm-4">
                                                    <div class="thumb-wrapper">
                                                        <div class="img-box">
                                                            <img src={populardata[i].blogdetail.url} class="img-fluid" style={{ objectFit: 'cover', objectPosition: '50% 50%' }} alt="" />
                                                        </div>
                                                        <div class="thumb-content">
                                                            <h4 style={{ width: '180px', height: '58px' }}>{populardata[i].blogdetail.title}</h4>
                                                            <p style={{ width: '175px', height: '39px' }}>{populardata[i].blogdetail.decrption}</p>
                                                            <a onClick={toBlogPage} class="btn btn-primary" id={`blogid${populardata[i].blogid}`}>更多 <i class="fa fa-angle-right"></i></a>
                                                        </div>
                                                    </div>
                                                </div>)
                                            }
                                        }
                                        return <div class="carousel-item active">
                                            <div class="row">
                                                {lists}
                                            </div>
                                        </div>

                                    }
                                    if (index % 3 === 0 && index !== 0) {
                                        let lists = [];
                                        for (let i = index; i <= (index + 2); i++) {
                                            if (populardata[i]) {
                                                lists.push(<div class="col-sm-4">
                                                    <div class="thumb-wrapper">
                                                        <div class="img-box">
                                                            <img src={populardata[i].blogdetail.url} class="img-fluid" alt="" />
                                                        </div>
                                                        <div class="thumb-content">
                                                            <h4 style={{ width: '180px', height: '58px' }}>{populardata[i].blogdetail.title}</h4>
                                                            <p style={{ width: '175px', height: '39px' }}>{populardata[i].blogdetail.decrption}</p>
                                                            <a onClick={toBlogPage} class="btn btn-primary" id={`blogid${populardata[i].blogid}`}>更多 <i class="fa fa-angle-right"></i></a>
                                                        </div>
                                                    </div>
                                                </div>)
                                            }
                                        }
                                        return <div class="carousel-item">
                                            <div class="row">
                                                {lists}
                                            </div>
                                        </div>
                                    }
                                })}

                            </div>
                            {/* <!-- Carousel controls --> */}
                            <a class="carousel-control-prev" href="#myCarousel" data-slide="prev">
                                <i class="fa fa-angle-left"></i>
                            </a>
                            <a class="carousel-control-next" href="#myCarousel" data-slide="next">
                                <i class="fa fa-angle-right"></i>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            <div style={{ marginTop: '50px', marginBottom: '10px', marginLeft: '230px' }}>
                <h1 id='blogtitlestyle'><i class="fa fa-tags" aria-hidden="true" style={{ marginRight: '10px' }}></i>最新文章</h1>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '5% 60% 35% ', backgroundImage: 'url("")', backgroundSize: '100% 100%', marginLeft: '10px' }}>
                <div></div>
                <div style={{ paddingBottom: '10px' }}>


                    {newblogdata.map((item) => {
                        return <div class="blog-card">
                            <div class="meta">
                                <div class="photo" style={{ backgroundImage: `url(${item.blogdetail.url})` }}></div>
                                <ul class="details">
                                    
                                    <li class="date">{item.blogcreatetime.slice(0, 10)}</li>

                                </ul>
                            </div>
                            <div class="description">
                                <h1 style={{ width: '388px', height: '60px' }}>{item.blogdetail.title}</h1>

                                <p style={{ width: '388px', height: '40px' }}> {item.blogdetail.decrption}</p>
                                <p class="read-more" style={{ cursor: 'pointer' }}>
                                    <a onClick={toBlogPage} id={`blogid${item.blogid}`}>{"...更多"}</a>
                                </p>
                            </div>
                        </div>
                    })}


                </div>
                <div>
                    <div style={{ width: '300px', height: `${(popularbloger.length) * 115+15}px`, backgroundColor: 'rgba(0,0,0,0.6)', borderRadius: '5px', marginTop: '15px', marginLeft: '40px',marginBottom:'50px' }}>
                        <div style={{ paddingTop: "15px", color: 'white', paddingLeft: '25px', marginBottom: '20px' }}>
                            <h4><i class="fa fa-address-book-o" aria-hidden="true" style={{ marginRight: '15px' }}></i>熱門作家</h4>
                        </div>
                        <ul class="details">
                            {/* popularbloger.map */}
                            {popularbloger.map((item, index) => {
                                return <>
                                    <li style={{ marginLeft: '30px', marginTop: '10px', position: 'absolute', fontSize: '1.5rem', color: 'white', fontWeight: 'bold' }}>{index + 1}.</li>
                                    <li onClick={blogerClick} class="" style={{ marginLeft: '40px', marginBottom: '20px', height: '90px', cursor: 'pointer' }}>
                                        <img alt="Avatar" id={item.memberid +","+ item.membernickname} src={item.membericon} style={{ width: '60px', height: '60px', marginLeft: '20px', "border-radius": "50%" }} />
                                        <ul style={{ marginLeft: '100px', marginTop: '-63px', marginRight: '20px' }}>
                                            <li id={item.memberid +","+ item.membernickname} style={{ color: 'white', fontWeight: 'bold', fontSize: "18px" }}>{item.membernickname}</li>
                                            <li id={item.memberid +","+ item.membernickname} className='detail-member-intro' >{item.memberintro}</li>
                                        </ul>
                                    </li>
                                </>
                            })}
                        </ul>
                    </div>
                </div>
            </div>
        </div>

    );

}

export default Blog;

/* font-family: 'DotGothic16', sans-serif;

font-family: 'RocknRoll One', sans-serif;
font-family: 'Stick', sans-serif; */