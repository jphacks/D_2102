import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import axios from "axios";
import { LOGIN_USER, CRED, JWT } from "../types";

export const fetchAsyncLogin = createAsyncThunk(
  "auth/login",
  async (auth: CRED) => {
    const res = await axios.post<JWT>(
      `${process.env.REACT_APP_API_URL}/authen/jwt/create`,
      auth,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return res.data;
  }
);

const initialState: LOGIN_USER = {
  id: 0,
  userName: "",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      fetchAsyncLogin.fulfilled,
      (state, action: PayloadAction<JWT>) => {
        localStorage.setItem("localJWT", action.payload.access);
        action.payload.access && (window.location.href = "/student/");
      }
    );
  },
});

export default authSlice.reducer;
