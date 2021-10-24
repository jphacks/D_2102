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

export const fetchAsyncGetSubject = createAsyncThunk(
  "auth/getSubject",
  async () => {
    const res = await axios.get<READ_SUBJECT[]>(
      `${process.env.REACT_APP_API_URL}/api/subject/`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `${localStorage.localJWT}`,
        },
      }
    );
    return res.data;
  }
);

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
  modalState: {
    modalOpen: false,
  },
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    handleClose: (state) => {
      state.modalState.modalOpen = false;
    },
    handleOpen: (state) => {
      state.modalState.modalOpen = true;
    },
  },
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
    builder.addCase(
      fetchAsyncGetSubject.fulfilled,
      (state, action: PayloadAction<READ_SUBJECT[]>) => {
        return {
          ...state,
          subjects: action.payload,
        };
      }
    );
    builder.addCase(fetchAsyncGetSubject.rejected, () => {
      window.location.href = "/login";
    });
  },
});

export const { handleClose, handleOpen } = authSlice.actions;
export const selectLoginUser = (state: RootState) => state.auth.loginUser;
export const selectSubjects = (state: RootState) => state.auth.subjects;
export const selectModalState = (state: RootState) => state.auth.modalState;

export default authSlice.reducer;
