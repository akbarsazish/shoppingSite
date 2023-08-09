import React from "react";
import Header from "../genrealComponent/Header";
import Sidebar from "../genrealComponent/Sidebar";
import Footer from "../genrealComponent/Footer";
import { faAward, faPercentage, faSquareCaretLeft} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function DiscountAndPrice() {
    return (
    <>
    <Header />
    <Sidebar />
    <div className="container marginTop p-1">
    <ul class="nav nav-tabs discount-tab" id="discountTab" role="tablist">
        <li class="nav-item" role="presentation">
           <button class="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#discountContent" type="button" role="tab" aria-controls="home" aria-selected="true">  <FontAwesomeIcon icon={faPercentage} /> تخفیف ها   </button>
        </li>
        <li class="nav-item" role="presentation">
           <button class="nav-link" id="profile-tab" data-bs-toggle="tab" data-bs-target="#awardContent" type="button" role="tab" aria-controls="profile" aria-selected="false"> <FontAwesomeIcon icon={faAward} /> جایزه ها </button>
        </li>
    </ul>

    <div class="tab-content" id="discountTabContent">
      <div class="tab-pane fade show active" id="discountContent" role="tabpanel" aria-labelledby="home-tab">
         <div className="discount-content-container">
            <div className="discount-content-items">
                <p class="takfif-name"> کد تخفیف 20000 ریالی شما  </p>
                <div class="dicound-code">
                  <span class="my-discount-code" id="textToCopy">  aaffdfe43 </span>
                  <span class="copy-code" id="copyButton"> کپی کردن  </span>
                </div>
                <p class="use-day mt-2"> قابل استفاده تا   </p>
            </div>
            <div className="discount-content-items">
                <p class="takfif-name"> کد تخفیف 20000 ریالی شما  </p>
                <div class="dicound-code">
                  <span class="my-discount-code" id="textToCopy">  aaffdfe43 </span>
                  <span class="copy-code" id="copyButton"> کپی کردن  </span>
                </div>
                <p class="use-day mt-2"> قابل استفاده تا   </p>
            </div>
            <div className="discount-content-items">
                <p class="takfif-name"> کد تخفیف 20000 ریالی شما  </p>
                <div class="dicound-code">
                  <span class="my-discount-code" id="textToCopy">  aaffdfe43 </span>
                  <span class="copy-code" id="copyButton"> کپی کردن  </span>
                </div>
                <p class="use-day mt-2"> قابل استفاده تا   </p>
            </div>
            <div className="discount-content-items">
                <p class="takfif-name"> کد تخفیف 20000 ریالی شما  </p>
                <div class="dicound-code">
                  <span class="my-discount-code" id="textToCopy">  aaffdfe43 </span>
                  <span class="copy-code" id="copyButton"> کپی کردن  </span>
                </div>
                <p class="use-day mt-2"> قابل استفاده تا   </p>
            </div>
         </div>
      </div>
      <div class="tab-pane fade" id="awardContent" role="tabpanel" aria-labelledby="profile-tab">
         <div className="award-container">
            <div className="award-container-item">
              <h6> جوایز بازیها </h6>
              <p className="award-description"> 
                <FontAwesomeIcon className="text-danger ms-2" icon={faSquareCaretLeft} />  ندارید! </p>
            </div>
            <div className="award-container-item">
              <h6> جوایز لاتری </h6>
              <p className="award-description"> 
                <FontAwesomeIcon className="text-danger ms-2" icon={faSquareCaretLeft} />  
                  با توجه به اینکه شما برنده بازی لاتاری شده‌اید، تبریک می‌گویم! لوبیا با اولین خرید خدمت شما. ارسال شد
تاریخ : 1401/09/16! 
              </p>
            </div>
            <div className="award-container-item">
              <h6> تخفیف ها </h6>
                <p className="award-description">
                  <FontAwesomeIcon className="text-danger ms-2" icon={faSquareCaretLeft} />  
                    با توجه به اینکه شما برنده بازی لاتاری شده‌اید، تبریک می‌گویم! لوبیا با اولین خرید خدمت شما. ارسال شد
تاریخ : 1401/09/16! 
                </p> 
            </div>
         </div>
      </div>
    </div>
       
    </div>
    <Footer />
    </>
  )
}