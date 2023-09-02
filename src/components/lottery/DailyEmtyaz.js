import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { faCalendarCheck, faCalendarTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function DailyEmtyaz({ presentInfo }) {
  const [isPresentToday, setIsPresentToday] = useState('none');
  const [isNotPresentToday, setIsNotPresentToday] = useState('inline');
  const [isPresentOtherday, setIsPresentOtherday] = useState('none');
  const [isNotPresentOtherday, setIsNotPresentOtherday] = useState('inline');
  const [today, setToday] = useState('FirstPr');
  const [bonus, setBonus] = useState(5);

  const [starfoodStarInfo, setStarfoodStarInfo]=useState({Fifth:null,FifthB:"0",FifthPr:"0",First:"",FirstB:"0"
    ,FirstPr:"0",Fourth:null, FourthB:"10", FourthPr : "0",
    PresentCycleSn : "0", Second : null,  SecondB : "0", SecondPr : "0",
    Seventh: null, SeventhB : "0",  SeventhPr : "0",  Sixth: null,
    SixthB: "0", SixthPr: "0", Third: null, ThirdB: "0",
    ThirdPr: "0"});

  const daysOfWeek = [
    "FirstPr", "SecondPr", "ThirdPr", "FourthPr", "FifthPr", "SixthPr", "SeventhPr"
  ];

  useEffect(()=> {
    axios.get('http://192.168.10.33:8080/api/getLotteryInfoApi', {
        params : {psn: localStorage.getItem('psn'), date: new Date()}
    }).then((data)=> {
        setToday(data.data.todayDate.date.split(" ")[0]);
        setStarfoodStarInfo(data.data.presentInfo[0])
    })
}, [])

  function checkCheckboxPresent() {
    document.getElementById("checkDay").checked = true;
    document.getElementById("crossIcon").style.display = 'none';
    document.getElementById("chechIcon").style.display = 'inline';
    let dayDate=document.getElementById("#checkDay").value();

    axios.get('http://192.168.10.33:8080/api/getLotteryInfoApi', {
      params: { psn: localStorage.getItem('psn'), currentDay:dayDate },
    }).then(() => {
    window.location.reload();
  })
  }

  return (
    <section className="weekly-calendar-container my-3" id="weely-calendar">
        <div className="row">
            <div className="col-lg-12 p-4">
                <h3 className='dialy-credit'>  امتیاز روزانه </h3>
            </div>
        </div>
    <div className="weekly-calendar">
      {daysOfWeek.map((currentDay, i) => {
        let todayClass='';
        if(i==0 && starfoodStarInfo.First==today){
          todayClass='current-day'
        }
        if(i==1 && starfoodStarInfo.Second==today){
          todayClass='current-day'
        }
        if(i==2 && starfoodStarInfo.Third==today){
          todayClass='current-day'
        }
        if(i==3 && starfoodStarInfo.Fourth==today){
          todayClass='current-day'
        }
        if(i==4 && starfoodStarInfo.Fifth==today){
          todayClass='current-day'
        }
        if(i==5 && starfoodStarInfo.Sixth==today){
          todayClass='current-day'
        }
        if(i==6 && starfoodStarInfo.Seventh==today){
          todayClass='current-day'
        }
        const dayNumber = i + 1;
        const y = `${currentDay}`;

        return (
          <div className="week-day" key={i}>
            <div className={"day-content "+todayClass}>
              <div className="top">{i==0?starfoodStarInfo.FirstB:(i==1?starfoodStarInfo.SecondB:(i==2?starfoodStarInfo.ThirdB:(i==3?starfoodStarInfo.FourthB:(i==4?starfoodStarInfo.FifthB:(i==5?starfoodStarInfo.SixthB:(i==6?starfoodStarInfo.SeventhB:5))))))}</div>
                <div className="daily-bottom">
                  {i==0?(i==0 &&starfoodStarInfo.FirstPr==1  ? <FontAwesomeIcon icon={faCalendarCheck} className="text-success calendar-check"/>:<FontAwesomeIcon icon={faCalendarTimes} className="text-danger crossIcon"/>):''}
                  {i==1?(i==1 &&starfoodStarInfo.SecondPr==1 ? <FontAwesomeIcon icon={faCalendarCheck} className="text-success calendar-check"/>:<FontAwesomeIcon icon={faCalendarTimes} className="text-danger crossIcon"/>):''}
                  {i==2?(i==2 &&starfoodStarInfo.ThirdPr==1  ? <FontAwesomeIcon icon={faCalendarCheck} className="text-success calendar-check"/>:<FontAwesomeIcon icon={faCalendarTimes} className="text-danger crossIcon"/>):''}
                  {i==3?(i==3 &&starfoodStarInfo.FourthPr==1 ? <FontAwesomeIcon icon={faCalendarCheck} className="text-success calendar-check"/>:<FontAwesomeIcon icon={faCalendarTimes} className="text-danger crossIcon"/>):''}
                  {i==4?(i==4 &&starfoodStarInfo.FifthPr==1  ? <FontAwesomeIcon icon={faCalendarCheck} className="text-success calendar-check"/>:<FontAwesomeIcon icon={faCalendarTimes} className="text-danger crossIcon"/>):''}
                  {i==5?(i==5 &&starfoodStarInfo.SixthPr==1  ? <FontAwesomeIcon icon={faCalendarCheck} className="text-success calendar-check"/>:<FontAwesomeIcon icon={faCalendarTimes} className="text-danger crossIcon"/>):''}
                  {i==6?(i==6 &&starfoodStarInfo.SeventhPr==1? <FontAwesomeIcon icon={faCalendarCheck} className="text-success calendar-check"/>:<FontAwesomeIcon icon={faCalendarTimes} className="text-danger crossIcon"/>):''}
                  <input className="form-check-input" style={{ display: 'none' }} type="checkbox" value={`${y}_${today}`} id="checkDay" />
                </div>
            </div>
            <p className="day-label">
                {i==0?(i==0 && starfoodStarInfo.First == today?'امروز':'روز'+(i+1)):''}
                {i==1?(i==1 && starfoodStarInfo.Second == today ?'امروز':'روز'+(i+1)):''}
                {i==2?(i==2 && starfoodStarInfo.Third == today ?'امروز':'روز'+(i+1)):''}
                {i==3?(i==3 && starfoodStarInfo.Fourth == today  ?'امروز':'روز'+(i+1)):''}
                {i==4?(i==4 && starfoodStarInfo.Fifth == today  ?'امروز':'روز'+(i+1)):''}
                {i==5?(i==5 && starfoodStarInfo.Sixth == today?'امروز':'روز'+(i+1)):''}
                {i==6?(i==6 && starfoodStarInfo.Seventh == today ?'امروز':'روز'+(i+1)):''}
            </p>
          </div>
        );
      })}
    </div>
    <div className="row">
          <div className="col-lg-12 p-2 text-center">
             <p className="calendar-info" > هفت روز پشت سر هم مراجعه کنید و ستاره های بیشتری را به دست آورید! جایزه‌های ارزشمندی را برای شما در نظر داریم! </p> 
             <button className="btn btn-info" id="receivedEmtyaz" onClick={() => checkCheckboxPresent()}> دریافت امتیاز </button> 
          </div>
      </div>
     </section>
  );
}

export default DailyEmtyaz;
