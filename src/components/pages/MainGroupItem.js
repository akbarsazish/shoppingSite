import React from "react";
import { Link } from "react-router-dom";
import category from "../../assets/images/category.jpg"
import Footer from "../genrealComponent/Footer";
import Header from "../genrealComponent/Header";
import Sidebar from "../genrealComponent/Sidebar";

export default function Grouping(props) {
    return (
        <>
        <div className="categoryItem">
            <Link to={"/groupingItems/"+props.id}> <img className="categoryImg" alt="categoryImage" src={"https://starfoods.ir/resources/assets/images/mainGroups/"+props.id+".jpg"} /> </Link>
            <span className="categoryTitle"> <Link to={"/groupingItems/"+props.id} className="categoryImgTitl"> {props.title} </Link> </span>
        </div>
        </>)
}