import React from "react";
import { Link } from "react-router-dom";
import AOS from 'aos';
import 'aos/dist/aos.css';

export default function Grouping(props) {
  
    AOS.init({
      duration: 1000,
    });

    if(localStorage.getItem("isLogedIn")){
      return (
        <>
          <div className="categoryItem"  data-aos="fade-up">
            <Link to={"/groupingItems/" + props.id}>
              <img className="categoryImg" alt="categoryImage" src={"https://starfoods.ir/resources/assets/images/mainGroups/" + props.id + ".jpg"} /> </Link>
              <span className="categoryTitle"> <Link to={"/groupingItems/" + props.id} className="categoryImgTitl"> {props.title} </Link> </span>
          </div>
        </>)
    }else{
        window.location.href="/login"
    }
}