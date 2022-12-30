import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import authDef from "./CreateAuth";
import productSlice from "./CreateProduct";


const store = configureStore({
   reducer: {
      auth: authDef,
      product: productSlice
   },
});


export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch; //dispatch - изменение состояния
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
