import React, { useState, useEffect } from "react";
import {memo} from "react";
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faShoppingCart, faSearch, faChevronRight, faPeopleArrows } from '@fortawesome/free-solid-svg-icons'
import ShoppingCart from "../pages/ShoppingCart";
import axios from "axios";


const Header = ()=>{
    const [showSearchInput, setShowSearchInput] = useState(false);
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);
    const [serarchContainer, setSeachContainer] = useState(false)
    const [searchedValue, setSearchedValue] = useState('');
    const [searchResults, setSearchResults] = useState([]);

  const handleSearchIcon = () => {
    setShowSearchInput(!showSearchInput);
    if (screenWidth < 768) {
      const headerStaffDiv = document.getElementById('headerStaff');
      if (headerStaffDiv) {
        headerStaffDiv.style.display = showSearchInput ? 'block' : 'none';
      }
    }
  };

  window.addEventListener('resize', () => {
    setScreenWidth(window.innerWidth);
  });

    const navigate = useNavigate();
    const [bonusResult,setBonusResult] = useState(0)
    const [takhfifMoney,settakhfifMoney] = useState(0)

    useEffect(()=>{
        axios.get('https://starfoods.ir/api/checkLogin',{params:{token:localStorage.getItem("isLogedIn")}}).then((data)=>{
            if(data.data.isLogin==="NO"){
               localStorage.removeItem("isLogedIn")
            }
        })
        axios.get('https://starfoods.ir/api/getHeaderInfo',{psn:localStorage.getItem("psn")}).then((data)=>{
            localStorage.getItem("buyAmount")
            setBonusResult(data.data.bonusResult)
            settakhfifMoney(data.data.takhfifMoney)
        });
    },[]);

    // for searching kala
    useEffect(()=>{
        if (searchedValue.length > 0) {
            axios.get('https://starfoods.ir/api/publicSearchKalaApi',{params: {psn:localStorage.getItem("psn"), name:searchedValue}
            }).then((response)=>{
                console.log(response);
                setSearchResults(response.data);
            }).catch((error) => {
                console.error('Error fetching data:', error);
              });
          } else {
            setSearchResults([]);
          }

    },[searchedValue]);

    const searchKala=()=>{
        if (searchedValue.length < 1) {
            window.location.href='http://localhost:3002/home';
            } else {
            window.location.href='http://localhost:3002/searchKala/'+searchedValue;
        }
    }
  
if(localStorage.getItem("isLogedIn")){
    return (
        <>
        <div className="row mx-0 topMenu ">
            <div className="flex-container">
                <div className="flex-item-left">
                    <FontAwesomeIcon onClick={() => navigate(-1)} className="faIcon chevron-icon-right" icon={faChevronRight} />
                    <span className="mx-4" data-bs-toggle="offcanvas" data-bs-target="#offcanvasWithBothOptions" aria-controls="offcanvasWithBothOptions"> <FontAwesomeIcon className="faIcon" icon={faBars} /> </span>
                    <form className="d-inline">
                    <FontAwesomeIcon onClick={() => handleSearchIcon(!showSearchInput)} className="seachIcon faIcon" id="searchIcon" icon={faSearch} />
                        {showSearchInput && ( 
                          <input className="txtsearch" id="searchTextInput" type="text" value={searchedValue}
                            onChange={(e)=>{setSearchedValue(e.target.value); setSeachContainer(true);}}
                            onKeyUp={(e) => {
                                if (e.key === 'Enter') {
                                    searchKala(e);
                                }
                              }}
                             placeholder="چی لازم داری ؟  ..." />  )}
                    </form>
                </div>
                
                <div className="flex-item-right mt-1" id="headerStaff">
                    <Link to="/inviteCode" className="headerLink" > <span> {takhfifMoney} </span> <FontAwesomeIcon className="faIcon" icon={faPeopleArrows} /> &nbsp;  </Link>    
                    <Link className="headerLink" to="/shoppingCart" element={<ShoppingCart />} ><FontAwesomeIcon className="faIcon" icon={faShoppingCart} /> &nbsp; <span className="badge text-bg-dark cartNotification">{localStorage.getItem("buyAmount")}</span> </Link> 
                </div>  
            </div>
        </div>
        
        {serarchContainer ?
        <div className="search-container">
          {searchResults.map((element) => (
            <div className="search-item">
                <a className="seach-anchor" href={`http://localhost:3002/searchKala/${element.GoodName}`}>
                    <li className="list-group-item">
                        <img className="seached-img"
                            src={`https://starfoods.ir/resources/assets/images/kala/${element.GoodSn}_1.jpg`}
                            alt={element.GoodName}
                        />
                       {element.GoodName}
                    </li>
                </a>
            </div>
           ))}
        </div>
        : ""}
    </>
    )
}else{
    window.location.href="/login"
}
}

export default memo (Header)