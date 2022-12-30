import { FC } from 'react';
import { Link } from 'react-router-dom';


const Footer: FC = () => {

   return (
      <div className='footer'>
         <div className="wrapper">

            <div className="logo">
               <Link to={'/'}> <img id='logo' src={require("./Photo/hitech.png")} /></Link>

            </div>
            <div className="adress_contact">
               <div className="adress">
                  <h3>Адрес</h3>
                  <p>
                     Беларусь, г.Минск, улица Фогеля, 1в,183
                  </p>
               </div>
               <div className="contact">
                  <h3>Контакт</h3>
                  <p>
                     +375 12 123 12 12
                  </p>


               </div>
            </div>
            <div className="contacts">
               <button className="button"><i id='fotlog facebook' className="button__icon fab fa-facebook fa-2x">f</i></button>
               <button className="button"><i id='fotlog' className="button__icon fab fa-twitter ">VK</i></button>
               <button className="button"><i id='fotlog' className="button__icon fab fa-instagram ">TG</i></button>
            </div>

         </div>
      </div >
   )
}

export default Footer







