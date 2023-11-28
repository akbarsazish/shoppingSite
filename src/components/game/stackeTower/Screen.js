import React, {useEffect} from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";

const Screen = ({ score, startGame }) => {
    const navigate = useNavigate();

    useEffect(() => {
        axios
          .get("https://starfoods.ir/api/addGameScore", {
            params: {
              gameId: 3,
              record:score,
              psn: localStorage.getItem("psn"),
            },
          })
          .then((response) => {
            console.log("Response", response.data);
          })
          .catch((error) => {
            console.error("Error fetching data:", error);
          });
      }, []);
      
    return (
        <div className="game-container">
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
        </div>
    );
};

export default Screen;
