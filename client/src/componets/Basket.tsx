import { FC, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { AppDispatch, useAppSelector } from '../store/store';
import { AddBasket, DeleteAllBasket, DeleteBasket, GetBasket } from './../store/CreateProduct';
import Footer from './Footer';
import Forms from './Forms';

const Basket: FC = () => {
   const { id } = useParams();
   const { basket, sum } = useAppSelector(state => state.product);
   const { user } = useAppSelector(state => state.auth);
   const [state, setState] = useState<any>([])
   const [FormBool, setFormBool] = useState<boolean>(false)

   const dispatch = useDispatch<AppDispatch>();
   const navigate = useNavigate();
   useEffect(() => {
      setState(basket)
      dispatch(GetBasket((id)));
   }, [basket]);
   useEffect(() => {
      window.scrollTo(0, 0);
      dispatch(GetBasket((id)));
      setState(basket)
   }, []);

   useEffect(() => {
      if (!user) {
         navigate('/login');
      }
   }, [user]);

   const DeleteBasketAll = () => dispatch(DeleteAllBasket(Number(user?.id_person)))

   const changeBool = (value: boolean) => setFormBool(value)

   const handleBuyOrder = () => setFormBool(true)

   const AddToBasket = (item: any) => {

      const basket = {
         id_product: Number(item.id_product),
         id_person: Number(user?.id_person),
         count: Number(item.count)
      }
      dispatch(AddBasket(basket))

   }
   const DeleteToBasket = (item: any) => {
      const basket = {
         id_product: Number(item.id_product),
         id_person: Number(user?.id_person),
         id_basket: Number(item.id_basket)
      }
      dispatch(DeleteBasket(basket))
   }

   return (
      <div
         className='animate'>
         {state?.length === 0 ? (<div className="empty">
            <p>Карзина пуста,<Link to="/product"> заполните ее</Link></p>
         </div>) : (
            <>            <h1 className='title_basket'>
            </h1>
               <button
                  className='button_delete_all'
                  onClick={DeleteBasketAll}
               >Очистить</button>
               <p className="count_products">
                  <span> Товаров: {state?.length || 0}</span>  
               </p>
               <div className="wrapper bas noselect">
               <div className="title_list ">
                     <p>Всего: {sum} $</p>
                     <button id='kupit'  onClick={() => handleBuyOrder()}>Оформить</button>

                  </div>
                  <div className="basket">
                     {state?.map((item: any, index: any) => {
                        const { id_product, name, img, count } = item;
                        return (
                           <div className="product" key={index}>
                              
                              <div className="img">
                                 <div className='name'>
                              <Link to={`/product/:${id_product}`}>
                                    <p>{name}</p>
                                 </Link></div>
                                 <Link to={`/product/:${id_product}`}>
                                  <div className='backet_img' ></div>  <img id='backet_img' src={img} alt="" />
                                 </Link>
                                 
                              </div>
                              
                              <div className="buttons_add_del">
                                 <button id='plus' className='add' onClick={() => AddToBasket(item)}>+</button>
                                 <p className='count'><p>{count || 0}</p></p>
                                 <button className='add' id='minus'
                                    onClick={() => DeleteToBasket(item)}
                                 >-</button>
                              </div>
                           </div>
                        )
                     })}
                  </div>

                  
               </div>
               {FormBool && <Forms changeBool={changeBool} cost={sum}
                  products={state}
               />}
            </>
         )}
         <Footer />
      </div>
   )
}
export default Basket