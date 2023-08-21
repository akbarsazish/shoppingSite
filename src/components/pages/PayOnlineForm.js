import React, {useEffect} from "react";
import axios from "axios";

export default function PayOnlineForm() {
    useEffect(() => {
        axios.get('http://192.168.10.33:8080/api/getPaymentFormApi').then((data) => {
            console.log(data.data)
        });
      
    }, []);


    return(
        <>
          <h1> Pay online </h1>
        </>
    );
}