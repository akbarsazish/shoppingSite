import React from "react";
import { useNavigate } from 'react-router-dom';
const Screen = ({ score, startGame }) => {
    const navigate = useNavigate();
    return (
        <>
            <button className="goBack" onClick={() => navigate(-1)}> باز گشت </button>
            <div className="screen">
                {score > 0 ? (
                    <>
                        <h4>نمره {score} </h4>
                        <button className="start-game" onClick={() => startGame()}>
                            دوباره بازی کن!
                        </button>
                    </>
                ) : (
                    <>
                        <p className="text--glitch" data-text=" بازی پشته ای">
                            بازی پشته ای
                        </p>
                        <button className="start-game" onClick={() => startGame()}> شروع </button>
                    </>
                )}
            </div>
        </>
    );
};

export default Screen;
