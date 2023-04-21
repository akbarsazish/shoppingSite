import React, { useState } from "react";
import Header from "../genrealComponent/Header";
import Sidebar from "../genrealComponent/Sidebar";
import Footer from "../genrealComponent/Footer";
import "../../assets/css/lottery/lottery.css";
import $ from 'jquery';
import { useEffect } from "react";
import axios from "axios"
export default function LuckyWheel() {
    const [showWhell, setWheel] = useState(false)
    const [emtiyaz,setEmtiyaz] = useState(0)
    const [lotteryMinBonus,setLotteryMinBonus] = useState(0)

    useEffect(()=>{
        axios.get("http://192.168.10.27:8080/api/bagCash").then((data)=>{
        console.log(data.data)
        setEmtiyaz(data.data.allBonus);
        setLotteryMinBonus(data.data.lotteryMinBonus)
        })
    },[])
    function shuffle(array) {
        var currentIndex = array.length,
            randomIndex;

        // While there remain elements to shuffle...
        while (0 !== currentIndex) {
            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;

            // And swap it with the current element.
            [array[currentIndex], array[randomIndex]] = [
                array[randomIndex],
                array[currentIndex],
            ];
        }
        return array;
    }

    function spin() {
        // Play the sound
        // wheel.play();
        // Inisialisasi variabel
        const box = document.getElementById("box");
        const element = document.getElementById("mainbox");
        let SelectedItem = "";

        // Shuffle 450 karena class box1 sudah ditambah 90 derajat diawal. minus 40 per item agar posisi panah pas ditengah.
        // Setiap item memiliki 12.5% kemenangan kecuali item sepeda yang hanya memiliki sekitar 4% peluang untuk menang.
        // Item berupa ipad dan samsung tab tidak akan pernah menang.
        // let Sepeda = shuffle([2210]); //Kemungkinan : 33% atau 1/3

        let FirstPrize = shuffle([(0)]);
        let secondPrize = shuffle([(0)]);
        let thirdPrize = shuffle([(0)]);
        let fourthPrize = shuffle([(0)]);
        let fifthPrize = shuffle([(0)]);
        let sixthPrize = shuffle([(0)]);
        let seventhPrize = shuffle([(0)]);
        let eightPrize = shuffle([(0)]);
        let ninthPrize = shuffle([(0)]);
        let teenthPrize = shuffle([(0)]);
        let eleventhPrize = shuffle([(0)]);
        let twelvthPrize = shuffle([(0)]);
        let therteenthPrize = shuffle([(0)]);
        let fourteenthPrize = shuffle([(0)]);
        let fifteenthPrize = shuffle([(0)]);
        let sixteenthPrize = shuffle([(0)]);

        // Bentuk acak
        let Hasil = [];
        let primaryPrizeList = shuffle([
            FirstPrize[0],
            secondPrize[0],
            thirdPrize[0],
            fourthPrize[0],
            fifthPrize[0],
            sixthPrize[0],
            seventhPrize[0],
            eightPrize[0],
            ninthPrize[0],
            teenthPrize[0],
            eleventhPrize[0],
            twelvthPrize[0],
            therteenthPrize[0],
            fourteenthPrize[0],
            fifteenthPrize[0],
            sixteenthPrize[0]
        ]);

        primaryPrizeList.forEach((element) => {
            if (element > 0) {
                Hasil.push(element);
            }

        })
        // console.log(Hasil[0]);

        // Ambil value item yang terpilih

        if (FirstPrize.includes(Hasil[0])) SelectedItem = "{{ $products[0]-> firstPrize }}";

        if (secondPrize.includes(Hasil[0])) SelectedItem = "{{ $products[0]-> secondPrize }}";

        if (thirdPrize.includes(Hasil[0])) SelectedItem = "{{ $products[0]-> thirdPrize }}";

        if (fourthPrize.includes(Hasil[0])) SelectedItem = "{{ $products[0]-> fourthPrize }}";

        if (fifthPrize.includes(Hasil[0])) SelectedItem = "{{ $products[0]-> fifthPrize }}";

        if (sixthPrize.includes(Hasil[0])) SelectedItem = "{{ $products[0]-> sixthPrize }}";

        if (seventhPrize.includes(Hasil[0])) SelectedItem = "{{ $products[0]-> seventhPrize }}";

        if (eightPrize.includes(Hasil[0])) SelectedItem = "{{ $products[0]-> eightthPrize }}";

        if (ninthPrize.includes(Hasil[0])) SelectedItem = "{{ $products[0]-> ninethPrize }}";

        if (teenthPrize.includes(Hasil[0])) SelectedItem = "{{ $products[0]-> teenthPrize }}";

        if (eleventhPrize.includes(Hasil[0])) SelectedItem = "{{ $products[0]-> eleventhPrize }}";

        if (twelvthPrize.includes(Hasil[0])) SelectedItem = "{{ $products[0]-> twelvthPrize }}";

        if (therteenthPrize.includes(Hasil[0])) SelectedItem = "{{ $products[0]-> therteenthPrize }}";

        if (fourteenthPrize.includes(Hasil[0])) SelectedItem = "{{ $products[0]-> fourteenthPrize }}";

        if (fifteenthPrize.includes(Hasil[0])) SelectedItem = "{{ $products[0]-> fifteenthPrize }}";

        if (sixteenthPrize.includes(Hasil[0])) SelectedItem = "{{ $products[0]-> sixteenthPrize }}";
        // Proses

        box.style.setProperty("transition", "all ease 5s");
        box.style.transform = "rotate(" + Hasil[0] + "deg)";
        element.classList.remove("animate");
        setTimeout(function () {
            element.classList.add("animate");
        }, 500);

        // Munculkan Alert
        setTimeout(function () {
            // applause.play();
            // swal(
            //     "تبریک",
            //     " شما برنده ای " + SelectedItem + "شده اید",
            //     "success"
            // );
            //برای ثبت تاریخچه
            $.ajax({
                method: 'get',
                url: "/setCustomerLotteryHistory",
                data: {
                    _token: "{{ csrf_token() }}",
                    customerId: "",
                    product: SelectedItem
                },
                async: true,
                success: function (data) {
                    $("#spinnerBtn").prop("disabled", true);
                },
                error: function (errer) {

                }
            });
        }, 5500);

        // Delay and set to normal state
        setTimeout(function () {
            box.style.setProperty("transition", "initial");
            box.style.transform = "rotate(90deg)";
        }, 6000);


    }

    var _gaq = _gaq || [];
    _gaq.push(['_setAccount', 'UA-36251023-1']);
    _gaq.push(['_setDomainName', 'jqueryscript.net']);
    _gaq.push(['_trackPageview']);

    (function () {
        var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
        ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
        var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
    })();


    try {
        fetch(new Request("https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js", { method: 'HEAD', mode: 'no-cors' })).then(function (response) {
            return true;
        }).catch(function (e) {
            var carbonScript = document.createElement("script");
            carbonScript.src = "//cdn.carbonads.com/carbon.js?serve=CK7DKKQU&placement=wwwjqueryscriptnet";
            carbonScript.id = "_carbonads_js";
            // document.getElementById("carbon-block").appendChild(carbonScript);
        });
    } catch (error) {
        console.log(error);
    }

    $("#useLuckyWheel").on("click", () => {
        $("#luckyWheel").css("display", "flex");
    })
    return (
        <>
            <Header />
            <Sidebar />
            <div className="container marginTop">
                <div className="row text-center">
                    <div className="col-lg-12 text-center">
                        <div className="five-pointed-star">
                            <span className="starContent">  امتیاز شما {emtiyaz} </span>
                        </div>
                        <div className="row mt-2">
                            <div className="col-lg-12 text-end p-2">
                                <div className="useStar">
                                    <ol className="list-group list-group-numbered pe-1">
                                        <li className="list-group-item"> استفاده از گردونه شانس {lotteryMinBonus} امتیاز <button id="useLuckyWheel" onClick={() => setWheel(!showWhell)} className="btn btn-sm btn-primary float-start p-1" > استفاده می کنم  </button> </li>
                                    </ol>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {showWhell ? <div className="row mt-3" id="luckyWheel" >
                    <div id="jquery-script-menu" style={{ margingTop: "50px" }}>
                        <div className="mainbox" id="mainbox">
                            <div className="box boxBorder" id="box">
                                <div className="box1">
                                    <span className="font span1"><b></b></span>
                                    <span className="font span2"><b></b></span>
                                    <span className="font span3"><b></b></span>
                                    <span className="font span4"><b></b></span>
                                    <span className="font span5"><b></b></span>
                                    <span className="font span6"><b></b></span>
                                    <span className="font span7"><b></b></span>
                                    <span className="font span1"><b></b></span>
                                </div>
                                <div className="box2">
                                    <span className="font span1"><b></b></span>
                                    <span className="font span2"><b></b></span>
                                    <span className="font span3"><b></b></span>
                                    <span className="font span4"><b></b></span>
                                    <span className="font span5"><b></b></span>
                                    <span className="font span6"><b></b></span>
                                    <span className="font span7"><b></b></span>
                                    <span className="font span8"><b></b></span>
                                </div>
                            </div>
                            <button className="spin" id="spinnerBtn" >  چرخش   </button>
                        </div>
                        <audio controls="controls" id="applause" src="{{url('/resources/assets/lottery/applause.mp3')}}" type="audio/mp3"></audio>
                        <audio controls="controls" id="wheel" src="{{url('/resources/assets/lottery/wheel.mp3')}}" type="audio/mp3"></audio>
                    </div>
                </div> : " "}
                <div className="lotteryInformation my-5 text-center">
                    <div className="lotteryDesc">
                        <ul className="lists p-2">
                            <li className="itemList"> وقتی امتیاز شما بالای  شد چرخش فعال میگردد</li>
                            <li className="itemList"> روی دکمه چرخش کلید نماید.</li>
                            <li className="itemList"> هر  امتیاز یک شانس</li>
                            <li className="itemList"> شانش خویش را بیازمایید. </li>
                            <li className="itemList"> جایزه خویش را دریافت نمایید </li>
                        </ul>
                    </div>
                </div>
            </div >
            <Footer />
        </>
    )
}

