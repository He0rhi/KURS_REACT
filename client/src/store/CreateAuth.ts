import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../axios";

interface IUser {
  user: any;
  auth: boolean;
  loading: boolean;
  message: string;
  token: string | null;
}

const initialState: IUser = {
  user: null,
  auth: false,
  loading: false,
  message: "",
  token: null,
};

export const RegisterUser = createAsyncThunk(
  "auth/register",
  async (formData: any) => {
    try {
      console.log(formData);
      const onUploudsProgress = (progressEvent: any) => {
        console.log(
          "Upload Progress: " +
            Math.round((progressEvent.loaded * 100) / progressEvent.total) +
            "%"
        );
      };
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },

        onUploadProgress: onUploudsProgress,
      };
      console.log(formData);
      const { data } = await axios.post("/auth/register", formData, config);
      console.log(data);

      if (data.token) {
        window.localStorage.setItem("token", data.token);
      }

      return data;
    } catch (error) {
      console.log(error);
    }
  }
);
export const LoginUser = createAsyncThunk(
  "auth/login",
  async ({ name, password }: { name: string; password: string }) => {
    try {
      const { data } = await axios.post("/auth/login", {
        name: name,
        password: password,
      });
      if (data.token) {
        window.localStorage.setItem("token", data.token);
      }
      console.log(data);
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);
export const GetMe = createAsyncThunk("auth/getme", async () => {
  try {
    const { data } = await axios.get("/auth/getme");

    return data;
  } catch (error) {
    console.log(error);
  }
});





export const authDef = createSlice({
  name: "auth",
  initialState,
  reducers: {
    LogoutUser: (state) => {
      state.user = null;
      state.auth = false;
      state.loading = false;
      state.message = "";
      state.token = null;
      window.localStorage.removeItem("token");
    },
    DeleteMessage: (state) => {
      state.message = "";
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(RegisterUser.fulfilled, (state: any, action: any) => {
      state.user = action.payload?.user;
      state.auth = true;
      state.loading = false;
      state.message = action.payload?.message;
      state.token = action.payload?.token;
    });
    builder.addCase(RegisterUser.pending, (state: any, action: any) => {
      state.loading = true;
    });
    builder.addCase(RegisterUser.rejected, (state: any, action: any) => {
      state.loading = false;
      state.message = action.payload.message;
    });
    builder.addCase(LoginUser.fulfilled, (state: any, action: any) => {
      state.user = action.payload?.user;
      state.auth = true;
      state.loading = false;
      state.message = action.payload?.message;
      state.token = action.payload?.token;
    });
    builder.addCase(LoginUser.pending, (state: any, action: any) => {
      state.loading = true;
    });
    builder.addCase(LoginUser.rejected, (state: any, action: any) => {
      state.loading = false;
      state.message = action.payload?.message;
    });
    builder.addCase(GetMe.fulfilled, (state: any, action: any) => {
      state.user = action.payload?.user;
      state.auth = true;
      state.loading = false;
      state.message = action.payload?.message;
      state.token = action.payload?.token;
    });
    builder.addCase(GetMe.rejected, (state: any, action: any) => {
      state.loading = false;
      state.message = action.payload?.message;
    });
    builder.addCase(GetMe.pending, (state: any) => {
      state.loading = true;
      state.message = "";
    });
   
   
   
  },
});
export const CheckIsAuth = (state: any) => Boolean(state.auth.token);
export const { LogoutUser, DeleteMessage } = authDef.actions;
export default authDef.reducer;
