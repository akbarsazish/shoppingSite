import React, { useEffect, useState } from 'react'
import wheel from '../../assets/lottery/wheel.mp3';


const WheelComponent = ({segments, segColors,
  winningSegment, onFinished, primaryColor = 'black',
  contrastColor = 'white', buttonText = 'Spin', isOnlyOnce = true, size = 290,
  upDuration = 100, downDuration = 1000, fontFamily = 'proxima-nova' }) => {

  const wheelAudio = new Audio(wheel);
   
  let currentSegment = ''
  let isStarted = false
  const [isFinished, setFinished] = useState(false)
  let timerHandle = 0
  const timerDelay = segments.length
  let angleCurrent = 0
  let angleDelta = 0
  let canvasContext = null
  let maxSpeed = Math.PI / `${segments.length}`
  const upTime = segments.length * upDuration
  const downTime = segments.length * downDuration
  let spinStart = 0
  let frames = 0
  const centerX = 300
  const centerY = 300
  useEffect(() => {
    wheelInit()
    setTimeout(() => {
      window.scrollTo(0, 1)
    }, 0)
  }, [])
  const wheelInit = () => {
    initCanvas()
    wheelDraw()
  }

  const initCanvas = () => {
    let canvas = document.getElementById('canvas')
 
    if (navigator.userAgent.indexOf('MSIE') !== -1) {
      canvas = document.createElement('canvas')
      canvas.setAttribute('width', 555)
      canvas.setAttribute('height', 555)
      canvas.setAttribute('id', 'canvas')
      document.getElementById('wheel').appendChild(canvas)
    }

    canvas.addEventListener('click', handleCanvasClick, false);

    // Add touch event handling for mobile devices
    canvas.addEventListener('touchend', handleCanvasClick, { passive: false });

    // canvas.addEventListener('click', spin, false)
    canvasContext = canvas.getContext('2d')
  }

  const spin = () => {
    isStarted = true
    if (timerHandle === 0) {
      spinStart = new Date().getTime()
      // maxSpeed = Math.PI / ((segments.length*2) + Math.random())
      maxSpeed = Math.PI / segments.length
      frames = 0
      timerHandle = setInterval(onTimerTick, timerDelay)
      if (wheelAudio) {
        wheelAudio.play();
      }
    }
  }
  const onTimerTick = () => {
    frames++
    draw()
    const duration = new Date().getTime() - spinStart
    let progress = 0
    let finished = false
    if (duration < upTime) {
      progress = duration / upTime
      angleDelta = maxSpeed * Math.sin((progress * Math.PI) / 2)
    } else {
      if (winningSegment) {
        if (currentSegment === winningSegment && frames > segments.length) {
          progress = duration / upTime
          angleDelta =
            maxSpeed * Math.sin((progress * Math.PI) / 2 + Math.PI / 2)
          progress = 1
        } else {
          progress = duration / downTime
          angleDelta =
            maxSpeed * Math.sin((progress * Math.PI) / 2 + Math.PI / 2)
        }
      } else {
        progress = duration / downTime
        angleDelta = maxSpeed * Math.sin((progress * Math.PI) / 2 + Math.PI / 2)
      }
      if (progress >= 1) finished = true
    }

    angleCurrent += angleDelta
    while (angleCurrent >= Math.PI * 2) angleCurrent -= Math.PI * 2
    if (finished) {
      setFinished(true)
      onFinished(currentSegment)
      clearInterval(timerHandle)
      timerHandle = 0
      angleDelta = 0
       if (wheelAudio) {
        wheelAudio.pause();
        wheelAudio.currentTime = 0;
      }
    }
  }

  const wheelDraw = () => {
    clear()
    drawWheel()
    drawNeedle()
  }

  const draw = () => {
    clear()
    drawWheel()
    drawNeedle()
  }

  const drawSegment = (key, lastAngle, angle) => {
    const ctx = canvasContext
    const value = segments[key]
    ctx.save()
    ctx.beginPath()
    ctx.moveTo(centerX, centerY)
    ctx.arc(centerX, centerY, size, lastAngle, angle, false)
    ctx.lineTo(centerX, centerY)
    ctx.closePath()
    ctx.fillStyle = segColors[key]
    ctx.fill()
    ctx.stroke()
    ctx.save()
    ctx.translate(centerX, centerY)
    ctx.rotate((lastAngle + angle) / 2)
    ctx.fillStyle = contrastColor
    ctx.font = 'bold 1em ' + fontFamily
    ctx.fillText(value.substr(0, 21), size / 2 + 20, 0)
    ctx.restore()
  }

  const drawWheel = () => {
    const ctx = canvasContext
    let lastAngle = angleCurrent
    const len = segments.length
    const PI2 = Math.PI * 2
    ctx.lineWidth = 1
    ctx.strokeStyle = primaryColor
    ctx.textBaseline = 'middle'
    ctx.textAlign = 'center'
    ctx.font = '1em ' + fontFamily
    for (let i = 1; i <= len; i++) {
      const angle = PI2 * (i / len) + angleCurrent
      drawSegment(i - 1, lastAngle, angle)
      lastAngle = angle
    }

    // Draw a center circle
    ctx.beginPath()
    ctx.arc(centerX, centerY, 50, 0, PI2, false)
    ctx.closePath()
    ctx.fillStyle = primaryColor
    ctx.lineWidth = 10
    ctx.strokeStyle = contrastColor
    ctx.fill()
    ctx.font = 'bold 1em ' + fontFamily
    ctx.fillStyle = contrastColor
    ctx.textAlign = 'center'

  // Save the current state before rotating the text
  ctx.save();

  // Rotate the canvas to ensure the text is drawn horizontally
  ctx.translate(centerX, centerY);
  ctx.rotate(angleCurrent);
  ctx.fillText(buttonText, 0, 3);

  // Restore the previous state
  ctx.restore();

  ctx.stroke();

  // Add click event listener for the "Spin" text
  ctx.canvas.addEventListener('click', handleCanvasClick);

    // Draw outer circle
    ctx.beginPath()
    ctx.arc(centerX, centerY, size, 0, PI2, false)
    ctx.closePath()

    ctx.lineWidth = 10
    ctx.strokeStyle = primaryColor
    ctx.stroke()
  }


  const handleCanvasClick = (event) => {
    // Prevent the default action to avoid unexpected behavior
    event.preventDefault();
  
    const rect = event.target.getBoundingClientRect();
    let clickX, clickY;
  
    if (event.type === 'touchend') {
      // For touch events, use the first touch point
      const touch = event.changedTouches[0];
      clickX = touch.clientX - rect.left;
      clickY = touch.clientY - rect.top;
    } else {
      // For click events, use clientX and clientY directly
      clickX = event.clientX - rect.left;
      clickY = event.clientY - rect.top;
    }
  
    // Dynamically calculate the center based on canvas size
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
  
    const distance = Math.sqrt(Math.pow(clickX - centerX, 2) + Math.pow(clickY - centerY, 2));
  
    // If the click is within the center circle, call the spin function
    if (distance <= 50) {
      spin();
    }
  };

  const drawNeedle = () => {
    const ctx = canvasContext
    ctx.lineWidth = 1
    ctx.strokeStyle = contrastColor
    ctx.fileStyle = contrastColor
    ctx.beginPath()
    ctx.moveTo(centerX + 20, centerY - 50)
    ctx.lineTo(centerX - 20, centerY - 50)
    ctx.lineTo(centerX, centerY - 70)
    ctx.closePath()
    ctx.fill()
    const change = angleCurrent + Math.PI / 2
    let i =
      segments.length -
      Math.floor((change / (Math.PI * 2)) * segments.length) -
      1
    if (i < 0) i = i + segments.length
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillStyle = primaryColor
    ctx.font = 'bold 1.5em ' + fontFamily
    currentSegment = segments[i]
    isStarted && ctx.fillText(currentSegment, centerX + 10, centerY + size + 50)
  }
  const clear = () => {
    const ctx = canvasContext
    ctx.clearRect(0, 0, 1000, 800)
  }
  return (
    <div id='wheel' style={{textAlign:"center" }}>
      <canvas id='canvas' width='600' height='600'
        style={{
          pointerEvents: isFinished && isOnlyOnce ? 'none' : 'auto'
        }}
      />
    </div>
  )
}
export default WheelComponent
