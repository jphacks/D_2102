import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import axios from "axios";
import {
  READ_COMMENT_NEWS,
  READ_NEWS,
  READ_COMMENT,
  STUDENT_HOME_STATE,
} from "../types";

export const fetchAsyncGetCommentNews = createAsyncThunk(
  "studentHome/getCommentNews",
  async () => {
    const res = await axios.get<READ_COMMENT_NEWS[]>(
      `${process.env.REACT_APP_API_URL}/api/commentNews/`,
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

export const fetchAsyncGetNews = createAsyncThunk(
  "studentHome/getNews",
  async () => {
    const res = await axios.get<READ_NEWS[]>(
      `${process.env.REACT_APP_API_URL}/api/news/`,
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

export const fetchAsyncGetComment = createAsyncThunk(
  "studentHome/getComment",
  async () => {
    const res = await axios.get<READ_COMMENT[]>(
      `${process.env.REACT_APP_API_URL}/api/comment/`,
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

const initialState: STUDENT_HOME_STATE = {
  commentNews: [
    {
      usersName: "",
      commentId: 0,
      subjectsName: "",
      createdAt: "",
    },
  ],
  news: [
    {
      newsId: 0,
      studentGroupId: 0,
      userName: "",
      newsSubject: "",
      newsText: "",
      isRead: "",
      createdAt: "",
    },
  ],
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

export const studentHomeSlice = createSlice({
  name: "studentHome",
  initialState,
  reducers: {
    addComment(state, action: PayloadAction<READ_COMMENT>) {
      state.comments = [...state.comments, action.payload];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      fetchAsyncGetCommentNews.fulfilled,
      (state, action: PayloadAction<READ_COMMENT_NEWS[]>) => {
        return {
          ...state,
          commentNews: action.payload,
        };
      }
    );
    builder.addCase(fetchAsyncGetCommentNews.rejected, () => {
      window.location.href = "/login";
    });
    builder.addCase(
      fetchAsyncGetNews.fulfilled,
      (state, action: PayloadAction<READ_NEWS[]>) => {
        return {
          ...state,
          news: action.payload,
        };
      }
    );
    builder.addCase(fetchAsyncGetNews.rejected, () => {
      window.location.href = "/login";
    });
    builder.addCase(
      fetchAsyncGetComment.fulfilled,
      (state, action: PayloadAction<READ_COMMENT[]>) => {
        return {
          ...state,
          comments: action.payload,
        };
      }
    );
    builder.addCase(fetchAsyncGetComment.rejected, () => {
      window.location.href = "/login";
    });
  },
});

export const { addComment } = studentHomeSlice.actions;
export const selectCommentNews = (state: RootState) =>
  state.studentHome.commentNews;
export const selectNews = (state: RootState) => state.studentHome.news;
export const selectComments = (state: RootState) => state.studentHome.comments;

export default studentHomeSlice.reducer;
