import React, { useState, useEffect} from 'react';
import WheelComponent from './LuckyWheel';
import axios from 'axios';
import sound from '../../assets/lottery/applause.mp3'
import Swal from 'sweetalert2';

export default function LuckyCode(props) {
  const audio = new Audio(sound);
  const [wonPrize, setWinner] = useState();
  const [lotteryResult, setLotteryResult] = useState(false);
  const [wheelChoices, setWheelChoices] = useState([]);
  const [filteredChoices,setFilteredChoices]=useState([]);

  console.log("props in lucky code", props.headers)

  const [loading, setLoading] = useState(true);
  let myBonus = parseInt(props.mybonus);

  const [hasSetLotteryHistory, setHasSetLotteryHistory] = useState(false);

  useEffect(() => {
    if (wonPrize && lotteryResult === true && !hasSetLotteryHistory) {
      setLotteryHistory();
      setHasSetLotteryHistory(true);
      audio.play();
    }
  }, [wonPrize, lotteryResult, hasSetLotteryHistory, filteredChoices]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://starfoods.ir/api/getLotteryInfoApi', {
          params: { psn: localStorage.getItem('psn') },
          headers:props.headers
        });

        let allPrize = response.data.products;

        console.log("all prize", allPrize)

        if (allPrize && allPrize.length > 0) {
          const choices = [
              allPrize[0].firstPrize.trim(),
              allPrize[0].secondPrize.trim(),
              allPrize[0].thirdPrize.trim(),
              allPrize[0].fourthPrize.trim(),
              allPrize[0].fifthPrize.trim(),
              allPrize[0].sixthPrize.trim(),
              allPrize[0].seventhPrize.trim(),
              allPrize[0].eightthPrize.trim(),
              allPrize[0].ninethPrize.trim(),
              allPrize[0].teenthPrize.trim(),
              allPrize[0].eleventhPrize.trim(),
              allPrize[0].twelvthPrize.trim(),
              allPrize[0].therteenthPrize.trim(),
              allPrize[0].fourteenthPrize.trim(),
              allPrize[0].fifteenthPrize.trim(),
              allPrize[0].sixteenthPrize.trim(),
          ].filter(prize => prize.trim() !== "");
      
          setWheelChoices(choices);

      
         const activeChoices = []
      
         if(allPrize[0].showfirstPrize == 1){
             activeChoices.push(allPrize[0].firstPrize.trim())
          }
      
         if(allPrize[0].showsecondPrize == 1){
             activeChoices.push(allPrize[0].secondPrize.trim())
          }

         if(allPrize[0].showthirdPrize == 1){
             activeChoices.push(allPrize[0].thirdPrize.trim())
          }
      
         if(allPrize[0].showfourthPrize == 1){
             activeChoices.push(allPrize[0].fourthPrize.trim())
          }

         if(allPrize[0].showfifthPrize == 1){
             activeChoices.push(allPrize[0].fifthPrize.trim())
          }
      
         if(allPrize[0].showsixthPrize == 1){
             activeChoices.push(allPrize[0].sixthPrize.trim())
          }
      
         if(allPrize[0].showseventhPrize == 1){
             activeChoices.push(allPrize[0].seventhPrize.trim())
          }
      
         if(allPrize[0].showeightthPrize == 1){
             activeChoices.push(allPrize[0].eightthPrize.trim())
          }
      
         if(allPrize[0].showninethPrize == 1){
             activeChoices.push(allPrize[0].ninethPrize.trim())
          }
      
         if(allPrize[0].showteenthPrize == 1){
             activeChoices.push(allPrize[0].teenthPrize.trim())
          }
      
         if(allPrize[0].showeleventhPrize == 1){
             activeChoices.push(allPrize[0].eleventhPrize.trim())
          }

         if(allPrize[0].showtwelvthPrize == 1){
             activeChoices.push(allPrize[0].twelvthPrize.trim())
          }
      
         if(allPrize[0].showtherteenthPrize == 1){
             activeChoices.push(allPrize[0].therteenthPrize.trim())
          }
      
         if(allPrize[0].showfourteenthPrize == 1){
             activeChoices.push(allPrize[0].fourteenthPrize.trim())
          }
      
         if(allPrize[0].showfifteenthPrize == 1){
             activeChoices.push(allPrize[0].fifteenthPrize.trim())
          }
      
         if(allPrize[0].showsixteenthPrize == 1){
             activeChoices.push(allPrize[0].sixteenthPrize.trim())
          }
      
          setFilteredChoices(activeChoices);
      
          console.log("after if statement", activeChoices)
      }
      
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }};
    fetchData();
  }, [wonPrize, lotteryResult]);


  const randomOptionPicker = () => {
    return filteredChoices.length > 0 
    ? filteredChoices[Math.floor(Math.random() * filteredChoices.length - 1)] : null;
  };
  
  let setLotteryHistory = () =>{
    if (wonPrize && myBonus >= 500) {
        let newBonus = myBonus - 500;
        axios.get('https://starfoods.ir/api/setCustomerLotteryHistory', {
            params: {
              product: wonPrize,
              customerId: localStorage.getItem('psn'),
              remainedBonus: newBonus,
            },
          }).then((res) => {
              if (res.data === 'success'){
                console.log('data has been sent');
              } else{
                console.log('data did not send');
              }
          });
      }else {
          Swal.fire("برای شرکت در لاتاری، باید حداقل ۵۰۰ امتیاز داشته باشید!");
      }
  }

  const segColors = ['#EE4040', '#F0CF50', '#815CD1', '#3DA5E0', '#34A24F',  '#F9AA1F', '#EC3F3F', '#FF9000', '#34A24F'];

  return (
    <div id="luckyWheel" className="lucky-wheel">
      {loading ? ( <p>لطفا منتظر باشید! ...</p> ) : (
        <WheelComponent
          segments={wheelChoices}
          segColors={segColors}
          winningSegment={randomOptionPicker()}
          
          onFinished={() =>{
            const prize = randomOptionPicker();
              setWinner(prize);
              setLotteryResult(true);
               Swal.fire(`شما برنده ای ${prize} شدید!`).then(() => {
                 window.location.reload();
               });
            }}

          primaryColor="black"
          contrastColor="white"
          buttonText="چرخش"
          isOnlyOnce={false}
          size={260}
          upDuration={300}
          downDuration={400}
        />
      )}
    </div>
  );
}
