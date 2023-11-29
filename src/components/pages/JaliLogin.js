import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

const JaliLogin = () => {
    const location = useLocation();
    const getPrameters = new URLSearchParams(location.search);

    const getIsLogin = getPrameters.get('forLogin');
    const getUserName = getPrameters.get('forUserName');
    const getPsn = getPrameters.get('forUserPsn');
    const getBuyAmount = getPrameters.get('forboughtAmount');
    const getRole = getPrameters.get('forRole');

    useEffect(() => {
        localStorage.setItem("isLogedIn", getIsLogin);
        localStorage.setItem('userName', getUserName);
        localStorage.setItem('psn', getPsn);
        localStorage.setItem("buyAmount", getBuyAmount);
        localStorage.setItem("role", getRole);

        const timer = setTimeout(() => {
            window.open('https://star.starfoods.ir/home');
        }, 1000);

        return () => clearTimeout(timer);
    }, [getIsLogin, getUserName, getPsn, getBuyAmount, getRole]);
}

export default JaliLogin;
