import React, {  FC, useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../store/store';
import { GetOrders } from '../store/CreateProduct';
import Footer from './Footer';
const User: FC = () => {
   const { orders } = useAppSelector(state => state.product);
   const { id } = useParams();
   const { user } = useAppSelector(state => state.auth);
   
   const [order, setOrder] = useState<any[]>(orders);
   const [show, setShow] = useState<boolean>(false);
   const navigate = useNavigate();
   const dispatch = useAppDispatch();


   useEffect(() => {
      if (!user) {
         navigate('/login');
      }
   }, [user]);

   

  useEffect( () => {
      dispatch(GetOrders(id));
      setOrder(orders);
      setShow(!show);
   })


  

   
   return (
      <div className="animate">
         <div className='wrapper'>
            <h1 className='title-profile'>
               Профиль
            </h1>


           
            <div className="profile">
               
               <div className="information">
               
                  <div className="info_about_user">
                     <div className="name_info">
                        <p>
                           Имя:
                        </p>
                        <p>
                           Фамилия:
                        </p>
                        <p>
                           Количество товаров:
                        </p>

                     </div>
                     
                     <div className="value_info">
                        <p>
                           {user?.name || "No name"}
                        </p>
                        <p>
                           {user?.surname || "No surname"}
                        </p>
                        <p>
                           {
                              order.length
                           }
                        </p>




                     </div>
                  </div>
                  
               </div>




            </div>

            
               <div>

               <h1 className='title_my_orders'>
                  Покупки 
               </h1>
               
               <div className="wrapper bas">
                  <div className="basket">
                     {order?.map((item: any, index: any) => {
                        const { id_product, name, img, count, price, dateorders, id_buy, isbuy } = item;
                        return (
                           <div className="product" key={index}>
                              <div className="id">
                                 <p>{index + 1}</p>
                              </div>
                              <div className="img">
                                 <Link to={`/product/:${id_product}`}>
                                    <img src={img} alt="" />
                                 </Link>
                              </div>
                              <div className="name">
                                 <Link to={`/product/:${id_product}`}>
                                    <p>{name}</p>
                                 </Link>
                                 <p>Цена: {price}</p>
                                 <p>Количество: {count}</p> 

                                 



                              </div>

                           </div>
                        )
                     })}
                  </div>
               </div></div>
         </div>
         <Footer />
      </div >
   )
}
export default User;



