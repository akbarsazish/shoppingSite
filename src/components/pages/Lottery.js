import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Instruction from "../lottery/Instruction";
import Header from "../genrealComponent/Header";
import Sidebar from "../genrealComponent/Sidebar";
import Footer from "../genrealComponent/Footer";
import DailyEmtyaz from "../lottery/DailyEmtyaz";
import LuckyCode from "../lottery/LuckyCode";

export default function Lottery() {
  const [bonus, setBonus] = useState(0);
  useEffect(() => {
    axios
    .get('https://starfoods.ir/api/getLotteryInfoApi', {
        params: { psn: localStorage.getItem('psn') },
    })
    .then((data) => {
        setBonus(data.data);
    });
}, []);

   let customerId = localStorage.getItem("psn");
   const vistedPage = "StarfoodStar";
   const todayDate = new Date().toISOString().slice(0, 10);

   useEffect(()=>{
      axios.get("https://starfoods.ir/api/setAttractiveVisits",{
        params:{
            'psn':customerId,
            'attractionName':vistedPage,
            'ViewDate':todayDate,
        }
       }).then((data)=>{
           console.log("lotter page", data);
        });
    }, []);

  return (
    <>
    <Header />
    <Sidebar />
     <div className="container marginTop border">
        <Instruction mybonus={bonus.allBonus} />
        <LuckyCode mybonus={bonus.allBonus} minBonus={bonus.lotteryMinBonus}  />
        <DailyEmtyaz />
    </div>
    <Footer />
    </>
  )
}