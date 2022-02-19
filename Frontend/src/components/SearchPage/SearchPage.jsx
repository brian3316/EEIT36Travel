import { width } from '@mui/system';
import React, { useEffect, useState } from 'react';
import './SearchPage.css'





function Blog({ search }) {
    //拿取搜尋值
    const [data, setData] = useState([]);
    const [searchinput, setSearchinput] = useState([]);
    const [searchtext, setSearchtext] = useState([]);
    const [populardata, setPopulardata] = useState([]);
    const [popularbloger, setPopularbloger] = useState([]);
    useEffect(() => {
        if (!search && !window.localStorage.searchbloger) {

            fetchData("")
            getPopularData();
            getPopularBloger();
        } else if (window.localStorage.searchbloger) {
            let temp = window.localStorage.searchbloger.split(",")
            //setSearchinput(temp[0])
            fetchDataBybloger(temp[0], temp[1])
            window.localStorage.removeItem("searchbloger");
            getPopularData();
            getPopularBloger();
        }
    }, [])

    useEffect(() => {
        if (search) {
            fetchData(search)
            getPopularData();
            getPopularBloger();
        }

    }, [search])


    function fetchDataBybloger(memberid, nickname) {

        //alert("key:"+keyword)
        fetch(`http://localhost:8080/blog/memberid=${memberid}`)
            .then((res) => {
                return res.json()
            })
            .then((result) => {
                for (let i = 0; i < result.length; i++) {
                    result[i].blogdetail = JSON.parse(result[i].blogdetail)
                }
                console.log(result)
                setData(result)
                setSearchtext(nickname)
            })
    }

    function fetchData(keyword) {

        //alert("key:"+keyword)
        fetch(`http://localhost:8080/blog/keyword=${keyword}`)
            .then((res) => {
                return res.json()
            })
            .then((result) => {
                for (let i = 0; i < result.length; i++) {
                    result[i].blogdetail = JSON.parse(result[i].blogdetail)
                }
                console.log(result)
                setData(result)
                setSearchinput(keyword ? keyword : "全部")
                setSearchtext(keyword ? keyword : "全部")
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
    function getPopularBloger() {
        fetch("http://localhost:8080/member/popularbloger")
            .then((res) => {

                return res.json()
            })
            .then((result) => {

                console.log(result)
                setPopularbloger(result)
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
        search = e.target.id.split(",")[0];
        window.localStorage.searchbloger = e.target.id;
        window.location.reload()
    }
    // let temp = 0
    // const [populardata, setPopulardata] = useState([])
    // const [newblogdata, setNewblogdata] = useState([])
    // useEffect((() => {
    //     getPopularData()
    //     getNewblogData()
    // }),
    //     [])
    // function getPopularData() {
    //     fetch("http://localhost:8080/blog/topblog")
    //         .then((res) => {

    //             return res.json()
    //         })
    //         .then((result) => {

    //             for (let i = 0; i < result.length; i++) {
    //                 console.log(result[i].blogdetail)
    //                 result[i].blogdetail = JSON.parse(result[i].blogdetail)
    //             }
    //             console.log(result)
    //             setPopulardata(result)
    //         })

    // }
    // function getNewblogData() {
    //     fetch("http://localhost:8080/blog/newblog")
    //         .then((res) => {

    //             return res.json()
    //         })
    //         .then((result) => {

    //             for (let i = 0; i < result.length; i++) {
    //                 console.log(result[i].blogdetail)
    //                 result[i].blogdetail = JSON.parse(result[i].blogdetail)
    //             }
    //             console.log(result)
    //             setNewblogdata(result)
    //         })

    // }
    // function test(e) {
    //     fetch("http://localhost:8080/blog/" + (e.target.id).slice(6, 8))
    //         .then((res) => {
    //             return res.json()
    //         })
    //         .then((result) => {
    //             window.localStorage.blogdata = JSON.stringify(result)
    //             window.location.href = "/Blogshow"

    //         })
    // }
    return (
        <div style={{ backgroundImage: 'url("/images/AnyConv.com__E_US5SHVQAIuSbE.jpg")', backgroundSize: '100% 100%', height: '1400px' }}>
            <div style={{ display: 'grid', gridTemplateRows: '20% 80% ' }}>
                <div style={{ marginTop: '160px', marginLeft: '340px', zIndex: '3' }}>
                    <h1 id='searchtitle' ><i class="fa fa-search" aria-hidden="true"></i>    搜尋：{search}</h1>
                    <h3 id='searchtitle' >包含 " {searchtext} " 的相關結果：</h3>

                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '75% 25% ', backgroundImage: 'url("")', backgroundSize: '100% 100%' }}>
                    {/* <div></div> */}
                    <div style={{ paddingBottom: '10px', overflow: 'scroll', resize: 'none', height: '1040px' }}>
                        {data.map((item) => {
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
                                        <a onClick={toBlogPage} id={`blogid${item.blogid}`}>...更多</a>
                                    </p>
                                </div>
                            </div>

                        })}
                    </div>
                    <div>
                        <div >
                            <div style={{ width: '300px', height: '340px', backgroundColor: 'rgba(0,0,0,0.6)', borderRadius: '5px', marginTop: '15px' }}>
                                <div style={{ paddingTop: "15px", color: 'white', paddingLeft: '35px', marginBottom: '20px' }}>
                                    <h4><i class="fa fa-address-book-o" aria-hidden="true" style={{ marginRight: '15px' }}></i>熱門作家</h4>
                                </div>
                                <ul class="details">
                                    {popularbloger.map((item, id) => {
                                        if (id < 3) {
                                            return <li onClick={blogerClick} class="" style={{ height: '90px', cursor: 'pointer' }}><img alt="Avatar" id={item.memberid + "," + item.membernickname} src={item.membericon} style={{ width: '60px', height: '60px', marginLeft: '20px', "border-radius": "50%" }} />
                                                <ul style={{ marginLeft: '100px', marginTop: '-63px', marginRight: '20px' }}>
                                                    <li id={item.memberid + "," + item.membernickname} style={{ color: 'white', fontWeight: 'bold', fontSize: "18px" }}>{item.membernickname}</li>
                                                    <li id={item.memberid + "," + item.membernickname} className='detail-member-intro' >{item.memberintro}</li>
                                                </ul>
                                            </li>
                                        }

                                    })}


                                </ul>

                            </div>
                        </div>
                        <div >
                            <div style={{ width: '300px', height: '650px', backgroundColor: 'rgba(0,0,0,0.6)', borderRadius: '5px', marginTop: '15px' }}>
                                <div style={{ paddingTop: "15px", color: 'white', paddingLeft: '35px', marginBottom: '30px' }}>
                                    <h4><i class="fa fa-star" aria-hidden="true" style={{ marginRight: '15px' }}></i>熱門文章</h4>
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
        </div>
    );

}

export default Blog;


{/* <form style={{ background: 'radial-gradient(ellipse at center,gray,lightgray)', width: '380px', height: '250px', Filter: 'blur(20px)', borderRadius: '5px' }}>
    <div style={{ width: '380px', height: '250px', backgroundColor: 'rgba(0,0,0,0.6)', borderRadius: '5px' }}>
        <div style={{ paddingTop: "45px", color: 'white', paddingLeft: '45px' }}>
            <h4><i class="fa fa-map-marker" aria-hidden="true"></i>     地區 </h4>
        </div>
        <div class="center">
            <select name="sources" id="sources" class="custom-select sources" placeholder="Source Type" style={{ width: '255px', marginLeft: '180px', marginTop: '-80px' }}>
                <option value="profile">Profile</option>
                <option value="word">Word</option>
                <option value="hashtag">Hashtag</option>
            </select>
        </div>

        <div style={{ paddingTop: "5px", color: 'white', paddingLeft: '45px' }}>
            <h4><i class="fa fa-map-o" aria-hidden="true"></i>     類型 </h4>
        </div>
        <div class="center">
            <select name="sources" id="sources" class="custom-select sources" placeholder="Source Type" style={{ width: '255px', marginLeft: '180px', marginTop: '-80px' }}>
                <option value="profile">Profile</option>
                <option value="word">Word</option>
                <option value="hashtag">Hashtag</option>
            </select>
        </div>

        <a href="/" class="bn3">Button</a>


    </div>
</form>  */}