import React, { useEffect, useState } from 'react';
import axios from 'axios';

function CountDownTimer() {
  const [timeRemaining, setTimeRemaining] = useState({
    remainDays: []
});

  useEffect(() => {
    axios.get("https://starfoods.ir/api/getGamerList", {
    params: { gameId: 2, psn: localStorage.getItem("psn") }
    }).then((response) => {

        let currentTime = new Date().getTime();
        let remainingDays = parseInt(response.data.remainDays[0].dayRemain, 10);
        let millisecondsPerDay = 24 * 60 * 60 * 1000; 
        let endOfOpportunity = parseInt(currentTime + remainingDays * millisecondsPerDay);
  
        setInterval(() => {
            setTimeRemaining(endOfOpportunity - new Date().getTime());
          }, 1000);
          
        }).catch((error) => {
            console.error("Error fetching data:", error);
        });
  }, []);

  const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
  const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

  return (
    <div id="demo" style={{margin: "0 auto", textAlign:"center"}}>
      {timeRemaining >= 0 ? (
        `زمان باقی مانده :  ${days} روز ${hours} ساعت ${minutes} دقیقه  ${seconds} ثانیه` 
      ) : (
        'زمان بازی به اتمام رسید'
      )}
    </div>
  );
}

export default CountDownTimer;
