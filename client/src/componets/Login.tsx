import { ChangeEvent, FC, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";
import { DeleteMessage, LoginUser } from '../store/CreateAuth';
import { useAppDispatch, useAppSelector } from '../store/store';
import Footer from './Footer';

const Login: FC = () => {
   const { message, token } = useAppSelector(state => state.auth);
   const [name, setName] = useState<string>('');
   const [password, setPassword] = useState<string>('');
   const navigate = useNavigate();
   const dispatch = useAppDispatch();
   useEffect(() => {
      window.scrollTo(0, 0);
   }
      , []);
   useEffect(() => {
      if (message) {
         if (message === "Вы вошли в систему") toast.success(message);
         else {
            toast.error("Вы не вошли в систему")
         }
      }
      return () => {
         dispatch(DeleteMessage());
      }
   }, [message]);

   useEffect(() => {
      if (token) {
         navigate(`/`);
      }
   }, [token]);

   const Login = () => {
      if (name.trim() === "") {
         toast.error("Имя пустое");
         return;
      }
      if (password.trim() === "") {
         toast.error("Пароль пустой");
         return;
      }
      dispatch(LoginUser({ name, password }));
   }
   
   const TryNameRegexp = (e: ChangeEvent<HTMLInputElement>) => {
      const regexp = /^[a-zA-Zа-яА-Я ]+$/;
      const name = e.target.value;
      if (regexp.test(name)) {
         setName(name);
      }
      if (name === "") {
         setName(name);
      }
   }

   const TryPasswordRegexp = (e: ChangeEvent<HTMLInputElement>) => {
      const regexp = /^[a-zA-Z0-9]+$/;
      const password = e.target.value;
      if (regexp.test(password)) {
         setPassword(password);
      }
      if (password === "") {
         setPassword(password);
      }
   }

   return (
      <div className='animate'>
         <div className="wrapper">
            <div className="form">
               <h1 className="title">
                  Вход
               </h1>
               <div className="input">
                 
                  <input type="text" placeholder="Name"

                     value={name}
                     onChange={(e: ChangeEvent<HTMLInputElement>) => TryNameRegexp(e)}
                  />
                  
                  <input type="password" placeholder='Password'
                     value={password}
                     onChange={(e: ChangeEvent<HTMLInputElement>) => TryPasswordRegexp(e)}
                  />
               </div>
               <div className="message">
               </div>
               <p className='account'>
                  Если нет аккаунта, можете <Link to='/register'>зарегистрироваться</Link>
               </p>
               <div className="buttons">
                  <button
                     onClick={Login}>
                     Войти
                  </button>

               </div>
            </div>
         </div>
         < Footer />
      </div>
   )
}

export default Login 