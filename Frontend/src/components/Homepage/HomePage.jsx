import React, { useEffect, useState } from 'react'
import Footer from '../Footer/Footer'
import './homepage.css'
import ScrollTop from './ScrollTop'
import axios from 'axios'
import Skeleton from '@mui/material/Skeleton';
import { Typography } from '@mui/material'
import { LoadingButton } from '@mui/lab'
import Homeloading from './HomeLoading'

export default function HomePage() {
    const [data, setData] = useState('')
    const [loading, setLoading] = useState(true);
    // console.log({ data });
    async function getpic() {
        try {

            const res = await axios.get('https://api.unsplash.com/photos/random?client_id=k-qvIjBpFwU9A_1HhaVakxTJhwLbUEaksJU4XqM_zus', {
                //URL参數放在params屬性裏面
                params: {
                    query: 'travel',

                },


            })
            const pic = await res.data.urls.raw + "&fit=fillmax&fill=blur&w=1920&h=1080"

            console.log(pic);
            setData(pic)

        } catch (error) {
            console.log(error);
        }

    }
    useEffect(() => {
        /* setTimeout(getpic,5000) */
        localStorage.setItem("adminloginpage", "false")
        getpic();

    }, [])



    return (

        <main className='main'>

            <div style={{ backgroundColor: '#021E39' }}>
                {loading ?
                    <>
                        <Homeloading />
                        {setTimeout(() => {
                            setLoading(false);

                        }, 2000)}
                    </>
                    :
                    <img className='mainImg' src={data} alt="randomimg" />

                }




            </div>

            {loading === false && <HomeSection />}


        </main>

    )
}

const HomeSection = () => {
    return (
        <>

            <section className="sec-01">
                <div className="container-01">
                    <h2 className="main-title">最新消息</h2>
                    <div className="content">
                        <div className="image">
                            <a href=""><img src="./img/img1.jpg" alt="" /></a>
                        </div>
                        <div className="text-box" style={{ marginTop: '70px' }}>
                            <h3></h3>
                            <p style={{ fontSize: '20px', fontWeight: 'bold' }}>深入挖掘在地旅遊體驗行程，我們把安排旅程變得更簡單、更即時。
                                我們深信自由行是最能貼近在地的旅遊方式，每一趟旅程，都是一場精彩的饗宴。並希望每個愛旅行的你，都能和我們一樣，享受自由行的美好。</p>
                        </div>
                    </div>
                    <div className="media-icons">
                        <a href="#" className="icon"><i ></i></a>
                        <a href="#" className="icon"><i ></i></a>
                        <a href="#" className="icon"><i ></i></a>
                        <a href="#" className="icon"><i ></i></a>
                    </div>
                </div>
            </section>
            <section className="sec-02">
                <div className="container-02">
                    <h3 className="section-title">熱門景點</h3>
                    <div className="content02">
                        <div className="image02">
                            <img src="\img\maxresdefault.jpg" alt="" />
                        </div>
                        <div className="info">
                            <h4 className="info-title" style={{ fontWeight: 'bold' }}>101風景美不勝收</h4>
                            <p style={{ fontSize: '20px', fontWeight: 'bold' }}>TAIPEI 101座落於台北最菁華地段，是國內建築界有史以來最大的工程專案。在外觀上形成有節奏的律動美感，開創國際摩天大樓新風格。
                                標高382公尺的89樓觀景台，擁有全方位絕佳的觀景視野，欣賞台北日與夜不同的城市之美！
                            </p>
                        </div>
                    </div>
                </div>
            </section>
            <section className="sec-03">
                <div className="container-03">
                    <h3 className="section-title">晚上也閒不下來嗎?</h3>
                    <div className="content03">
                        <div className="media-info">

                            <div className="text-box03">
                                <h3 style={{ fontWeight: 'bold' }}>西門町</h3>
                                <p style={{ fontSize: '20px', fontWeight: 'bold' }}>西門町有許多著名的地標及商場，像是IG打卡景點的彩虹地景、擁有100多年歷史的西門紅樓、時代性指標的萬年商業大樓、充滿美式風格的西門町美國街等；還有多樣美食聚集在此，如港式料理、台式料理、美式料理、飲料冰品、咖啡廳、酒吧等各式餐點。</p>

                            </div>

                            <li><a href="#"><i ></i> </a></li>
                            {/* <li><a href="#"><i ></i> Instagram</a></li>
                            <li><a href="#"><i ></i> Twitter</a></li>
                            <li><a href="#"><i ></i> Youtube</a></li>
                            <li><a href="#"><i ></i> Linkedin</a></li> */}
                        </div>
                        <div className="image03">
                            <img src="./img/img3.jpg" alt="" />
                        </div>
                    </div>
                </div>
            </section>
        </>
    )

}