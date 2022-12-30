import { FC } from 'react'
import Footer from './Footer';

const Error: FC = () => {
   return (
      <div className="animate">
         <div className='error'>
            <p className='er'>Ошибка в базе данных</p>
         </div>   
         < Footer />
      </div>
   )
}
export default Error 