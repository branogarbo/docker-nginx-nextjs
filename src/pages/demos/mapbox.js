import dynamic from 'next/dynamic'
import Template from '../../components/template'
import Head from 'next/head'

let Map = dynamic(()=> import('../../components/mapbox'), {
   ssr: false,
   loading: ()=> <b>Loading...</b>
});

export default () => {
   return (
      <div>
         <Head>
            <link href="https://api.mapbox.com/mapbox-gl-js/v0.51.0/mapbox-gl.css" rel="stylesheet" />
         </Head>

         <Template title="Mapbox Demo">
            <Map />
         </Template>
      </div>
   );
}