import { useState } from 'react'
import useSWR from 'swr'

let fetcher = async (...args) => {
   let res = await fetch(...args);
   return res.json();
}

export default function DbFetcher() {
   let [shouldFetch,setShouldFetch] = useState(false);
   let { data, error } = useSWR(shouldFetch ? '/api/dbtest' : null ,fetcher);

   let Comp = ({message}) => (
      <div>
         <div>{message}</div>
         <button onClick={()=> setShouldFetch(true)}>get database docs</button>
      </div>
   );

   if (error) return <Comp message="failed to load data" />
   if (!data) return <Comp message={shouldFetch ? "loading..." : "click to query database"} />
   return <Comp message={data.message} />
}