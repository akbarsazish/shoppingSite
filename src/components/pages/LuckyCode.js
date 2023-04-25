import { useState, useEffect } from "react";
import "../../assets/css/mainStyle.css";
import WheelComponent from "react-wheel-of-prizes";
import axios from "axios";

export default function LuckyCode() {

    const [luckInfo, setLuckInfo] = useState("");
    useEffect(() => {
        axios.get("http://192.168.10.27:8080/api/luckyWheel").then((data) => {

        });

    });

    const segments = [
        "شانس خوب دفعه بعد ",
        "شما برنده برنج شدید",
        "شما برنده نخود شدید",
        "شانس خوب دفعه بعد ",
        "شما برنده مایع ظرفشوی شدید",
        "شمابرنده 200 تومان پول نقد گردید",
        "شمابرنده 200 تومان پول نقد گردید",
        "شمابرنده 200 تومان پول نقد گردید",
        "شمابرنده 200 تومان پول نقد گردید",
    ];

    const segColors = ["#a4d435", "#15ac27", "#00a28a", "#00abd2", "#2b3ac3", "#5c2e9d", "#9000a6", "#f06", "#e4000e", "#ff611f", "##ffca36"];
    const onFinished = (winner) => {
        console.log(winner);
        // alert(winner)
    };
    return (
        <div className="row luckywheel">
            <WheelComponent
                segments={segments}
                segColors={segColors}
                onFinished={(winner) => onFinished(winner)}
                primaryColor="black"
                contrastColor="white"
                buttonText="چرخش"
                isOnlyOnce={false}
                size={222}
                upDuration={200}
                downDuration={600}
                fontFamily="Arial"
            />
        </div>
    );
}
