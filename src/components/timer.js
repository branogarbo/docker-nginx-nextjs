import { useEffect } from 'react'

export default function Timer() {
   let [seconds,setSeconds] = React.useState(0);
   let [isOn,setOn] = React.useState(false);

   let toggleTimer = () => {
      setOn(!isOn);
   }

   let resetTimer = () => {
      setSeconds(0);
      setOn(false);
   }

   useEffect(()=>{
      let tick = null;

      if (isOn) {
         tick = setInterval(() => setSeconds(seconds + 1), 1000);
      }
      else {
         clearInterval(tick);
      }

      return () => clearInterval(tick);
   })

   return (
      <div className="container">
         <h2>{seconds}s</h2>
         <button onClick={toggleTimer}>{isOn ? 'Stop' : 'Start'}</button>
         <button onClick={resetTimer}>Reset</button>
      </div>
   );
}