import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import axios from "axios";
import {
  COMMENT_STATE,
  READ_COMMENT_STATE,
  POST_VOTE,
  RESPONSE_STATUS,
  READ_COMMENT,
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

export const fetchAsyncCreateVote = createAsyncThunk(
  "comment/createVote",
  async (vote: POST_VOTE) => {
    const res = await axios.post<RESPONSE_STATUS>(
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

export const fetchAsyncGetTextpearComment = createAsyncThunk(
  "comment/getTextpearComment",
  async (commentId: number) => {
    const res = await axios.get<READ_COMMENT[]>(
      `${process.env.REACT_APP_API_URL}/api/comment/textpear/${commentId}`,
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
  textpearComments: [
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
    builder.addCase(fetchAsyncCreateVote.fulfilled, (state) => {
      state.studentComment[0].vote = state.studentComment[0].vote + 1;
      state.studentComment[0].voted = !state.studentComment[0].voted;
    });
    builder.addCase(fetchAsyncCreateVote.rejected, () => {
      window.location.href = "/login";
    });
    builder.addCase(
      fetchAsyncGetTextpearComment.fulfilled,
      (state, action: PayloadAction<READ_COMMENT[]>) => {
        return {
          ...state,
          textpearComments:
            action.payload.length === 0
              ? initialState.textpearComments
              : action.payload,
        };
      }
    );
    builder.addCase(fetchAsyncGetTextpearComment.rejected, () => {
      window.location.href = "/login";
    });
  },
});

export const {} = commentSlice.actions;
export const selectStudentComment = (state: RootState) =>
  state.comment.studentComment;
export const selectTeacherComment = (state: RootState) =>
  state.comment.teacherComment;
export const selectTextpearComments = (state: RootState) =>
  state.comment.textpearComments;

export default commentSlice.reducer;
