import React, { useState, useEffect } from "react";
import { AppDispatch } from "../../app/store";

import { useSelector, useDispatch } from "react-redux";
import { RouteComponentProps } from "react-router-dom";
import App from "../../App";
import {
  selectStudentComment,
  selectTeacherComment,
  fetchAsyncGetComment,
  fetchAsyncCreateComment,
} from "./commentSlice";

import styles from "./Comment.module.css";
import { makeStyles, Theme } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import IconButton from "@mui/material/IconButton";
import AddCircleIcon from "@mui/icons-material/AddCircle";

const useStyles = makeStyles((theme: Theme) => ({
  paper: {
    padding: theme.spacing(3),
    marginBottom: theme.spacing(8),
  },
}));

type CommentProps = RouteComponentProps<{
  commentId: string;
}>;

const Comment: React.FC<CommentProps> = (props) => {
  const commentId = props.match.params.commentId as unknown as number;
  const classes = useStyles();
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
    <App>
      <div className={styles.comment__wrap}>
        <Paper className={classes.paper}>
          <div className={styles.comment__head}>
            <div
              className={[
                styles.comment__answer,
                studentComment[0].isAnswered === "Answered"
                  ? styles.comment__answered
                  : styles.comment__not_answered,
              ].join(" ")}
            >
              <p>
                {studentComment[0].isAnswered === "Answered"
                  ? "回答済み"
                  : "未回答"}
              </p>
            </div>
            <div className={styles.comment__subject}>
              <p>{studentComment[0].subjectsName}</p>
            </div>
            <p>{studentComment[0].createdAt}</p>
          </div>
          <div className={styles.comment__content_box}>
            <IconButton
              color="primary"
              className={styles.comment__vote_button}
              aria-label="vote"
              onClick={() => {
                !studentComment[0].voted
                  ? dispatch(
                      fetchAsyncCreateComment({
                        commentId: studentComment[0].commentId,
                      })
                    )
                  : console.log("delete");
              }}
            >
              <AddCircleIcon />
            </IconButton>
            <div className={styles.comment__vote_box}>
              <p className={styles.comment__vote_number}>
                {studentComment[0].vote}
              </p>
              <p>知りたい！</p>
            </div>
            <p>{studentComment[0].commentContent}</p>
          </div>
        </Paper>
        <h2 className={styles.comment__h2}>回答</h2>
        {teacherComment[0].commentId === 0 ? (
          <p>回答はまだありません</p>
        ) : (
          <>
            <Paper className={classes.paper}>
              <div className={styles.comment__head}>
                <p>下村芽生先生</p>
              </div>
              <div className={styles.comment__content_box}>
                <p>{teacherComment[0].commentContent}</p>
              </div>
            </Paper>
          </>
        )}
      </div>
    </App>
  );
};

export default Comment;
