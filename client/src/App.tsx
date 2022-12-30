import { lazy, Suspense, useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Error from './componets/Error';
import Loading from './componets/Loading';
import Navbar from './componets/Header';
import './css/index.css';
import "@reduxjs/toolkit";
import { CheckIsAuth, GetMe } from './store/CreateAuth';
import { GetBasket } from './store/CreateProduct';
import { useAppDispatch, useAppSelector } from './store/store';
const Home = lazy(() => import('./componets/Home'));
const Product = lazy(() => import('./componets/Product'));
const Basket = lazy(() => import('./componets/Basket'));
const ProductInfo = lazy(() => import('./componets/ProductInfo'));
const Registration = lazy(() => import('./componets/Registration'));
const Login = lazy(() => import('./componets/Login'));
const Profile = lazy(() => import('./componets/User'));
function App() {
  const dispatch = useAppDispatch();
  const isAuth = useAppSelector(CheckIsAuth);
  const { token, user } = useAppSelector(state => state.auth);
  const { basket_length } = useAppSelector(state => state.product);
  const [count, setCount] = useState<number>(basket_length);
  useEffect
    (() => {
      document.title = "WebShop"
      dispatch(GetMe())
    }, [])
  useEffect(() => {
    dispatch(GetBasket(`: ${user?.id_person}`))
    setCount(basket_length)
    return () => {
      setCount(0)
    }
  }, [basket_length]);
  useEffect(() => {
    dispatch(GetBasket(`: ${user?.id_person}`))
    setCount(basket_length)
    return () => {
      setCount(0)
    }
  }, [user]);

  //fallback-Резервное дерево реакции, отображаемое, когда дочерний элемент приостановки (например, React.lazy) приостанавливает
  //React.lazy-Функция позволяет отображать динамический импорт как обычный компонент. 
  //Это автоматически загрузит пакет, содержащий Loading при первом отображении этого компонента.
  return (

    <div className="App">
      <BrowserRouter>
        <Navbar count={count} /> 
        <Suspense fallback={<Loading />}> 
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/basket/:id" element={<Basket />} />
            <Route path="/product" element={<Product />} />
            <Route path="/product/:id" element={<ProductInfo />} />
            <Route path="/register" element={<Registration />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profile/:id" element={<Profile />} />
            <Route path="*" element={<Error />} />
          </Routes>
        </Suspense>
        <ToastContainer position="bottom-center" />
      </BrowserRouter>

    </div>
  );
}
export default App;

