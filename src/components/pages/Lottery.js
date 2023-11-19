import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Instruction from "../lottery/Instruction";
import Header from "../genrealComponent/Header";
import Sidebar from "../genrealComponent/Sidebar";
import Footer from "../genrealComponent/Footer";
import DailyEmtyaz from "../lottery/DailyEmtyaz";
import LuckyCode from "../lottery/LuckyCode";
import LuckyTest from "../../../src/LuckyTest"


export default function Lottery() {
  const [bonus, setBonus] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  let customerId = localStorage.getItem("psn");

  const getLotteryApi = 'https://starfoods.ir/api/getLotteryInfoApi';
      const fetchData = async () => {
          try {
              const response = await axios.get(getLotteryApi, {
                  params: { psn: customerId },
              });
              return response.data;
          } catch (error) {
              console.error('Error fetching data:', error);
              throw error; 
          }
      };

      useEffect(() => {
        const fetchDataAndSetState = async () => {
            try {
              const data = await fetchData();
                setBonus(data);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchDataAndSetState();
    }, []);

    if (loading) {
      return <p style={{textAlign:"center"}}> لطفا صبور باشید!...</p>;
    }

  return (
    <>
    <Header />
    <Sidebar />
     <div className="container marginTop border mb-5">
      
        <Instruction mybonus={bonus.allBonus} />
        {/* <LuckyCode mybonus={bonus.allBonus} minBonus={bonus.lotteryMinBonus}  /> */}
        <LuckyTest mybonus={parseInt(bonus.allBonus)} minBonus={parseInt(bonus.lotteryMinBonus)} />
        <DailyEmtyaz />
    </div>
    <Footer />
    </>
  )
}