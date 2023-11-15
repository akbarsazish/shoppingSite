import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../assets/lottery/lotteryStyle.css';
import Swal from 'sweetalert2';
import sound from '../../assets/lottery/applause.mp3';
import wheel from '../../assets/lottery/wheel.mp3';

function shuffle(array) {
let currentIndex = array.length, randomIndex;
while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [array[randomIndex],array[currentIndex]];
}
return array;
}

export default function LuckyCode({mybonus, minBonus}) {
  const audio = new Audio(sound);
  const wheelAudio = new Audio(wheel);
  const [wonPrize, setWonPrize]= useState('');
  const [rotation, setRotation] = useState(190);

  const [selectedItem, setSelectedItem] = useState({eightthPrize:'',eleventhPrize:'',fifteenthPrize:'',
    fifthPrize:'',firstPrize:'',fourteenthPrize:'',fourthPrize:'',id :'0',ninethPrize:'',
    secondPrize:'',seventhPrize:'',showeightthPrize:'0',showeleventhPrize:'0',showfifteenthPrize:'0',
    showfifthPrize:'0',showfirstPrize:'0',showfourteenthPrize:'0',showfourthPrize:'0',
    showninethPrize:'0',showsecondPrize:'0',showseventhPrize:'0',showsixteenthPrize:'0',
    showsixthPrize:'0',showteenthPrize:'0',showtherteenthPrize:'0',showthirdPrize:'0',
    showtwelvthPrize:'0',sixteenthPrize:'0',sixthPrize:'0',teenthPrize:'0',therteenthPrize:'0',                                                                                                                                               
    thirdPrize:'',timestam:'2022-12-06 11:44:16.207',twelvthPrize:''});

  let firstPrize= shuffle([(0)]);
  let secondPrize= shuffle([(0)]);
  let thirdPrize= shuffle([(0)]);
  let fourthPrize= shuffle([(0)]);
  let fifthPrize= shuffle([(0)]);
  let sixthPrize= shuffle([(0)]);
  let seventhPrize= shuffle([(0)]);
  let eightPrize= shuffle([(0)]);
  let ninthPrize= shuffle([(0)]);
  let teenthPrize= shuffle([(0)]);
  let eleventhPrize= shuffle([(0)]);
  let twelvthPrize= shuffle([(0)]);
  let therteenthPrize= shuffle([(0)]);
  let fourteenthPrize= shuffle([(0)]);
  let fifteenthPrize= shuffle([(0)]);
  let sixteenthPrize= shuffle([(0)]);
  let wheelBtn = document.getElementById("spinnerBtn");

//   if(mybonus < minBonus){
//     wheelBtn.disabled = true;
//   }

  useEffect(() => {
    axios.get('https://starfoods.ir/api/getLotteryInfoApi', {
      params: { psn: localStorage.getItem('psn') },
    }).then((data) => {
        setSelectedItem(data.data.products[0]);
    });
  
    if (wonPrize) {
       setTimeout(() => {
          // applause.play();
        audio.play()
        Swal.fire({
          title: `تبریک! شما برنده ${wonPrize} شده‌اید.`,
              showClass: {
              popup: 'animate__animated animate__fadeInDown'
           },
            hideClass: {
              popup: 'animate__animated animate__fadeOutUp'
            }});
        }, 5000);

        // send data to the server
        axios.get('https://starfoods.ir/api/setCustomerLotteryHistory', {
            params: {product:wonPrize, customerId: localStorage.getItem('psn')},
        }).then((res)=>{
            if(res.data==="success"){
                mybonus = mybonus - 500;
                console.log("data has been sent");
            }else {
                console.log("data did not send");
            }
        });
      }
}, [wonPrize]);


    if(selectedItem.showfirstPrize ===1){
        firstPrize = shuffle([(3766)]);
    }
    if(selectedItem.showsecondPrize ===1){
        secondPrize = shuffle([(3730)]);
    }
    if(selectedItem.showthirdPrize ===1){
        thirdPrize = shuffle([(3682)]);
    }    
    if(selectedItem.showfourthPrize ===1){
        fourthPrize = shuffle([(3643)]);
    }    
    if(selectedItem.showfifthPrize ===1){
        fifthPrize = shuffle([(3610)]);
    }    
    if(selectedItem.showsixthPrize ===1){
        sixthPrize = shuffle([(3579)]);
    }    
    if(selectedItem.showseventhPrize ===1){
        seventhPrize = shuffle([(3545)]);
    }    
    if(selectedItem.showeightthPrize ===1){
        eightPrize = shuffle([(3510)]);
    }
    if(selectedItem.showninethPrize ===1){
        ninthPrize = shuffle([(3466)]);
    }
    if(selectedItem.showteenthPrize ===1){
        teenthPrize = shuffle([(3433)]);
    }
    if(selectedItem.showeleventhPrize ===1){
        eleventhPrize = shuffle([(0)]);
    }
    if(selectedItem.showtwelvthPrize ===1){
        twelvthPrize = shuffle([(0)]);
    }
    if(selectedItem.showtherteenthPrize ===1){
        therteenthPrize = shuffle([(0)]);
    }
    if(selectedItem.showfourteenthPrize ===1){
        fourteenthPrize = shuffle([(0)]);
    }
    if(selectedItem.showfifteenthPrize ===1){
        fifteenthPrize = shuffle([(0)]);
    }
    if(selectedItem.showsixteenthPrize ===1){
        sixteenthPrize = shuffle([(0)]);
    }

   let hasil=[];
   let primaryPrizeList = shuffle([
     firstPrize[0], secondPrize[0], thirdPrize[0], fourthPrize[0], fifthPrize[0],
     sixthPrize[0], seventhPrize[0], eightPrize[0], ninthPrize[0], teenthPrize[0], eleventhPrize[0],
     twelvthPrize[0], therteenthPrize[0],fourteenthPrize[0], fifteenthPrize[0], sixteenthPrize[0]
   ]);

   primaryPrizeList.forEach((element)=>{
     if(element>0){
       hasil.push(element);
     }
   })

const handleSpin = () => {
    // Animation logic
    wheelAudio.play();
    const randomRotation = Math.floor(Math.random() * 360); 
    setRotation(rotation + randomRotation);
    const box = document.getElementById('box');
    const element = document.getElementById('mainbox');
    
    box.style.transition = 'all ease 5s';
    box.style.transform = `rotate(${hasil[0]}deg)`;
    element.classList.remove('animate');
     
    setTimeout(() => {
        element.classList.add('animate');
    }, 5000);

    // Calculate selectedItem based on hasil array
    if (firstPrize.includes(hasil[0])) setWonPrize(selectedItem.firstPrize);
    if (secondPrize.includes(hasil[0])) setWonPrize(selectedItem.secondPrize);
    if (thirdPrize.includes(hasil[0])) setWonPrize(selectedItem.thirdPrize);
    if (fourthPrize.includes(hasil[0])) setWonPrize(selectedItem.fourthPrize);
    if (fifthPrize.includes(hasil[0])) setWonPrize(selectedItem.fifthPrize);
    if (sixthPrize.includes(hasil[0])) setWonPrize(selectedItem.sixthPrize);
    if (seventhPrize.includes(hasil[0])) setWonPrize(selectedItem.seventhPrize);
    if (eightPrize.includes(hasil[0])) setWonPrize(selectedItem.eightthPrize);
    if (ninthPrize.includes(hasil[0])) setWonPrize(selectedItem.ninethPrize);
    if (teenthPrize.includes(hasil[0])) setWonPrize(selectedItem.teenthPrize);
    if (eleventhPrize.includes(hasil[0])) setWonPrize(selectedItem.eleventhPrize);
    if (twelvthPrize.includes(hasil[0])) setWonPrize(selectedItem.twelvthPrize);
    if (therteenthPrize.includes(hasil[0])) setWonPrize(selectedItem.therteenthPrize);
    if (fourteenthPrize.includes(hasil[0])) setWonPrize(selectedItem.fourteenthPrize);
    if (fifteenthPrize.includes(hasil[0])) setWonPrize(selectedItem.fifteenthPrize);
    if (sixteenthPrize.includes(hasil[0])) setWonPrize(selectedItem.sixteenthPrize);

    setTimeout(() => {
        box.style.transition = 'initial';
        box.style.transform = 'rotate(90deg)';
        setWonPrize('');
    }, 6000);
};

return (
    <>
    <div className="row p-3 lucky-wheel">
        <div id="jquery-script-menu">
          <div className={`mainbox ${rotation == 0 ? '' : 'spin-animation'}`} id="mainbox">
            <div id="box" className="box boxBorder">
              <div className="box1">
                {selectedItem.firstPrize>0?
                  <span className="font span1"> <b> {selectedItem.firstPrize.trim()} </b> </span>
                :''}
                {selectedItem.secondPrize.length>0?
                  <span className="font span2"> <b> {selectedItem.secondPrize.trim()} </b> </span>
                :''}
                {selectedItem.thirdPrize.length>0?
                  <span className="font span3"> <b> {selectedItem.thirdPrize.trim()} </b> </span>
                :''}
                {selectedItem.fourthPrize.length>0?
                  <span className="font span4"> <b> {selectedItem.fourthPrize.trim()} </b> </span>
                :''}
                {selectedItem.fifthPrize.length>0?
                  <span className="font span5"> <b> {selectedItem.fifthPrize.trim()} </b> </span>
                :''}
                {selectedItem.fourteenthPrize.length>0?
                <span className="font span6"> <b> {selectedItem.fourteenthPrize.trim()} </b> </span>
                :''}
                {selectedItem.fifteenthPrize.length>0?
                  <span className="font span7"> <b> {selectedItem.fifteenthPrize.trim()} </b> </span>
                :''}
                {selectedItem.sixthPrize.length>0?
                  <span className="font span1"> <b> {selectedItem.sixteenthPrize.trim()} </b> </span>
                :''}
            </div>
            
            <div className="box2">
              {selectedItem.sixthPrize.length>0?
                <span className="font span1"> <b> {selectedItem.sixthPrize.trim() } </b> </span>
                :''}
                {selectedItem.seventhPrize.length>0?
                <span className="font span2"> <b> {selectedItem.seventhPrize.trim() } </b> </span>
                :''}
                {selectedItem.eightthPrize.length>0?
                <span className="font span3"> <b> {selectedItem.eightthPrize.trim() } </b> </span>
                :''}
                {selectedItem.ninethPrize.length>0?
                <span className="font span4"> <b> {selectedItem.ninethPrize.trim() } </b> </span>
                :''}
                {selectedItem.teenthPrize.length>0?
                <span className="font span5"> <b> {selectedItem.teenthPrize.trim() } </b> </span>
                :''}
                {selectedItem.eleventhPrize.length>0?
                <span className="font span6"> <b> {selectedItem.eleventhPrize.trim() } </b> </span>
                :''}
                {selectedItem.fifteenthPrize.length>0?
                <span className="font span7"> <b> {selectedItem.fifteenthPrize.trim() } </b> </span>
                :''}
                {selectedItem.sixteenthPrize?
                <span className="font span8"> <b> {selectedItem.sixteenthPrize.trim() } </b> </span>
                :''}
            </div>
            <button className="spin" id="spinnerBtn" onClick={handleSpin}>  چرخش </button>
        </div>

        {/* Replace with actual audio elements */}
        <audio controls="controls" id="applause" src="/path/to/applause.mp3" type="audio/mp3"></audio>
        <audio controls="controls" id="wheel" src="/path/to/wheel.mp3" type="audio/mp3"></audio>

        </div>
     </div>
    </div>
  </>
);
}
