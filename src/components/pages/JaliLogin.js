import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const JaliLogin = ()=> {

    const location = useLocation();
    const getPrameters = new URLSearchParams(location.search);

    const getIsLogin  = getPrameters.get('forLogin');
    const getUserName  = getPrameters.get('forUserName');
    const getPsn  = getPrameters.get('forUserPsn');
    const getBuyAmount  = getPrameters.get('forboughtAmount');
    const getRole  = getPrameters.get('forRole');

    console.log( getIsLogin,
     getUserName,
     getPsn,
     getBuyAmount,
     getRole)

    localStorage.setItem("isLogedIn",getIsLogin);
    localStorage.setItem('userName', getUserName);
    localStorage.setItem('psn', getPsn);
    localStorage.setItem("buyAmount",getBuyAmount);
    localStorage.setItem("role", getRole);

    useEffect(() => {
        window.open('http://192.168.10.33:3001/home', '_blank');
      }, []);

    return(
        <>
         <h1>  ورود جعلی  </h1>
        </>
    )
}

export default JaliLogin;