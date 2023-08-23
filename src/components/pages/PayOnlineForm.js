import React, {useEffect} from "react";
import axios from "axios";

export default function PayOnlineForm() {
    useEffect(() => {
        axios.get('http://192.168.10.33:8080/api/getPaymentFormApi',{params:{psn:localStorage.getItem("psn")
          }
          }).then((data) => {
            console.log(data.data)
            alert(data.data)
        });
      
    }, []);

    return(
      <>
        <h1> Pay online </h1>
      </>
    );
}