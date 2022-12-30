import React, {  FC, useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { toast } from "react-toastify";

import { AddBasket, getProduct } from '../store/CreateProduct';
import { GetProducts } from '../store/CreateProduct';
import { useAppDispatch, useAppSelector } from '../store/store';
import Footer from './Footer';
import Forms from './Forms';




const ProductInfo: FC = () => {
   const { id } = useParams();
   const id_product = Number(id);
   const { productID, product } = useAppSelector(state => state.product);
   const { user } = useAppSelector(state => state.auth);
   const [value, setValue] = useState<string>("")
   const [edit, setEdit] = useState<boolean>(false)
   const [products, setProducts] = useState<any>(product)
   const [productOne, setProductOne] = useState<any>(productID);
   const [editId, setEditId] = useState<string>("")
   const [date, setDate] = useState<any>("")
   const [name, setName] = useState<string>("")
   const [boolName, setBoolName] = useState<boolean>(false)
   const [FormBool, setFormBool] = useState<boolean>(false)
   const navigate = useNavigate();
   const dispatch = useAppDispatch()

   useEffect(() => {
      window.scrollTo(0, 0);
      dispatch(getProduct(id));
      dispatch(GetProducts())
   }, []);
   const commentRef = React.createRef<any>();

   const ScrollDown = () => {
      commentRef.current.scrollTo(0, commentRef.current.scrollHeight);
   }
   useEffect(() => {
      setProductOne(productID);
   }, [productID]);
   useEffect(() => {
      dispatch(getProduct(id));
      dispatch(GetProducts())
   }, [id]);
   
   useEffect(() => {
      setProducts(product)
   }, [product]
   )
   useEffect(() => {
      if (!user) {
         navigate('/login');
      }
   }, [user]);
   const changeBool = (value: boolean) => {
      setFormBool(value)

   }
  
   
   const handleEdit = (item: any, date: any) => {
      setEditId(item.id_comment)
      setEdit(true)
      setValue(item.description)
      setDate(date)

   }
   const handleBuyOrder = (item: any) => {
      setFormBool(true)

   }

   
   const AddToBasket = (item: any) => {
      if (item.count === item.count_in_shop) {
         alert("Товар закончился")
      }
      else {

         const basket = {
            id_product: item.id_product,
            id_person: user?.id_person,
            count: item.count
         }


         console.log(basket)
         dispatch(AddBasket(basket))
         toast.success(`Товар ${item.name} добавлен в корзину`)

      }
   }
  
   
   return (
      <div className='animate'>
         <div className="wrapper product_fulss">
            <div className="block_img">
            <h1 className="title">
                  {productID?.name}
               </h1>
               <img src={productOne?.img} alt="" />
            </div>
            <div className="block_info">
               
               <div className="description_full">
                  {productID?.sale !== 0 ? (<p>Скидка: <span>{productID?.sale}%</span> </p>) : (
                     <></>
                  )}
                  <p>Категория: <span>{productID?.category}</span> </p>
                  <p>Год выпуска: <span>{productID?.years}</span> </p>
                  <p className='color'>Цвет:
                     <span className="block"
                         >{productID?.color}
                     </span> </p>
                  <p>Цена: <span>{productID?.price}$</span> </p>
                  <p>Описание: <span>{productID?.description}</span> </p>
               </div>
               <div  className="block_buttons">
                  <button  onClick={() => AddToBasket(productID)} ><p id='categ'>Добавить в корзину</p></button>
                  <button onClick={() => handleBuyOrder(productID)}><p id='categ'>Купить</p></button>

               </div>
               
            </div>
         </div>
         {
            FormBool && <Forms changeBool={changeBool}
               products={[productID]}
               cost={productOne?.price}
            />
         }
         
         <Footer />
      </div >
   )
}
export default ProductInfo