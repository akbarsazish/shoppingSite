import React from "react";
import { Link } from "react-router-dom";
export default function Grouping(props) {
    return (
        <>
        <li className="groupingPartItem shadow">
            <Link to={"/groupingItems/"+props.id} className="groupingImgLink">
                <img className="groupingImg" alt="categoryImage" src={"https://starfoods.ir/resources/assets/images/mainGroups/"+props.id+".jpg"} />
            </Link>
            <Link to={"/groupingItems/"+props.id} className="groupingTitleLink"> <p className="groupingTitle"> {props.title} </p> </Link>
        </li>
        </>)
}