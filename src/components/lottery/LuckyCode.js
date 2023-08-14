    import React, { useState, useEffect } from 'react';
    import axios from 'axios';
    import '../../assets/lottery/lotteryStyle.css';

    function shuffle(array) {
    let currentIndex = array.length, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [array[currentIndex], array[randomIndex]] = [array[randomIndex],array[currentIndex]];
    }
    return array;
    }

    export default function LuckyCode() {
    const [selectedItem, setSelectedItem] = useState({eightthPrize:'',eleventhPrize:'',fifteenthPrize:''
        ,fifthPrize:"",firstPrize: "",fourteenthPrize:'',fourthPrize:"",id :"0",ninethPrize:"",
        secondPrize:"",seventhPrize:"",showeightthPrize:"0",showeleventhPrize:"0",showfifteenthPrize: "0",
        showfifthPrize:"0",showfirstPrize:"0",showfourteenthPrize:"0",showfourthPrize:"0",
        showninethPrize:"0",showsecondPrize:"0",showseventhPrize:"0",showsixteenthPrize:"0",
        showsixthPrize:"0",showteenthPrize:"0",showtherteenthPrize:"0",showthirdPrize:"0",
        showtwelvthPrize:"0",sixteenthPrize:"",sixthPrize:"",teenthPrize:"",therteenthPrize:"",                                                                                                                                               
        thirdPrize:"",timestam:"2022-12-06 11:44:16.207",twelvthPrize:""});
    const [wonPrize,setWonPrize]=useState('');
    const [rotation, setRotation] = useState(90);

    let FirstPrize= shuffle([(0)]) ;
    let secondPrize= shuffle([(0)]) ;
    let thirdPrize= shuffle([(0)]) ;
    let fourthPrize= shuffle([(0)]) ;
    let fifthPrize= shuffle([(0)]) ;
    let sixthPrize= shuffle([(0)]) ;
    let seventhPrize= shuffle([(0)]) ;
    let eightPrize= shuffle([(0)]) ;
    let ninthPrize= shuffle([(0)]) ;
    let teenthPrize= shuffle([(0)]) ;
    let eleventhPrize= shuffle([(0)]) ;
    let twelvthPrize= shuffle([(0)]) ;
    let therteenthPrize= shuffle([(0)]) ;
    let fourteenthPrize= shuffle([(0)]) ;
    let fifteenthPrize= shuffle([(0)]) ;
    let sixteenthPrize= shuffle([(0)]) ;

    useEffect(() => {
        axios
        .get('http://192.168.10.33:8080/api/getLotteryInfoApi', {
            params: { psn: localStorage.getItem('psn') },
        })
        .then((data) => {
            setSelectedItem(data.data.products[0]);
            console.log(data.data.products[0])
        });
    }, []);


    if(selectedItem.showfirstPrize ==1){
        FirstPrize = shuffle([(3766)]);
       }
    if(selectedItem.showsecondPrize ==1){
        secondPrize = shuffle([(3730)]);
       }
    if(selectedItem.showthirdPrize ==1){
        thirdPrize = shuffle([(3682)]);
       }    
    if(selectedItem.showfourthPrize ==1){
        fourthPrize = shuffle([(3643)]);
       }    
    if(selectedItem.showfifthPrize ==1){
        fifthPrize = shuffle([(3610)]);
       }    
    if(selectedItem.showsixthPrize ==1){
        sixthPrize = shuffle([(3579)]);
       }    
    if(selectedItem.showseventhPrize ==1){
        seventhPrize = shuffle([(3545)]);
       }    
    if(selectedItem.showeightthPrize ==1){
        eightPrize = shuffle([(3510)]);
       }
    if(selectedItem.showninethPrize ==1){
        ninthPrize = shuffle([(3466)]);
       }
    if(selectedItem.showteenthPrize ==1){
        teenthPrize = shuffle([(3433)]);
       }
    if(selectedItem.showeleventhPrize ==1){
        eleventhPrize = shuffle([(0)]);
       }
    if(selectedItem.showtwelvthPrize ==1){
        twelvthPrize = shuffle([(0)]);
       }
    if(selectedItem.showtherteenthPrize ==1){
        therteenthPrize = shuffle([(0)]);
       }
    if(selectedItem.showfourteenthPrize ==1){
        fourteenthPrize = shuffle([(0)]);
       }
    if(selectedItem.showfifteenthPrize ==1){
        fifteenthPrize = shuffle([(0)]);
       }
    if(selectedItem.showsixteenthPrize ==1){
        sixteenthPrize = shuffle([(0)]);
       }

       let hasil=[];
       let primaryPrizeList = shuffle([
         FirstPrize[0],
         secondPrize[0],
         thirdPrize[0],
         fourthPrize[0],
         fifthPrize[0],
         sixthPrize[0],
         seventhPrize[0],
         eightPrize[0],
         ninthPrize[0],
         teenthPrize[0],
         eleventhPrize[0],
         twelvthPrize[0],
         therteenthPrize[0],
         fourteenthPrize[0],
         fifteenthPrize[0],
         sixteenthPrize[0]
       ]);
   
       primaryPrizeList.forEach((element)=>{
         if(element>0){
           hasil.push(element);
         }
   
       })
       console.log(hasil)
       console.log(secondPrize)
    const handleSpin = () => {
        // Animation logic
        // const randomRotation = Math.floor(Math.random() * 360); 
        // setRotation(rotation + randomRotation);
        const box = document.getElementById('box');
        const element = document.getElementById('mainbox');
        
        box.style.transition = 'all ease 5s';
        box.style.transform = `rotate(${hasil[0]}deg)`;
        element.classList.remove('animate');

        setTimeout(() => {
            element.classList.add('animate');
        }, 5000);


        // Calculate selectedItem based on hasil array
        if (FirstPrize.includes(hasil[0])) setWonPrize(selectedItem.firstPrize);
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

        // Simulate playing sounds and animations
        // Replace with actual audio and animation logic
        // Play the sound
        // wheel.play();

        // Show alert
        setTimeout(() => {
        // applause.play();
        alert(`تبریک! شما برنده ${wonPrize} شده‌اید.`);
        }, 5500);

        // Reset rotation

        setTimeout(() => {
            box.style.transition = 'initial';
            box.style.transform = 'rotate(180deg)';
        }, 6000);
    };

    return (
        <>
        <div className="row p-3 lucky-wheel">
            <div id="jquery-script-menu">
            <div className={`mainbox ${rotation === 90 ? '' : 'spin-animation'}`} id="mainbox">
                <div id="box" className="box boxBorder">
                  <div className="box1">
                    {selectedItem.firstPrize.length>0?
                    <span className="font span1"> <b> {selectedItem.firstPrize} </b> </span>
                    :''}
                    {selectedItem.secondPrize.length>0?
                    <span className="font span2"> <b> {selectedItem.secondPrize} </b> </span>
                    :''}
                    {selectedItem.thirdPrize.length>0?
                    <span className="font span3"> <b> {selectedItem.thirdPrize} </b> </span>
                    :''}
                    {selectedItem.fourthPrize.length>0?
                    <span className="font span4"> <b> {selectedItem.fourthPrize} </b> </span>
                    :''}
                    {selectedItem.fifthPrize.length>0?
                    <span className="font span5"> <b> {selectedItem.fifthPrize} </b> </span>
                    :''}
                    {selectedItem.fourteenthPrize.length>0?
                    <span className="font span6"> <b> {selectedItem.fourteenthPrize} </b> </span>
                    :''}
                    {selectedItem.fifteenthPrize.length>0?
                    <span className="font span7"> <b> {selectedItem.fifteenthPrize} </b> </span>
                    :''}
                    {selectedItem.sixthPrize.length>0?
                    <span className="font span1"> <b> {selectedItem.sixteenthPrize} </b> </span>
                    :''}
                    
                </div>
                <div className="box2">
                {selectedItem.sixthPrize.length>0?
                    <span className="font span1"> <b> {selectedItem.sixthPrize.trim() } </b> </span>
                    :''}
                    {selectedItem.seventhPrize.length>0?
                    <span className="font span2"> <b> {selectedItem.seventhPrize } </b> </span>
                    :''}
                    {selectedItem.eightthPrize.length>0?
                    <span className="font span3"> <b> {selectedItem.eightthPrize } </b> </span>
                    :''}
                    {selectedItem.twelvthPrize.length>0?
                    <span className="font span4"> <b> {selectedItem.twelvthPrize } </b> </span>
                    :''}
                    {selectedItem.teenthPrize.length>0?
                    <span className="font span5"> <b> {selectedItem.teenthPrize } </b> </span>
                    :''}
                    {selectedItem.eleventhPrize.length>0?
                    <span className="font span6"> <b> {selectedItem.eleventhPrize } </b> </span>
                    :''}
                    {selectedItem.fifteenthPrize.length>0?
                    <span className="font span7"> <b> {selectedItem.fifteenthPrize } </b> </span>
                    :''}
                    {selectedItem.sixteenthPrize?
                    <span className="font span8"> <b> {selectedItem.sixteenthPrize } </b> </span>
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
