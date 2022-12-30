import { ChangeEvent, FC, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { AddOrder } from './../store/CreateProduct';
import { useAppDispatch, useAppSelector } from "../store/store";

interface IProps {
   changeBool: (n: boolean) => void;
   cost: number;
   products: any | undefined;
}
const Forms: FC<IProps> = ({ changeBool, cost, products }) => {
   const [state, setState] = useState<number>(0);
   const [dissabled, setDissabled] = useState<boolean>(true);
   const [name, setName] = useState<string>("")
   const [surname, setSurname] = useState<string>("");
   const [age, setAge] = useState<string>("");
   const [mobile, setMobile] = useState<string>("");
   const [gmail, setGmail] = useState<string>("");
   const [password, setPassword] = useState<string>("");
   const { user } = useAppSelector((state: any): any => state.auth);
   const [country, setCountry] = useState<string>("")
   const [addres, setAdress] = useState<string>("")
   const [house, setHouse] = useState<string>("")
   const dispatch = useAppDispatch();

   const handleClick = (product: any) => {
      for (let i = 0; i < product.length; i++) {
         const order = {
            id_person: user.id_person,
            id_product: product[i].id_product,
            count: product[i].count,
            dateorders: `${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`,
            mobile: mobile,
            gmail: gmail,
            place: `${country} ${addres} ${house}`
         }
         dispatch(AddOrder(order));
      }
      toast.success(`Вы оформили ${product.length} ${product.length == 1 ? "товар" : product.length >= 2 || product.length <= 4 ? "товара" : "товаров"}`);
      changeBool(false);
   };
   useEffect(() => {
      setCountry("Belarus")
   }, [])

   useEffect(() => {
      if (surname.trim() === "" || name.trim() === "" || mobile.trim() === "") {
         FuncDissabled(true);
      }

      else {
         FuncDissabled(false);
      }
   }, [name, surname, age, mobile, gmail, password])
   useEffect(() => {
      if (user) {
         setName(user?.name);
         setSurname(user?.surname);
      }
   }, [])

   useEffect(() => {
      if (mobile.length === 13) {
         setMobile(mobile.slice(0, 4) + " (" + mobile.slice(4, 6) + ") " + mobile.slice(6, 9) + "-" + mobile.slice(9, 11) + "-" + mobile.slice(11, 13))
      }

   }, [mobile])

   const TryMobile = (e: ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      if (value.match(/^[0-9+]+$/)) {

         if (value.length <= 13) {
            setMobile(value);
         }


      }
      else {
         setMobile(value.slice(0, value.length - 1))
      }

   }

   const TryEmail = (e: ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
       if (value.length <= 30) {
            setGmail(value);
         }
      
      else {
         setGmail(value.slice(0, value.length - 1))
      }
   }


   const FuncDissabled = (n: boolean) => {
      setDissabled(n)
   }

   const CheckEsc = (e: any) => {
      if (e.key === "Escape") {
         changeBool(false);
      }
   }

   useEffect(() => {
      window.addEventListener("keydown", CheckEsc);
      return () => {
         window.removeEventListener("keydown", CheckEsc);
      }
   }, []);

   return (
      <div className="onsova_form">

         <div className="froms">

            <div className="osnova_form">

               <div className="form_pages">

                  <input
                     type="text"
                     placeholder="Имя"
                     value={name}
                     className="input_form"
                     onChange={(e: ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
                  />


                  <input
                     type="phone"
                     placeholder="Телефон"
                     value={mobile}

                     onChange={(e: ChangeEvent<HTMLInputElement>) => {
                        TryMobile(e)
                     }}

                     maxLength={13} />

                  <input
                     type="text"
                     placeholder="Email"
                     value={gmail}
                     onChange={(e: ChangeEvent<HTMLInputElement>) => TryEmail(e)}
                  />


               </div>


               <div className="form_pages two">
                  <h1>Пункт выдачи</h1>
                  <select>
                     <option value="Denis">ул. Денисовская, 8 (ТЦ «Корона-Сити»)</option>
                     <option value="Korzh">ул. Корженевского, 26 (ТЦ "Корона")</option>
                     <option value="Nezav">пр. Независимости, 154 (ТЦ "Корона")</option>
                  </select>
                  <div>
                  </div>
               </div >
               <div className="form_pages tree">
                  <div className="block">
                     {products?.length === 1 ? <>
                        {products?.map((item: any) => {
                           const { img, name, price, count } = item;
                           return (
                              <div className="block_buy" key={name}>
                                 <img src={img} alt="" />
                                 <p>{name}</p>
                                 <p>{price}$</p>
                                 <p>{count}</p>
                              </div>
                           )
                        })}</> : (
                        <>{products?.map((item: any) => {
                           const { img, name, price, count } = item;
                           return (
                              <div className="block_buy" key={name}>
                                 <img src={img} alt="" />
                                 <p>{name}</p>
                                 <p>{price}$</p>
                                 <p>{count}</p>
                              </div>
                           )
                        })}</>
                     )}
                  </div>
                  <div >
                     <button id='kupit' className="buyblock" onClick={() => handleClick(products)}>Купить</button>

                  </div>

               </div >
               <div className="close" onClick={() => changeBool(false)}>

                  <span>Отменить оформление</span>
               </div>
            </div>

         </div>
      </div>
   );
};
export default Forms;