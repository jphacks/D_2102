import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import axios from "axios";
import {
  COMMENT_STATE,
  READ_COMMENT_STATE,
  POST_VOTE,
  REQUEST_STATUS,
} from "../types";

export const fetchAsyncGetComment = createAsyncThunk(
  "comment/getComment",
  async (commentId: number) => {
    const res = await axios.get<READ_COMMENT_STATE>(
      `${process.env.REACT_APP_API_URL}/api/comment/${commentId}`,
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

export const fetchAsyncCreateComment = createAsyncThunk(
  "comment/createVote",
  async (vote: POST_VOTE) => {
    const res = await axios.post<REQUEST_STATUS>(
      `${process.env.REACT_APP_API_URL}/api/votePost/`,
      vote,
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

const initialState: COMMENT_STATE = {
  studentComment: [
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
  teacherComment: [
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

export const commentSlice = createSlice({
  name: "comment",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      fetchAsyncGetComment.fulfilled,
      (state, action: PayloadAction<READ_COMMENT_STATE>) => {
        return {
          ...state,
          studentComment: action.payload.student,
          teacherComment:
            typeof action.payload.teacher === "undefined"
              ? initialState.teacherComment
              : action.payload.teacher,
        };
      }
    );
    builder.addCase(fetchAsyncGetComment.rejected, () => {
      window.location.href = "/login";
    });
    builder.addCase(fetchAsyncCreateComment.fulfilled, (state) => {
      state.studentComment[0].vote = state.studentComment[0].vote + 1;
      state.studentComment[0].voted = !state.studentComment[0].voted;
    });
    builder.addCase(fetchAsyncCreateComment.rejected, () => {
      window.location.href = "/login";
    });
  },
});

export const {} = commentSlice.actions;
export const selectStudentComment = (state: RootState) =>
  state.comment.studentComment;
export const selectTeacherComment = (state: RootState) =>
  state.comment.teacherComment;

export default commentSlice.reducer;
