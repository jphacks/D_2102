import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import axios from "axios";
import { CRED, JWT, AUTH_STATE, USER, READ_SUBJECT } from "../types";

export const fetchAsyncLogin = createAsyncThunk(
  "auth/login",
  async (auth: CRED) => {
    const res = await axios.post<JWT>(
      `${process.env.REACT_APP_API_URL}/api/login`,
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

export const fetchAsyncGetUser = createAsyncThunk("auth/getUser", async () => {
  const res = await axios.get<USER[]>(
    `${process.env.REACT_APP_API_URL}/api/user/`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `${localStorage.localJWT}`,
      },
    }
  );
  return res.data;
});

const initialState: AUTH_STATE = {
  loginUser: {
    usersId: 0,
    schoolsId: 0,
    usersName: "",
    usersLoginId: "",
    schoolsName: "",
    studentGroupName: "",
    studentGroupGrade: 0,
    studentGroupId: 0,
  },
  subjects: [{ subjectsName: "", subjectsId: 0 }],
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      fetchAsyncLogin.fulfilled,
      (state, action: PayloadAction<JWT>) => {
        localStorage.setItem("localJWT", action.payload.Authorization);
        action.payload.Authorization && (window.location.href = "/home");
      }
    );
    builder.addCase(
      fetchAsyncGetUser.fulfilled,
      (state, action: PayloadAction<USER[]>) => {
        return {
          ...state,
          loginUser: action.payload[0],
        };
      }
    );
    builder.addCase(fetchAsyncGetUser.rejected, () => {
      window.location.href = "/login";
    });
  },
});

export const selectLoginUser = (state: RootState) => state.auth.loginUser;

export default authSlice.reducer;
