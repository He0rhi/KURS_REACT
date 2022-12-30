import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import axios from "../axios";
import {
  IProduct,
  IProductInterface,
  IAddBasket,
  IOrder,
  IOrderUpdate,
  IDeleteBasket,
} from "../interface/interface";

const initialState: IProductInterface = {
  product:[],
  productID: {} as IProduct,
  message: null,
  loading: false,
  sum: 0,
  basket: [],
  basket_length: 0,
  orders: [],
};

export const GetProducts = createAsyncThunk("product/getProducts", async () => {
  try {
    const { data } = await axios.get("/product/getproducts");
    return data;
  } catch (error) {
    console.log(error);
  }
});
export const getProduct = createAsyncThunk(
  "product/getProduct",
  async (id: string | undefined) => {
    try {
      const { data } = await axios.get(`/product/getproduct/${id}`);

      return data;
    } catch (error) {
      console.log(error);
    }
  }
);







export const AddBasket = createAsyncThunk(
  "product/addBasket",
  async (basket: IAddBasket) => {
    try {
      const { id_product, id_person, count } = basket;
      const { data } = await axios.post("/product/addbasket", {
        id_product,
        id_person,
        count,
      });

      return data;
    } catch (error) {
      console.log(error);
    }
  }
);
export const GetBasket = createAsyncThunk(
  "product/getBasket",
  async (id: string | undefined) => {
    try {
      const { data } = await axios.get(`/product/getbasket/${id}`);
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const DeleteBasket = createAsyncThunk(
  "product/deleteBasket",
  async (basket: IDeleteBasket) => {
    try {
      const { id_product, id_person, id_basket } = basket;
      const { data } = await axios.delete("/product/deletebasket", {
        data: {
          id_product,
          id_person,
          id_basket,
        },
      });

      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const AddOrder = createAsyncThunk(
  "product/addOrder",
  async (order: IOrder) => {
    try {
      const { id_person, id_product, count, dateorders, mobile, gmail, place } =
        order;
      const { data } = await axios.post("/product/addorder", {
        id_person,
        id_product,
        count,
        dateorders,
        mobile,
        gmail,
        place,
      });

      return data;
    } catch (error) {
      console.log(error);
    }
  }
);
export const GetOrders = createAsyncThunk(
  "product/getOrders",
  async (id: string | undefined) => {
    try {
      const { data } = await axios.get(`/product/getorders/${id}`);

      return data;
    } catch (error) {
      console.log(error);
    }
  }
);
export const DeleteAllBasket = createAsyncThunk(
  "product/deleteAllBasket",
  async (id_person: number) => {
    try {
      const { data } = await axios.delete("/product/deleteallbasket", {
        data: {
          id_person,
        },
      });

      return data;
    } catch (error) {
      console.log(error);
    }
  }
);
export const GetTopPersons = createAsyncThunk(
  "product/getTopPersons",
  async () => {
    try {
      const { data } = await axios.get("/product/gettoppersons");

      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const UpdateOrder = createAsyncThunk(
  "product/UpdateOrder",
  async (order: IOrderUpdate) => {
    try {
      const { id_buy, isbuy, id_person } = order;
      const { data } = await axios.put("/product/updateorder", {
        id_buy,
        isbuy,
        id_person,
      });

      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    Reset: (state) => {
      state.product = [];
      state.product = [];
      state.basket = [];
      state.basket_length = 0;
      state.orders = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(GetProducts.pending, (state) => {
      state.loading = true;
      state.message = "";
    });
    builder.addCase(GetProducts.fulfilled, (state, action) => {
      state.loading = false;
      state.product = Array.from(action.payload);
    });
    builder.addCase(GetProducts.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(getProduct.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getProduct.fulfilled, (state, action) => {
      state.loading = false;
      state.productID = action.payload;
    });
    builder.addCase(getProduct.rejected, (state) => {
      state.loading = false;
    });
   
    builder.addCase(AddBasket.fulfilled, (state, action) => {
      state.message = action.payload;
      state.basket_length = action.payload.length || 0;
    });
    builder.addCase(GetBasket.fulfilled, (state, action) => {
      state.basket = action.payload;
      const Arrays = action.payload;
      state.basket_length = action.payload?.length || 0;
      let sum = 0;
      for (let i = 0; i < Arrays.length; i++) {
        sum += Arrays[i].count * Arrays[i].price;
      }
      state.sum = sum || 0;
    });
    builder.addCase(DeleteBasket.fulfilled, (state, action) => {
      state.message = action.payload;
      state.basket_length = action.payload.length || 0;
    });
    builder.addCase(AddOrder.fulfilled, (state, action) => {
      state.orders = action.payload;
    });
    builder.addCase(GetOrders.fulfilled, (state, action) => {
      state.orders = action.payload;
    });
    builder.addCase(DeleteAllBasket.fulfilled, (state, action) => {
      state.basket = [];
      state.basket_length = 0;
    });
    
  },
});
export const { Reset } = productSlice.actions;
export default productSlice.reducer;
