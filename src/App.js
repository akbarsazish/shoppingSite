import React from 'react';
import './App.css';
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
import ShoppingCart from './components/pages/ShoppingCart'
import Favorite from './components/pages/Favorite'
import Message from './components/pages/Message';
import Contact from './components/pages/Contact';
import EditProfile from './components/pages/EditProfile';
import ReturnedFactor from './components/pages/ReturnedFactor';
import Shiping from './components/pages/Shiping';
import Success from './components/pages/Success';
import LuckyWheel from './components/pages/LuckWell';
import Wallet from './components/pages/Wallet';
import Login from './components/pages/Login';


function App() {
  return (
    <>
      <Routes>
        <Route path='/home' element={<Layout />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/grouping' element={<Grouping />} />
        <Route path='/groupingItems/:id' element={<GroupingItems />} />
        <Route path='/descKala' element={<DescKala />} />
        <Route path='/shoppingCart' element={<ShoppingCart />} />
        <Route path='/favorite' element={<Favorite />} />
        <Route path='/message' element={<Message />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/editProfile' element={<EditProfile />}></Route>
        <Route path='/returnedFactor' element={<ReturnedFactor />} > </Route>
        <Route path='/shipping' element={<Shiping />}> </Route>
        <Route path='/success' element={<Success />}> </Route>
        <Route path='/luckWell' element={<LuckyWheel />}></Route>
        <Route path='/wallet' element={<Wallet />}> </Route>
        <Route path='/' element={<Login />}> </Route>
      </Routes>

    </>
  );
}

export default App;
