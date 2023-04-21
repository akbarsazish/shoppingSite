import React,{ useState,useRef} from "react";
import './App.css';
import './assets/css/mainStyle.css';
import './assets/css/mediaq.css';
import 'bootstrap/dist/css/bootstrap.css';
import { Modal } from 'bootstrap';
import 'bootstrap/dist/js/bootstrap.js'
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
import LuckyWheel from './components/pages/LuckWell';
import Wallet from './components/pages/Wallet';
import FactoreDetails from "./components/pages/FactorDetails";
import Login from './components/pages/Login';
import SubGroupItems from './components/pages/SubGroupItems';
import axios from 'axios'
// import { AxiosProvider, Request, Get, Delete, Head, Post, Put, Patch, withAxios } from 'react-axios'



function App() {
  const [buyOption, setBuyOption]=useState(0)
  const [byModal, setByModal] = useState(false);
  const cartRef=useRef(null);
  const API_URL='http://192.168.10.27:8080/api'

  const login=(username, password)=> {
    return axios.post(API_URL + '/login', {
      username,
      password
    }).then(response => {
      console.log(response.data)
      if (response.data.accessToken) {
        localStorage.setItem('user', JSON.stringify(response.data));
      }
      return response.data;
    })
  }
 
  const showBuyMdoal=(goodSn,event)=>{
    
    fetch("http://192.168.10.27:8080/api/getUnitsForUpdate/?Pcode="+goodSn)
  .then(response=>response.json())
  .then((data) => {
    console.log(data)
    let modalItems=[];
      for (let index = 1; index <= data.maxSale; index++) {
        modalItems.push(<button data-bs-dismiss="modal" className="btn btn-sm btn-danger buyButton" onClick={(e) =>buySomething(data.amountExist,data.freeExistance,data.zeroExistance,data.costLimit,data.costError,data.amountUnit*index,data.kalaId,data.defaultUnit,e,event)}>{index+' '+data.secondUnit+' معادل '+' '+index*data.amountUnit+' '+data.defaultUnit}</button>)
      }
      const items=modalItems.map((item)=>item)
      setBuyOption(items)
      setByModal(true)
  })
}
const showUpdateBuyModal=(goodSn,snOrderBYS)=>{
  fetch("http://192.168.10.27:8080/api/getUnitsForUpdate/?Pcode="+goodSn)
  .then(response=>response.json())
  .then((data) => {
    let modalItems=[];
      for (let index = 1; index <= data.maxSale; index++) {
        modalItems.push(<button data-bs-dismiss="modal" className="btn btn-sm btn-info buyButton" onClick={() =>updateBuy(snOrderBYS,data.amountUnit*index,data.kalaId)}>{index+' '+data.secondUnit+' معادل '+' '+index*data.amountUnit+' '+data.defaultUnit}</button>)
      }
      const items=modalItems.map((item)=>item)
      setBuyOption(items)
      setByModal(true)
  })
}

const updateBuy=(orderId,amountUnit,goodSn)=>{
      axios.get('http://192.168.10.27:8080/api/updateOrderBYS',
      {params:{
        kalaId: goodSn,
        amountUnit: amountUnit,
        orderBYSSn: orderId
      }
      }
      ).then((response)=> {
      })

  }

const changeHeartIconColor = (goodSn,event) => {
    axios.get('http://192.168.10.27:8080/api/setFavorite',{params:{
        goodSn:goodSn
    }}).then((data)=>{
        if(data.data.msg){
            
            event.target.style.color="red";
        }else{
            event.target.style.color="black";
        }
        
    })
};

const buySomething=(amountExist,freeExistance,zeroExistance,costLimit,costError,amountUnit,goodSn,defaultUnit,btnModalEvent,event)=>{

        if((amountUnit > amountExist) && (freeExistance==0)){
          alert("حد اکثر مقدار خرید شما " + amountExist + " " + defaultUnit + "می باشد");
        }else{
                if (costLimit > 0) {
                  if (amountUnit >= costLimit) {
                    alert(costError);
                  }
                }
                axios.get('http://192.168.10.27:8080/api/buySomething',
                {params:{
                  kalaId: goodSn,
                  amountUnit: amountUnit
                  }
                }).then((response)=> {
                let  countBought=parseInt(localStorage.getItem('buyAmount'));
                  localStorage.setItem('buyAmount',countBought+1);

                  // let modalCloser=document.querySelector("[data-bs-dismiss]");
                  // modalCloser.dispatchEvent(new Event("click"))

                  // const truck_modal = document.querySelector('#exampleModal');
                  // const modal = bootstrap.Modal.getInstance(truck_modal);    
                  // modal.hide();

                  event.target.textContent=btnModalEvent.target.textContent;
                  event.target.classList.remove("btn-danger");
                  event.target.classList.add("btn-info");
                
                })
              }   
}

const deleteOrder=(orderBYSSn,goodSn)=>{
  
   axios.post('http://192.168.10.27:8080/api/deleteOrderBYS',{
    SnOrderBYS: orderBYSSn
    }).then((data)=>{
      let  countBought=parseInt(localStorage.getItem('buyAmount'));
      if(countBought>0){
      localStorage.setItem('buyAmount',countBought-1);
      let cartDiv=document.getElementById(goodSn+"cartDiv")
      cartDiv.style.display="none";
      }
    })
}
const setAllMoneyToLocaleStorage=(allMoney)=>{
  localStorage.setItem("allMoney",allMoney)
}

const setAllProfitToLocaleStorage=(allProfit)=>{
  localStorage.setItem("allProfit",allProfit)
}

  return (
    <>
      <Routes>
        <Route path='/home' element={<Layout />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/grouping' element={<Grouping />} />
        <Route path='/groupingItems/:id'            element={<GroupingItems buyModal={byModal} changeHeartIconColor={((goodSn,event)=>changeHeartIconColor(goodSn,event))} showUpdateBuyModal={(goodSn,snOrderBYS)=>showUpdateBuyModal(goodSn,snOrderBYS)} showBuyModal={(goodSn,event)=>showBuyMdoal(goodSn,event)} buyOption={buyOption}/>} />
        <Route path='/subGroupItems/:mainId/:subId' element={<SubGroupItems buyModal={byModal} changeHeartIconColor={((goodSn,event)=>changeHeartIconColor(goodSn,event))} showUpdateBuyModal={(goodSn,snOrderBYS)=>showUpdateBuyModal(goodSn,snOrderBYS)} showBuyModal={(goodSn,event)=>showBuyMdoal(goodSn,event)} buyOption={buyOption}/>} />
        <Route path='/descKala/:goodSn' element={<DescKala  buyModal={byModal} showUpdateBuyModal={(goodSn,snOrderBYS)=>showUpdateBuyModal(goodSn,snOrderBYS)} showBuyModal={(goodSn,event)=>showBuyMdoal(goodSn,event)} buyOption={buyOption}/>} />
        <Route path='/shoppingCart' element={<ShoppingCart cartRef={cartRef} setAllMoneyToLocaleStorage={(allMoney)=>setAllMoneyToLocaleStorage(allMoney)} setAllProfitToLocaleStorage={(allProfit)=>setAllProfitToLocaleStorage(allProfit)} deleteOrder={(SnOrderBYS,goodSn)=>deleteOrder(SnOrderBYS,goodSn)}  showUpdateBuyModal={(goodSn,snOrderBYS)=>showUpdateBuyModal(goodSn,snOrderBYS)}  buyOption={buyOption}/>} />
        <Route path='/favorite' element={<Favorite buyModal={byModal} changeHeartIconColor={((goodSn,event)=>changeHeartIconColor(goodSn,event))} showUpdateBuyModal={(goodSn,snOrderBYS)=>showUpdateBuyModal(goodSn,snOrderBYS)} showBuyModal={(goodSn,event)=>showBuyMdoal(goodSn,event)} buyOption={buyOption}/>} />
        <Route path='/message' element={<Message />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/editProfile' element={<EditProfile />}></Route>
        <Route path='/returnedFactor' element={<ReturnedFactor />} > </Route>
        <Route path='/shipping' element={<Shiping />}> </Route>
        <Route path='/success' element={<Success />}> </Route>
        <Route path='/luckWell' element={<LuckyWheel />}></Route>
        <Route path='/wallet' element={<Wallet />}> </Route>
        <Route path='/factorDetails' element={<FactoreDetails />}></Route>
       
        <Route path='/login' element={<Login submitForm={()=>login("09106670985","2266")} />}> </Route>
      </Routes>
    </>
  )
}

export default App;
