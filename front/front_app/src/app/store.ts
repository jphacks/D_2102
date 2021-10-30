import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterSlice";
import authReducer from "../features/auth/authSlice";
import studentHomeReducer from "../features/home/studentHomeSlice";
import teacherHomeReducer from "../features/home/teacherHomeSlice";
import commentReducer from "../features/comment/commentSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    studentHome: studentHomeReducer,
    teacherHome: teacherHomeReducer,
    comment: commentReducer,
    counter: counterReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export type AppDispatch = typeof store.dispatch;
