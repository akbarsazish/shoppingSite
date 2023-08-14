import React, { useState } from "react";
import { faCalendarCheck, faCalendarTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function DailyEmtyaz(){
    const [checkDay, setCheckDay] = useState(false);

    return (
    <section className="weekly-calendar-container my-3" id="weely-calendar">
     <div className="row">
        <div className="col-lg-12 p-4">
            <h3 className='dialy-credit'>  امتیاز روزانه </h3>
        </div>
     </div>
    <div className="weekly-calendar">
        <div className="week-day">
            <div className="day-content curren-day">
                    <div className="top">  </div>
                    <div className="daily-bottom">
                      { !checkDay ? < FontAwesomeIcon className="text-danger calendar-cross" onClick={()=>setCheckDay(!checkDay)} icon={faCalendarTimes} />
                         : <FontAwesomeIcon className="text-success calendar-check" onClick={()=>setCheckDay(checkDay)} icon={faCalendarCheck} />
                          
                     }
                        <input className="form-check-input dialy-check"  type="checkbox" value="'.$y.'_'.$currentDay.'" id="checkDay" />
                    </div>
            </div>
            <p className="day-label"> امروز </p>
        </div>
		<div className="week-day"> 
            <div className="day-content">
                    <div className="top">  </div>
                    <div className="daily-bottom">
                        <FontAwesomeIcon className="text-success calendar-check" icon={faCalendarCheck} /> 
                        <FontAwesomeIcon className="text-danger calendar-cross" icon={faCalendarTimes} /> 
                        <input className="form-check-input dialy-check"  type="checkbox" value="" id="" />
                    </div>
            </div>
            <p className="day-label"> روز  </p>
        </div>
        <div className="week-day"> 
            <div className="day-content">
                    <div className="top"> </div>
                    <div className="daily-bottom">
                        <FontAwesomeIcon className="text-success calendar-check" icon={faCalendarCheck} /> 
                        <FontAwesomeIcon className="text-danger calendar-cross" icon={faCalendarTimes} /> 
                        <input className="form-check-input dialy-check" type="checkbox" value="" id="" />
                    </div>
            </div>
            <p className="day-label"> روز  </p>
        </div>
    </div>

    <div className="row">
        <div className="col-lg-12 p-2 text-center">
            <p className="calendar-info"> هفت روز پشت سر هم مراجعه کنید و ستاره های بیشتری را به دست آورید! جایزه‌های ارزشمندی را برای شما در نظر داریم! </p>
			    
                <button className="btn btn-info"  onclick="checkCheckboxPresent()"> دریافت امتیاز </button>
          
        </div>
     </div>
</section> 

    )
}