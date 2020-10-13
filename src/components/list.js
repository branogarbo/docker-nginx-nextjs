import { useEffect, useRef, useState } from 'react'

export default function List(props) {
   let input = useRef('');
   let [state,setState] = useState({
      items: props.initItems
   });
   let listItems = state.items.map(item => <li>{item}</li>);

   useEffect(() => input.current.focus());

   let checkKey = event => {
      if (event.key === "Enter") {
         appendItem(input.current.value);
      }
   }
   
   let appendItem = value => {
      input.current.value = "";
      value = value.trim();

      // queue route
      if (value.includes(',')) {
         let itemQueue = value.split(',');
         
         itemQueue.forEach(item => appendItem(item));
      }

      // number route
      else if (!isNaN(value)) {
         if (value <= 0 || value > state.items.length) return;

         state.items.splice(value-1,1);
         
         setState({
            items: state.items
         });
      }

      // string route
      else {
         if (value === "*") {
            clearList();
            return;
         }

         if (state.items.includes(value) || state.items.length >= 10) return;

         state.items.push(value);
               
         setState({
            items: state.items
         });
      }
   }

   let clearList = () => {
      setState({
         items: []
      });
   }

   return ( 
      <div className="container">
         <props.type className="list">{listItems}</props.type>
         <input onKeyDown={checkKey} type="text" ref={input} />
         <button onClick={()=> appendItem(input.current.value)}>submit</button>
         <button onClick={clearList}>clear</button>
      </div>
   );
}