import '../style/global.css'
import Head from 'next/head'

export default function App({Component, pageProps}) {
   return (
      <div>
         <Head>
            <link href="https://fonts.googleapis.com/css2?family=Roboto+Mono:wght@400;500;700&display=swap" rel="stylesheet" />
         </Head>

         <Component {...pageProps} />
      </div>
   );
}