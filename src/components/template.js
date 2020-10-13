import Link from 'next/link'
import style from '../style/template.module.css'

export default function Template({ title, children }) {
   return (
      <div className={style.container}>
         <h1>{title}</h1>

         {children}

         <Link href="/">
            <a className={style.backToHome}><img className={style.BTHarrow} src="/left-arrow.svg" /> Back to Home</a>
         </Link>
      </div>
   )
}