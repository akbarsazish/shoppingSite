import React, { useState, useEffect} from 'react';
import WheelComponent from 'react-wheel-of-prizes';
import axios from 'axios';
import sound from './assets/lottery/applause.mp3'
import wheel from './assets/lottery/wheel.mp3';
import Swal from 'sweetalert2';

export default function LuckyTest(mybonus) {
  const audio = new Audio(sound);
  const wheelAudio = new Audio(wheel);
  const [wonPrize, setWinner] = useState();
  const [lotteryResult, setLotteryResult] = useState(false);
  const [wheelChoices, setWheelChoices] = useState([]);
  const [loading, setLoading] = useState(true);
  let myBonus = parseInt(mybonus.mybonus);

  const [hasSetLotteryHistory, setHasSetLotteryHistory] = useState(false);

  useEffect(() => {
    if (wonPrize && lotteryResult === true && !hasSetLotteryHistory) {
      setLotteryHistory();
      setHasSetLotteryHistory(true);
      audio.play();
    }
  }, [wonPrize, lotteryResult, hasSetLotteryHistory]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://starfoods.ir/api/getLotteryInfoApi', {
          params: { psn: localStorage.getItem('psn') },
        });

        const products = response.data.products;
        if (products && products.length > 0) {
          const preciousPrizeToExclude = products[0].fourthPrize.trim();
          const choices = [
            products[0].firstPrize.trim(),
            products[0].secondPrize.trim(),
            products[0].thirdPrize.trim(),
            products[0].fourthPrize.trim(),
            products[0].fifthPrize.trim(),
            products[0].sixthPrize.trim(),
            products[0].seventhPrize.trim(),
            products[0].eightthPrize.trim(),
            products[0].teenthPrize.trim()
         ].filter(prize => prize !== preciousPrizeToExclude);
          setWheelChoices(choices);
        }
      } catch (error) {
         console.error('Error fetching data:', error);
      } finally {
         setLoading(false);
      }
    };

    fetchData();

}, [wonPrize, lotteryResult]);

  let setLotteryHistory = () =>{
    if (wonPrize && myBonus >= 500) {
        let newBonus = myBonus - 500;
        axios
          .get('https://starfoods.ir/api/setCustomerLotteryHistory', {
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

  const randomOptionPicker = () => {
    return wheelChoices.length > 0
      ? wheelChoices[Math.floor(Math.random() * wheelChoices.length)]
      : null;
  };



  return (
    <div id="luckyWheel" className="lucky-wheel">
      {loading ? ( <p>لطفا منتظر باشید! ...</p> ) : (
        <WheelComponent
          segments={wheelChoices}
          segColors={segColors}
          winningSegment={randomOptionPicker()}
          onFinished={(wonPrize) =>{ setWinner(wonPrize); setLotteryResult(true); Swal.fire(`شما برنده ای ${wonPrize} شدید!`);}}
          primaryColor="black"
          contrastColor="white"
          buttonText="چرخش"
          isOnlyOnce={false}
          size={270}
          upDuration={500}
          downDuration={800}
        />
      )}

      <audio className='lucky-audio' controls="controls" id="applause" src="/path/to/applause.mp3" type="audio/mp3"></audio>
      <audio className='lucky-audio' controls="controls" id="wheel" src="/path/to/wheel.mp3" type="audio/mp3"></audio>
    </div>
  );
}
