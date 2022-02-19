import React from "react";

import { CountdownCircleTimer } from "react-countdown-circle-timer";
import { useNavigate } from "react-router-dom";
import './loginsuccesspage.css'



const renderTime = ({ remainingTime }) => {

    if (remainingTime === 0) {
        return window.location.href = "/";
    }

    return (
        <div className="loginsuccess-timer">
            <div className="loginsuccess-text"></div>
            <div className="loginsuccess-value">{remainingTime}</div>
            <div className="loginsuccess-text">秒</div>
            <>
            </>
        </div>
    );
};

export default function LoginSuccessPage() {
    let navigate = useNavigate();


    return (
        <div className="loginsuccess-App">
            <br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
            <h1 className="loginsuccess-h1">
                系統三秒後將自動跳轉至首頁
                <br />

            </h1>
            <div className="loginsuccess-timer-wrapper">
                <CountdownCircleTimer
                    isPlaying
                    duration={3}
                    colors={["#4b636e", "#A30000", "#4b636e", "#A30000"]}
                    colorsTime={[3, 2, 1, 0]}
                    onComplete={() => ({ shouldRepeat: false, delay: 0 })}

                >
                    {renderTime}
                </CountdownCircleTimer>
            </div>
            <p className="loginsuccess-info">


            </p>
        </div>
    );
}

