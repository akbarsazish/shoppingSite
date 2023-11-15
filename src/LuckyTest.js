import React, { useState, useEffect } from 'react';
import WheelComponent from 'react-wheel-of-prizes';
import axios from 'axios';
import sound from './assets/lottery/applause.mp3'
import wheel from './assets/lottery/wheel.mp3';
import Swal from 'sweetalert2';

export default function App() {
  const audio = new Audio(sound);
  const wheelAudio = new Audio(wheel);
  const [winner, setWinner] = useState();
  const [wheelChoices, setWheelChoices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://starfoods.ir/api/getLotteryInfoApi', {
          params: { psn: localStorage.getItem('psn') },
        });

        const products = response.data.products;
        if (products && products.length > 0) {
          const choices = [
            products[0].firstPrize.trim(),
            products[0].secondPrize.trim(),
            products[0].thirdPrize.trim(),
            products[0].fourthPrize.trim(),
            products[0].fifthPrize.trim(),
            products[0].sixthPrize.trim(),
            products[0].seventhPrize.trim(),
          ];
          setWheelChoices(choices);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const segColors = [
    '#EE4040',
    '#F0CF50',
    '#815CD1',
    '#3DA5E0',
    '#34A24F',
    '#F9AA1F',
    '#EC3F3F',
    '#FF9000',
  ];

  const randomOptionPicker = () => {
    return wheelChoices.length > 0
      ? wheelChoices[Math.floor(Math.random() * wheelChoices.length)]
      : null;
  };

  console.log(wheelChoices[0]);

  return (
    <div className="lucky-wheel">
 
      <h2>
        {winner &&
          (winner !== 'JACKPOT' ? `شما برنده ای ${winner} شدید!` : 'واو شما برنده شدید! ')}
      </h2>
      {loading ? (  <p>لطفا منتظر باشید! ...</p>  ) : (
        <WheelComponent
          segments={wheelChoices}
          segColors={segColors}
          winningSegment={randomOptionPicker()}
          onFinished={(winner) =>{ setWinner(winner); Swal.fire(`شما برنده ای ${winner} شدید!`); audio.play()}}
          primaryColor="black"
          contrastColor="white"
          buttonText="چرخش"
          isOnlyOnce={false}
          size={290}
          upDuration={500}
          downDuration={800}
        />
      )}

        <audio controls="controls" id="applause" src="/path/to/applause.mp3" type="audio/mp3"></audio>
        <audio controls="controls" id="wheel" src="/path/to/wheel.mp3" type="audio/mp3"></audio>
    </div>
  );
}
