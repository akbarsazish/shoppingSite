import React, { useState, useEffect } from "react";
import axios from 'axios';
import Header from "../genrealComponent/Header";
import Sidebar from "../genrealComponent/Sidebar";
import Footer from "../genrealComponent/Footer";
import { faAward, faPercentage, faSquareCaretLeft} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function DiscountAndPrice() {
  const [copiedIndex, setCopiedIndex] = useState(null);
   const [discount, setDiscount] = useState({takhfifCodes: []});
   const [yourPrizes, setPrize] = useState([])

   useEffect(() => {
    axios.get("https://starfoods.ir/api/getTakhfifAndPrize", {
    params: { psn: localStorage.getItem("psn") }
    }).then((response) => {
         setDiscount(response.data);
         setPrize(response.data.prizes);
        }).catch((error) => {
            console.error("Error fetching data:", error);
        });
  }, []);

  const copyText = (index) => {
    const codeToCopy = discount.takhfifCodes[index].Code;
    navigator.clipboard.writeText(codeToCopy);
    
    localStorage.setItem("takhfifCode", codeToCopy);

    setCopiedIndex(index);
    setTimeout(() => {
      setCopiedIndex(null);
    }, 1000);
  };
  
    return (
    <>
    <Header />
    <Sidebar />
    <div className="container marginTop p-1">
    <ul className="nav nav-tabs discount-tab" id="discountTab" role="tablist">
        <li className="nav-item" role="presentation">
           <button className="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#discountContent" type="button" role="tab" aria-controls="home" aria-selected="true">  <FontAwesomeIcon icon={faPercentage} /> تخفیف ها   </button>
        </li>
        <li className="nav-item" role="presentation">
           <button className="nav-link" id="profile-tab" data-bs-toggle="tab" data-bs-target="#awardContent" type="button" role="tab" aria-controls="profile" aria-selected="false"> <FontAwesomeIcon icon={faAward} /> جایزه ها </button>
        </li>
    </ul>

    <div className="tab-content" id="discountTabContent">
      <div className="tab-pane fade show active" id="discountContent" role="tabpanel" aria-labelledby="home-tab">
         <div className="discount-content-container">
          {discount.takhfifCodes.length > 0 ?
           discount.takhfifCodes.map((takhfifData, index)=> (
              <div className="discount-content-items" key={index}>
              <p className="takfif-name"> کد تخفیف {takhfifData.Money} ریالی شما  </p>
              <div className="dicound-code">
                <span className="my-discount-code" id="textToCopy"> {takhfifData.Code} </span>
                <span className="copy-code" id="copyButton" onClick={() => copyText(index)}> کپی کردن  </span>
              </div>
              <p className="use-day mt-2"> قابل استفاده تا  {new Date(takhfifData.UsedDate).toLocaleDateString("fa-ir")} </p>
              {copiedIndex === index && <div className="coppied" id="coppied"> کا پی شده </div> }
          </div>
          )) : "شما کد تخفیف ندارید!"}
          
         </div>
      </div>
      <div className="tab-pane fade" id="awardContent" role="tabpanel" aria-labelledby="profile-tab">
         <div className="award-container">
            <div className="award-container-item">
              <h6> جوایز بازیها </h6>
              <p className="award-description"> 
                <FontAwesomeIcon className="text-danger ms-2" icon={faSquareCaretLeft} />  ندارید! </p>
            </div>

              <div className="award-container-item" >
                <h6> جوایز لاتری </h6>   
                { yourPrizes.map((element,index)=>
                    <span key={index}>
                       <p className="award-description"> 
                       <FontAwesomeIcon className="text-danger ms-2" icon={faSquareCaretLeft} />  
                        با توجه به اینکه شما برنده بازی لاتاری شده‌اید، تبریک می‌گویم.  &nbsp;  
                         { element.wonPrize } با اولین خرید خدمت شما  {element.Istaken === 1 ? ' ارسال شد' : ' ارسال می شود. '} 
                          تاریخ : {new Date(element.lastTryDate).toLocaleDateString("fa-ir")} 
                       </p>
                   </span>)
                  }
              </div>

            <div className="award-container-item">
              <h6> تخفیف ها </h6>
              { discount.takhfifCodes.map((takhfifData, index)=> (
                <span key={index}>
                   <p className="award-description">
                    <FontAwesomeIcon className="text-danger ms-2" icon={faSquareCaretLeft} />  
                    شما جایزه خویش را با استفاده از کد تخفیف {takhfifData.Code} همرا با خرید مبلغ {takhfifData.Money} {takhfifData.isUsed === 1 ? 'ریال دریافت نمودید' : 'دریافت خواهید کرد'}
                   </p> 
                </span>
             ))}
            </div>
         </div>
      </div>
    </div>
    </div>
   
    <Footer />
    </>
  )
}