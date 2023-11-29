import React, { useEffect, useState } from "react";
import axios from 'axios'
import Header from "../genrealComponent/Header";
import Sidebar from "../genrealComponent/Sidebar";
import Footer from "../genrealComponent/Footer";

export default function InviteCode() {
  const [copied, setCopied] = useState(false);
  const [invitInfo, setInviteInfo] = useState("");
  const [ invitedCustomer, setInvitedCustomer] =  useState({invitedCustomers: []});

  useEffect( () =>{
      axios.get("https://starfoods.ir/api/getInviteCodeApi",{
         params:{psn:localStorage.getItem("psn")}}).then((response)=>{
          setInviteInfo(response.data.profile);
          setInvitedCustomer(response.data);
         })
  }, []);

  function getMobileOperatingSystem() {
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;
    if (userAgent.match(/iPad|iPhone|iPod/i)) {
      return "ios";
    } else if (userAgent.match(/Android/i)) {
      return "android";
    } else {
      return "other";
    }
  }

  const deviceType = getMobileOperatingSystem();

  function copyTakhfifCode() {
    const text = document.getElementById("textToCopyId").innerText;
    navigator.clipboard.writeText(text);

    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  }

  return (
    <>
    <Header />
    <Sidebar />
    <div className="container marginTop p-2 rounded mb-4">
      <div className="row">
        <div className="col-lg-12 invite-code-div">
          <div className="row">
              <div className="col-lg-7 col-7">
                <span className="fs-6">کد دعوت :</span>
                <span role='button' className="my-discount-code p-1" id="textToCopyId" onClick={copyTakhfifCode}>
                  {invitInfo.selfIntroCode}
                </span>
                <span className="copyText">کپی</span>
              </div>
              <div className="col-lg-5 col-5 text-start">
                <div className="btn-set" id="device">
                  {deviceType === "ios" && (
                    <a
                      className="button btn btn-danger btn-sm txt-ios"
                      href={`sms:&body=استار فود رو توصیه میکنم! کالاهایی که نیاز داری رو با سرعت و قیمت مناسب و اصالت بخر. ثبت نام رایگان و کیف پول هم داره. از کد دعوت زیر استفاده کن: ${invitInfo.selfIntroCode}\nکلیک نمایید: https://starfoods.ir\n${invitInfo.Name}`}
                    >
                      ارسال
                    </a>
                  )}
                  {deviceType === "android" && (
                    <a
                      className="button btn btn-danger btn-sm txt-android"
                      href={`sms:?body=استار فود رو توصیه میکنم! کالاهایی که نیاز داری رو با سرعت و قیمت مناسب و اصالت بخر. ثبت نام رایگان و کیف پول هم داره. از کد دعوت زیر استفاده کن: ${invitInfo.selfIntroCode}\nکلیک نمایید: https://starfoods.ir\n${invitInfo.Name}`}
                    >
                      ارسال
                    </a>
                  )}
                  {deviceType === "other" && (
                    <h6 className="text-danger">
                      برای دعوت دوستان خود با گوشی وارد شوید!
                    </h6>
                  )}
                </div>
              </div>
            </div>
            <div className="container">
            <hr />
            <p className="paragraph-for-invite">
              با<span> کلیک</span> روی کد دعوت خود و ارسال آن به همکارانتان، به
              راحتی می‌توانید از هر مشتری جدیدی که با کد دعوت شما ثبت نام کند،{" "}
              <span className="span-for-p1">مبلغ 40 هزار تومان</span> به
              ازای هر یک از همکارانتان که با کد دعوت شما عضو شود، به شما
              تعلق می‌گیرد، و هر کسی که با این کد ثبت نام کند، علاوه بر خرید
              با کیفیت و اصالت، شما نیز با هر بار خرید همکارانتان، مبلغی از
              فاکتور آنها به کیف پول شما به عنوان هدیه اضافه می‌شود.
            </p>
            <p className="paragraph-for-invite">
              استار فود بهترین هدیه برای همکارانتان است.
              <span className="span-for-p2"> ارسال رایگان</span>،
              <span className="span-for-p1">کیفیت بالا </span>و
              <span className="span-for-p1"> قیمت مناسب کالا</span>،{" "}
              <span className="span-for-p1"> و همچنین تنوع بی نظیر محصولات</span>،
              تنها بخشی از مزایای استار فود است. پس همین حالا شروع کنید! کد
              دعوت خود را به همه ارسال کنید.
            </p>
            <p className="paragraph-for-invite">
              برای مشاهده اشخاصی که از کد معرف شما استفاده کرده‌اند، به پایین
              صفحه مراجعه کنید.
            </p>
            <br />
            <h5> اشخاص که از کد دعوت شما استفاده کرده اند: </h5>
            <table className="table table-bordered border-gray table-sm">
                <thead>
                  <tr>
                    <th> ردیف </th>
                    <th> اسم  </th>
                  </tr>
                </thead>
                <tbody>
                  {invitedCustomer.invitedCustomers.map((user, index) => (
                    <tr>
                      <td> {index + 1} </td>
                      <td> {user.Name} </td>
                    </tr>
                    ))}
                </tbody>
             </table>
          </div>
          {copied &&  <div className="col-lg-12" id="coppied">
            <span className="coppied-code"> کپی شد!</span>
          </div>}
        </div>
      </div>
    </div>
   <Footer />
    </>
  );
}
