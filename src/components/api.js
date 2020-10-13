import useSWR from 'swr'
import { useState } from 'react'

let fetcher = async (...args) => {
   let res = await fetch(...args);
   return res.json();
}

export default function ApiGet() {
  let [shouldFetch,setShouldFetch] = useState(false);
  let { data, error } = useSWR(shouldFetch ? '/api/apitest' : null, fetcher);

  let Comp = ({message}) => (
    <div>
      <div>{message}</div>
      <button onClick={()=> setShouldFetch(true)}>get data</button>
    </div>
  );

  if (error) return <Comp message="failed to load" />
  if (!data) return <Comp message={shouldFetch ? 'Loading...' : 'click for data'} />
  return <Comp message={data.message} />
}