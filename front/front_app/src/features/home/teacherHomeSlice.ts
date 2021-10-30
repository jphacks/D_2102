import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import axios from "axios";
import { TEACHER_HOME_STATE, READ_COMMENT } from "../types";

export const fetchAsyncGetNotAnsweredComment = createAsyncThunk(
  "studentHome/getNotAnsweredComment",
  async () => {
    const res = await axios.get<READ_COMMENT[]>(
      `${process.env.REACT_APP_API_URL}/api/teacher/comment/notAnswered/`,
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

const initialState: TEACHER_HOME_STATE = {
  comments: [
    {
      commentId: 0,
      subjectsId: 0,
      usersName: null,
      vote: 0,
      voted: false,
      subjectsName: "",
      commentContent: "",
      isAnswered: "",
      createdAt: "",
      commentIsAnswered: 0,
    },
  ],
};

export const teacherHomeSlice = createSlice({
  name: "teacherHome",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      fetchAsyncGetNotAnsweredComment.fulfilled,
      (state, action: PayloadAction<READ_COMMENT[]>) => {
        return {
          ...state,
          comments: action.payload,
        };
      }
    );
    builder.addCase(fetchAsyncGetNotAnsweredComment.rejected, () => {
      window.location.href = "/login";
    });
  },
});

export const {} = teacherHomeSlice.actions;

export const selectComments = (state: RootState) => state.teacherHome.comments;

export default teacherHomeSlice.reducer;
