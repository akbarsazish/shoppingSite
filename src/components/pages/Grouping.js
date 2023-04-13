import React from "react";
import { Link } from "react-router-dom";
import category from "../../assets/images/category.jpg"
import Footer from "../genrealComponent/Footer";
import Header from "../genrealComponent/Header";
import Sidebar from "../genrealComponent/Sidebar";

export default function Grouping() {
    return (
        <>
            <Header />
            <Sidebar />
            <div className="container grouping">
                <ul className="groupingPart">
                    <li className="groupingPartItem shadow">
                        <Link to="/groupingItems" className="groupingImgLink">
                            <img className="groupingImg" alt="categoryImage" src={category} />
                        </Link>
                        <Link to="/" className="groupingTitleLink"> <p className="groupingTitle">  کالا نرخ دولتي </p> </Link>
                    </li>
                    <li className="groupingPartItem shadow">
                        <Link to="/" className="groupingImgLink">
                            <img className="groupingImg" alt="categoryImage" src={category} />
                        </Link>
                        <Link to="/" className="groupingTitleLink"> <p className="groupingTitle">  کالا نرخ دولتي </p> </Link>
                    </li>
                    <li className="groupingPartItem shadow">
                        <Link to="/" className="groupingImgLink">
                            <img className="groupingImg" alt="categoryImage" src={category} />
                        </Link>
                        <Link to="/" className="groupingTitleLink"> <p className="groupingTitle">  کالا نرخ دولتي </p> </Link>
                    </li>
                    <li className="groupingPartItem shadow">
                        <Link to="/" className="groupingImgLink">
                            <img className="groupingImg" alt="categoryImage" src={category} />
                        </Link>
                        <Link to="/" className="groupingTitleLink"> <p className="groupingTitle">  کالا نرخ دولتي </p> </Link>
                    </li >
                    <li className="groupingPartItem shadow">
                        <Link to="/" className="groupingImgLink">
                            <img className="groupingImg" alt="categoryImage" src={category} />
                        </Link>
                        <Link to="/" className="groupingTitleLink"> <p className="groupingTitle">  کالا نرخ دولتي </p> </Link>
                    </li >
                    <li className="groupingPartItem shadow">
                        <Link to="/" className="groupingImgLink">
                            <img className="groupingImg" alt="categoryImage" src={category} />
                        </Link>
                        <Link to="/" className="groupingTitleLink"> <p className="groupingTitle">  کالا نرخ دولتي </p> </Link>
                    </li >
                </ul >
            </div >
            <Footer />
        </>
    );

}