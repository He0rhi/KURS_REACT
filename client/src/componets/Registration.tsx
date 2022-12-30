import { ChangeEvent, FC, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";
import { DeleteMessage, RegisterUser } from "../store/CreateAuth";
import { useAppDispatch, useAppSelector } from '../store/store';
import Footer from './Footer';
const Registration: FC = () => {

   const { message, auth, token, user } = useAppSelector(state => state.auth);
   const [name, setName] = useState<string>('');
   const [surname, setSurname] = useState<string>('');
   const [password, setPassword] = useState<string>('');
   const [SecPassw, setTwoPassword] = useState<string>('');
   const [messages, setMessage] = useState<string>('');
   const [image, setImage] = useState<any>(null);
   const [photoBool, setPhotoBool] = useState<boolean>(false);
   const dispatch = useAppDispatch();
   const navigate = useNavigate();

   useEffect(() => {
      window.scrollTo(0, 0);
   }
      , []);

      useEffect(() => {
         if (message) {
            if (message === "Регистрация прошла успешно!") toast.success(message);
            else {
               toast.error("Ошибка")
            }
         }
         return () => {
            dispatch(DeleteMessage());
         }
      }, [message]);

   useEffect(() => {
      if (token) {
         navigate(`/profile/:${user?.id_person}`);
      }
   }, [auth, token]);

   const RegistUser = () => {
      if (name.trim() === "") {
         setMessage("Пустое имя");
         toast.error("Пустое имя");
         return;
      }
      if (surname.trim() === "") {
         setMessage("Пустая фамилия");
         toast.error("Пустая фамилия");

         return;
      }
      if (password.trim() === "") {
         setMessage("Пустой пароль");
         toast.error("Пустой пароль");
      }
      if (password !== SecPassw) {
         setMessage("Пароли не совпадают");
         toast.error("Пароли не совпадают");
         return;
      }
     
      var formData = new FormData();
      formData.append("name", name);
      formData.append("surname", surname);
      formData.append("password", password);
      formData.append("image", image);
      const data = {
         name: formData.get("name"),
         surname: formData.get("surname"),
         password: formData.get("password"),
         image: formData.get("image")
      }
      dispatch(RegisterUser(data));
      setMessage("");
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

   const TrySurnameRegexp = (e: ChangeEvent<HTMLInputElement>) => {
      const regexp = /^[a-zA-Zа-яА-Я ]+$/;
      const surname = e.target.value;
      if (regexp.test(surname)) {
         setSurname(surname);
      }
      if (surname === "") {
         setSurname(surname);
      }
   }

   const TryPasswReg = (e: ChangeEvent<HTMLInputElement>) => {
      const regexp = /^[a-zA-Z0-9]+$/;
      const password = e.target.value;
      if (regexp.test(password)) {

         setPassword(password);
      }
      if (password === "") {
         setPassword(password);
      }
      
   }

   const TryPassw = (e: ChangeEvent<HTMLInputElement>) => {
      const regexp = /^[a-zA-Z0-9]+$/;
      const twoPassword = e.target.value;
      if (regexp.test(twoPassword)) {
         setTwoPassword(twoPassword);
      }
      if (twoPassword === "") {
         setTwoPassword(twoPassword);
      }
   }

   

   return (
      <div className='animate'>
         <div className="wrapper">
            <div className="form">
               <form
                  onSubmit={(e) => e.preventDefault()}>
                  <h1 className="title">
                     Регистрация
                  </h1>
                  <div className="input">
                    
                     <input type="text" placeholder="Имя"
                        value={name}
                        maxLength={20}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => TryNameRegexp(e)}
                     />

                     
                     <input type="text" placeholder="Фамилия"
                        value={surname}
                        maxLength={20}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => TrySurnameRegexp(e)}
                     />
                     
                     <input type="password" placeholder='Пароль'
                        value={password}
                        maxLength={40}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => TryPasswReg(e)
                        }
                     />

                     
                     <input type="password"

                        placeholder='Повторите пароль'
                        value={SecPassw}
                        maxLength={40}
                        onChange={(e: ChangeEvent<HTMLInputElement>) =>
                           TryPassw(e)
                        }
                     />
                     

                     
                  </div>
                 
                  <div className="message">
                     <p>
                     </p>
                  </div>
                  
                  <div className="buttons">
                     <button
                        onClick={RegistUser}
                     >
                        Зарегистрироваться
                     </button>

                  </div>
                  <p className='account'>
                     Если есть аккаунт, то можете <Link to='/login'>войти</Link>
                  </p>


               </form>
            </div>

         </div>
        
         < Footer />
      </div>
   )
}
export default Registration;
