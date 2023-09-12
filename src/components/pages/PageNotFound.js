import React from "react";

export default function PageNotFound(){
    return(
     <>
        <section className="page_404">
            <div className="text-center not-found-content">
                <div className="four_zero_four_bg">
                    <h1 className="text-center ">404</h1>
                </div>
                <div className="contant_box_404">
                    <h3 className="h2"> صفحهً مورد نظر پیدا نشد!  </h3>
                        <p className="error_paragraph">
                          برای سفارش لطفا با شماره های زیر به تماس شوید
                        </p>
                        <div className="contactList">
                            <a href="tel://02148286">  <span>ارتباط :</span>  48286-021 </a>
                            <a href="tel://02149973000"> <span>پشتیبان :</span>     49973000-021 </a>
                        </div>
                    <a href="/" className="link_404"> صفحه اصلی </a>
                </div>
            </div>
        </section>
     </>
    )
}