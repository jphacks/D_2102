import React, { useState, useEffect } from "react";
import { AppDispatch } from "../../app/store";

import { useSelector, useDispatch } from "react-redux";
import { RouteComponentProps } from "react-router-dom";
import App from "../../App";
import {
  selectStudentComment,
  selectTeacherComment,
  selectTextpearComments,
  fetchAsyncGetComment,
  fetchAsyncCreateVote,
  fetchAsyncGetTextpearComment,
} from "./commentSlice";
import { handleOpen } from "../auth/authSlice";

import styles from "./Comment.module.css";
import { makeStyles, Theme } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import { Button } from "@material-ui/core";
import IconButton from "@mui/material/IconButton";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";

const useStyles = makeStyles((theme: Theme) => ({
  button: {
    padding: theme.spacing(1.5, 3),
    margin: theme.spacing(2),
  },
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
  const textpearComments = useSelector(selectTextpearComments);

  const userType = localStorage.getItem("localUserTyoe");

  useEffect(() => {
    const fetchBootLoader = async () => {
      await dispatch(fetchAsyncGetComment(commentId));
      await dispatch(fetchAsyncGetTextpearComment(commentId));
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
              color={studentComment[0].voted ? "primary" : "default"}
              className={styles.comment__vote_button}
              aria-label="vote"
              onClick={() => {
                !studentComment[0].voted
                  ? dispatch(
                      fetchAsyncCreateVote({
                        commentId: studentComment[0].commentId,
                      })
                    )
                  : console.log("delete");
              }}
            >
              <AddCircleIcon />
            </IconButton>
            <div
              className={[
                styles.comment__vote_box,
                studentComment[0].voted && styles.comment__voted,
              ].join(" ")}
            >
              <p className={styles.comment__vote_number}>
                {studentComment[0].vote}
              </p>
              <p>知りたい！</p>
            </div>
            <p>{studentComment[0].commentContent}</p>
          </div>
          {userType === "teacher" && (
            <Button
              className={classes.button}
              variant="contained"
              size="small"
              color="primary"
              startIcon={<ChatBubbleIcon />}
              onClick={() => {
                dispatch(
                  handleOpen({
                    formNumber: 2,
                  })
                );
              }}
            >
              返信する
            </Button>
          )}
        </Paper>
        <h2 className={styles.comment__h2}>回答</h2>
        {teacherComment[0].commentId === 0 ? (
          <p>回答はまだありません</p>
        ) : (
          <>
            <Paper className={classes.paper}>
              <div className={styles.comment__head}>
                <p>{teacherComment[0].usersName}先生</p>
              </div>
              <div className={styles.comment__content_box}>
                <p>{teacherComment[0].commentContent}</p>
              </div>
            </Paper>
          </>
        )}
        {textpearComments[0].commentId !== 0 && (
          <>
            <h2 className={styles.comment__h2}>似ている投稿</h2>
            {textpearComments.map((textpearComment) => (
              <Paper className={classes.paper}>
                <div className={styles.comment__head}>
                  <div
                    className={[
                      styles.comment__answer,
                      textpearComment.isAnswered === "Answered"
                        ? styles.comment__answered
                        : styles.comment__not_answered,
                    ].join(" ")}
                  >
                    <p>
                      {textpearComment.isAnswered === "Answered"
                        ? "回答済み"
                        : "未回答"}
                    </p>
                  </div>
                  <div className={styles.comment__subject}>
                    <p>{textpearComment.subjectsName}</p>
                  </div>
                  <p>{textpearComment.createdAt}</p>
                </div>
                <div className={styles.comment__content_box}>
                  <p>{textpearComment.commentContent}</p>
                </div>
              </Paper>
            ))}
          </>
        )}
      </div>
    </App>
  );
};

export default Comment;
