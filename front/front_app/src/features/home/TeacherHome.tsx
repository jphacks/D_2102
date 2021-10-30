import React, { useEffect } from "react";
import { AppDispatch } from "../../app/store";
import { useSelector, useDispatch } from "react-redux";
import {
  selectComments,
  fetchAsyncGetNotAnsweredComment,
} from "./teacherHomeSlice";

import { makeStyles, Theme } from "@material-ui/core/styles";
import styles from "./TeacherHome.module.css";
import { Link } from "react-router-dom";
import Paper from "@material-ui/core/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";

const useStyles = makeStyles((theme: Theme) => ({}));

const TeacherHome: React.FC = () => {
  const classes = useStyles();
  const dispatch: AppDispatch = useDispatch();

  const comments = useSelector(selectComments);

  useEffect(() => {
    const fetchBootLoader = async () => {
      await dispatch(fetchAsyncGetNotAnsweredComment());
    };
    fetchBootLoader();
  }, [dispatch]);

  return (
    <div>
      <h2 className={styles.teacher_home__h2}>未回答の質問</h2>
      <Paper>
        <TableContainer>
          <Table>
            <TableBody>
              {comments.map((comment, i) => (
                <TableRow key={i} hover>
                  <Link
                    to={"/comment/" + comment.commentId}
                    className={styles.teacher_home__nav}
                  >
                    <TableCell>{comment.vote}知りたい！</TableCell>
                    <TableCell>
                      {comment.isAnswered === "Answered"
                        ? "回答済み"
                        : "未回答"}
                    </TableCell>
                    <TableCell>{comment.createdAt}</TableCell>
                    <TableCell>{comment.subjectsName}</TableCell>
                    <TableCell>{comment.commentContent}</TableCell>
                  </Link>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </div>
  );
};

export default TeacherHome;
