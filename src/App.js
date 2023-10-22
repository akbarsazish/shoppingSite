import React, { useState, useRef } from "react";
import './assets/css/mainStyle.css';
import './assets/css/mediaq.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import './components/genrealComponent/Sidebar';
import { Route, Routes } from 'react-router-dom';
import Layout from './components/genrealComponent/Layout';
import Profile from './components/pages/Profile';
import Grouping from './components/pages/Grouping';
import GroupingItems from './components/pages/GroupingItems';
import DescKala from './components/pages/DescKala';
import ShoppingCart from './components/pages/ShoppingCart';
import Favorite from './components/pages/Favorite';
import Message from './components/pages/Message';
import Contact from './components/pages/Contact';
import EditProfile from './components/pages/EditProfile';
import ReturnedFactor from './components/pages/ReturnedFactor';
import Shiping from './components/pages/Shiping';
import Success from './components/pages/Success';
import Wallet from './components/pages/Wallet';
import FactoreDetails from "./components/pages/FactorDetails";
import OrderDetails from "./components/pages/OrderDetails";
import Login from './components/pages/Login';
import SubGroupItems from './components/pages/SubGroupItems';
import axios from 'axios'
import SearchResult from './components/pages/SearchResult'
import About from "./components/pages/About";
import Policy from "./components/pages/Policy";
import Privacy from "./components/pages/Privacy";
import GamerList from "./components/game/GamerList";
import DiscountAndPrice from "./components/pages/DiscountAndPrice";
import Lottery from "./components/pages/Lottery";
import InviteCode from "./components/pages/InviteCode";
import ChequeRequest from "./components/pages/ChequeRequest";
import SuccessPay from "./components/pages/SuccessPay";
import PageNotFound from "./components/pages/PageNotFound";
import PayFactor from "./components/pages/PayFactor";
import GetAllKala from "./components/pages/GetAllKala";
import ShowAllKala from "./components/pages/ShowAllKala";
import ShowAllBrand from "./components/pages/ShowAllBrand";
import JaliLogin from "./components/pages/JaliLogin";
import { param } from "jquery";
import AppGuide from "./components/appInfo/AppGuide";

function App() {
  const [byModal, setByModal] = useState(false);
  const cartRef = useRef(null);
  const API_URL = 'https://starfoods.ir/api'

  const login = (username, password) => {
    return axios.post(API_URL + '/login', {
      username,
      password
    }).then(response => {
      if (response.data.accessToken) {
        localStorage.setItem('user', JSON.stringify(response.data));
      }
      return response.data;
    })
  }

  const changeHeartIconColor = (goodSn, event) => {
    axios.get('https://starfoods.ir/api/setFavorite', {
      params: {
        goodSn: goodSn,
        psn:localStorage.getItem("psn")
      }
    }).then((data) => {
      if (data.data.msg) {
        event.target.style.color = "red";
      } else {
        event.target.style.color = "black";
      }
    })
  };

  const setAllMoneyToLocaleStorage = (allMoney) => {
    localStorage.setItem("allMoney", allMoney)
  }

  const setAllProfitToLocaleStorage = (allProfit) => {
    localStorage.setItem("allProfit", allProfit)
  }

  return (
    <>
      <Routes>
        <Route path='/home' element={<Layout />} />
        <Route path='/' element={<Layout />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/grouping' element={<Grouping />} />
        <Route path='/groupingItems/:id'            element={<GroupingItems  buyModal={byModal} changeHeartIconColor={((goodSn,event)=>changeHeartIconColor(goodSn,event))}/>}/>
        <Route path='/subGroupItems/:mainId/:subId' element={<SubGroupItems  buyModal={byModal} changeHeartIconColor={((goodSn,event)=>changeHeartIconColor(goodSn,event))}/>}/>
        <Route path='/descKala/:goodSn/:groupId'    element={<DescKala       buyModal={byModal} changeHeartIconColor={((goodSn,event)=>changeHeartIconColor(goodSn,event))}/>}/>
        <Route path='/shoppingCart'                 element={<ShoppingCart   cartRef={cartRef}  setAllMoneyToLocaleStorage={(allMoney)=>setAllMoneyToLocaleStorage(allMoney)} setAllProfitToLocaleStorage={(allProfit)=>setAllProfitToLocaleStorage(allProfit)}/>}/>
        <Route path='/favorite'                     element={<Favorite       buyModal={byModal} changeHeartIconColor={((goodSn,event)=>changeHeartIconColor(goodSn,event))}/>}/>
        <Route path='/message'                      element={<Message/>}/>
        <Route path='/contact'                      element={<Contact/>}/>
        <Route path='/editProfile'                  element={<EditProfile/>}/> 
        <Route path='/returnedFactor'               element={<ReturnedFactor/>}/>
        <Route path='/shipping'                     element={<Shiping/>}/>
        <Route path='/success'                      element={<Success/>}/>
        <Route path='/wallet'                       element={<Wallet/>}/>
        <Route path='/factorDetails'                element={<FactoreDetails/>}/>
        <Route path='/orderDetails'                 element={<OrderDetails/>}/>
        <Route path='/login'                        element={<Login/>}/>
        <Route path="/about"                        element={<About/>}/>
        <Route path="/policy"                       element={<Policy/>}/>
        <Route path="privacy"                       element={<Privacy/>}/>
        <Route path="gamerList"                     element={<GamerList/>}/>
        <Route path="disAndPrice"                   element={<DiscountAndPrice/>}/>
        <Route path="lottery"                       element={<Lottery/>}/>
        <Route path="inviteCode"                    element={<InviteCode/>}/>
        <Route path='/searchKala/:term'             element={<SearchResult changeHeartIconColor={((goodSn,event)=>changeHeartIconColor(goodSn,event))} />}/>
        <Route path="chequeRequest"                 element={<ChequeRequest/>}/>
        <Route path='getAllKala/:homepartId/:id'    element={<GetAllKala buyModal={byModal} changeHeartIconColor={((goodSn,event)=>changeHeartIconColor(goodSn,event))} />} />
        <Route path="*"                             element={<PageNotFound />} />
        <Route
          path="/successPayApi"
          params={param => ({tref: param.tref, iN: param.iN, iD: param.iD})}
          element={<SuccessPay/>}/>
        <Route
          path="/finalizeFactorPayApi"
          params={param => ({ tref: param.tref, iN: param.iN, iD: param.iD})}
          element={<PayFactor/>}/>
          <Route path="showAllKala/:partId" element={<ShowAllKala  changeHeartIconColor={((goodSn,event)=>changeHeartIconColor(goodSn,event))}/>} />
          <Route path="showAllBrand/:brandId" element={<ShowAllBrand  changeHeartIconColor={((goodSn,event)=>changeHeartIconColor(goodSn,event))}/>} />
          <Route path="jaliLoginRoute"
            param = {param =>({forLogin: param.forLogin, forUserName:param.forUserName, forUserPsn: param.forUserPsn, forboughtAmount:param.forboughtAmount, forRole:param.forRole})} 
            element={<JaliLogin />} />
          <Route path="/appGuid" element={<AppGuide />} />

      </Routes>
    </>
  );
}

export default App;
