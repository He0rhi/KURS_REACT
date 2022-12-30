import { FC, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { CheckIsAuth, LogoutUser } from '../store/CreateAuth';
import { useAppDispatch, useAppSelector } from '../store/store';
import { Reset } from '../store/CreateProduct';
import { toast } from "react-toastify";

interface IHeader {
   count: number
}
const Header: FC<IHeader> = () => {
   const [state, setState] = useState<boolean>(false)
   const { user } = useAppSelector(state => state.auth);
   const dispatch = useAppDispatch();
   const isAuth = useAppSelector(CheckIsAuth);
   const [user_id, setUser_id] = useState<number>(user?.id_person)

   useEffect(() => { //Принимает функцию, которая содержит код.
      setUser_id(user?.id_person)
   }, [user]);


   const handleExit = () => {
      dispatch(LogoutUser())
      toast.warning("Вы вышли из системы")
      setState(false)
      dispatch(Reset())
   }
   
   const PathBasket = `/basket/:${user_id}`;
   const PathProfile = `/profile/:${user_id}`;
   return (
      <div className='header'>
         <div className="wrapper">
            <div className="burger">
               <div id="nav-icon1"
                  className={state ? 'open' : 'after'}
                  onClick={() => setState(!state)}>
                  {state ? <p>Закрыть</p>:<p>Меню</p>}
               </div>
            </div>
            <div className="logo">
              <Link to={'/'}> <img id='logo' src={require( "./Photo/hitech.png")}/></Link>
            </div>
            <nav
               className={state ? 'nav active' : 'nav'}
            >
               <ul>
                  <li
                  >
                     <Link to="/"
                        onClick={() => setState(false)}
                     >Главная</Link>
                  </li>
                 
                  <li>
                     <Link to={PathBasket}
                        onClick={() => setState(false)}>Корзина</Link>
                  </li>
                  <li>
                     <Link to={PathProfile}
                        onClick={() => setState(false)}>Кабинет</Link>
                  </li>
                  <li className='li_end'>
                     {isAuth
                        ?
                        <a
                           className='button_b'
                           onClick={() => {
                              handleExit();
                           }}
                        >
                           Выйти
                        </a>
                        :

                        <Link
                           onClick={() => setState(false)}
                           className='button_a'
                           to="/login">
                           Войти
                        </Link>




                     }
                  </li>
               </ul>
            </nav>
         </div>
      </div >
   )
}

export default Header