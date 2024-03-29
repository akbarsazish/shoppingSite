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
import AppGuide from "./components/appInfo/AppGuide";
import StackTower from "./components/game/stackeTower/StackTower";

function App() {
  const headers = { 
    Authorization: `Bearer ${localStorage.getItem('isLogedIn')}`,
    Accept :'application/json',
    'Content-Type': 'application/json',
  }

  const [byModal, setByModal] = useState(false);
  const cartRef = useRef(null);
  const API_URL = 'https://starfoods.ir/api';

  const login = async (username, password) => {
    const response = await axios.post(API_URL + '/login', {
      username,
      password
    });
    if (response.data.accessToken) {
      localStorage.setItem('user', JSON.stringify(response.data));
    }
    return response.data;
  }

  const changeHeartIconColor = (goodSn, event) => {
    axios.get('https://starfoods.ir/api/setFavorite', {
      params: {
        goodSn: goodSn,
        psn:localStorage.getItem("psn"),
      },
      headers,
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
        <Route path='/profile' element={<Profile  headers={headers} />} />
        <Route path='/grouping' element={<Grouping headers={headers} />} />
        <Route path='/groupingItems/:id'            element={<GroupingItems headers={headers}  buyModal={byModal} changeHeartIconColor={((goodSn,event)=>changeHeartIconColor(goodSn,event))}/>}/>
        <Route path='/subGroupItems/:mainId/:subId' element={<SubGroupItems  buyModal={byModal} changeHeartIconColor={((goodSn,event)=>changeHeartIconColor(goodSn,event))}/>}/>
        <Route path='/descKala/:goodSn/:groupId'    element={<DescKala  headers={headers} buyModal={byModal} changeHeartIconColor={((goodSn,event)=>changeHeartIconColor(goodSn,event))}/>}/>
        <Route path='/shoppingCart'                 element={<ShoppingCart headers={headers} cartRef={cartRef}  setAllMoneyToLocaleStorage={(allMoney)=>setAllMoneyToLocaleStorage(allMoney)} setAllProfitToLocaleStorage={(allProfit)=>setAllProfitToLocaleStorage(allProfit)}/>}/>
        <Route path='/favorite'                     element={<Favorite headers={headers} buyModal={byModal} changeHeartIconColor={((goodSn,event)=>changeHeartIconColor(goodSn,event))}/>}/>
        <Route path='/message'                      element={<Message headers={headers}/>}/>
        <Route path='/contact'                      element={<Contact/>}/>
        <Route path='/editProfile'                  element={<EditProfile headers={headers}/>}/> 
        <Route path='/returnedFactor'               element={<ReturnedFactor/>}/>
        <Route path='/shipping'                     element={<Shiping headers={headers}/>}/>
        <Route path='/success'                      element={<Success headers={headers}/>}/>
        <Route path='/wallet'                       element={<Wallet headers={headers}/>}/>
        <Route path='/factorDetails'                element={<FactoreDetails headers={headers}/>}/>
        <Route path='/orderDetails'                 element={<OrderDetails headers={headers}/>}/>
        <Route path='/login'                        element={<Login/>}/>
        <Route path="/about"                        element={<About/>}/>
        <Route path="/policy"                       element={<Policy/>}/>
        <Route path="privacy"                       element={<Privacy/>}/>
        <Route path="gamerList"                     element={<GamerList headers={headers}/>}/>
        <Route path="disAndPrice"                   element={<DiscountAndPrice headers={headers}/>}/>
        <Route path="lottery"                       element={<Lottery headers={headers}/>}/>
        <Route path="inviteCode"                    element={<InviteCode headers={headers}/>}/>
        <Route path='/searchKala/:term'             element={<SearchResult headers={headers} changeHeartIconColor={((goodSn,event)=>changeHeartIconColor(goodSn,event))} />}/>
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
          <Route path="showAllKala/:partId" element={<ShowAllKala headers={headers} changeHeartIconColor={((goodSn,event)=>changeHeartIconColor(goodSn,event))}/>} />
          <Route path="showAllBrand/:brandId" element={<ShowAllBrand headers={headers} changeHeartIconColor={((goodSn,event)=>changeHeartIconColor(goodSn,event))}/>} />
          <Route path="jaliLoginRoute"
            param = {param =>({forLogin: param.forLogin, forUserName:param.forUserName, forUserPsn: param.forUserPsn, forboughtAmount:param.forboughtAmount, forRole:param.forRole})} 
            element={<JaliLogin />} />
          <Route path="/appGuid" element={<AppGuide />} />
          <Route path="/stackTower" element ={<StackTower />} />

      </Routes>
    </>
  );
}

export default App;
