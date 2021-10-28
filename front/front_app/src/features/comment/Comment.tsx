import React, { useEffect } from "react";
import { AppDispatch } from "../../app/store";

import { useSelector, useDispatch } from "react-redux";
import { RouteComponentProps } from "react-router-dom";
import App from "../../App";
import {
  selectStudentComment,
  selectTeacherComment,
  fetchAsyncGetComment,
} from "./commentSlice";

type CommentProps = RouteComponentProps<{
  commentId: string;
}>;

const Comment: React.FC<CommentProps> = (props) => {
  const commentId = props.match.params.commentId as unknown as number;
  const dispatch: AppDispatch = useDispatch();

  const studentComment = useSelector(selectStudentComment);
  const teacherComment = useSelector(selectTeacherComment);

  useEffect(() => {
    const fetchBootLoader = async () => {
      await dispatch(fetchAsyncGetComment(commentId));
    };
    fetchBootLoader();
  }, [dispatch, commentId]);

  return (
    <div>
      <App>コメント</App>
    </div>
  );
};

export default Comment;
