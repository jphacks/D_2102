import React, { useEffect } from "react";
import { AppDispatch } from "../../app/store";
import { useSelector, useDispatch } from "react-redux";
import {
  selectCommentNews,
  selectNews,
  selectComments,
  fetchAsyncGetCommentNews,
  fetchAsyncGetNews,
  fetchAsyncGetComment,
} from "./studentHomeSlice";

import { Link } from "react-router-dom";
import styles from "./StudentHome.module.css";
import { makeStyles, Theme } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import CreateIcon from "@mui/icons-material/Create";
import { Button, Modal } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) => ({
  button: {
    padding: theme.spacing(1.5, 3),
    margin: theme.spacing(3, 0),
  },
  icon: {
    padding: theme.spacing(0, 1, 0, 0),
  },
  new: {
    marginTop: theme.spacing(2),
  },
  paper: {
    minHeight: 250,
  },
}));

const StudentHome: React.FC = () => {
  const classes = useStyles();
  const dispatch: AppDispatch = useDispatch();

  const commentNews = useSelector(selectCommentNews);
  const news = useSelector(selectNews);
  const comments = useSelector(selectComments);

  const n = 5;
  const displayCommentNews = commentNews.slice(0, n);
  const displayNews = news.slice(0, n);
  const displasyComments = comments.slice(0, n);

  const maxLen = 200;
  const omit = (text: string) => {
    if (text.length > maxLen) {
      return text.substr(0, maxLen) + "...";
    } else {
      return text;
    }
  };

  useEffect(() => {
    const fetchBootLoader = async () => {
      await dispatch(fetchAsyncGetCommentNews());
      await dispatch(fetchAsyncGetNews());
      await dispatch(fetchAsyncGetComment());
    };
    fetchBootLoader();
  }, [dispatch]);

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={5}>
          <h2 className={styles.student_home__h2}>通知</h2>
          <Paper className={classes.paper}>
            <TableContainer>
              <Table>
                <TableBody>
                  {displayCommentNews.map((row, rowIndex) => (
                    <TableRow key={rowIndex} hover>
                      <TableCell>{row.createdAt}</TableCell>
                      <TableCell>{row.subjectsName}</TableCell>
                      <TableCell>
                        あなたの投稿に{row.usersName}先生が回答しました。
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
          <Button
            variant="contained"
            style={{
              backgroundColor: "#F5EA91",
              color: "#707070",
            }}
            className={classes.button}
            onClick={() => {}}
          >
            <MailOutlineIcon className={classes.icon} />
            通知一覧
          </Button>
        </Grid>
        <Grid item xs={7}>
          <h2 className={styles.student_home__h2}>学校からのお知らせ</h2>
          <Paper className={classes.paper}>
            <TableContainer>
              <Table>
                <TableBody>
                  {displayNews.map((row, rowIndex) => (
                    <TableRow key={rowIndex} hover>
                      <TableCell>
                        {row.isRead === "read" ? "" : "未開封"}
                      </TableCell>
                      <TableCell>{row.createdAt}</TableCell>
                      <TableCell>{row.newsSubject}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
          <Button
            variant="contained"
            style={{
              backgroundColor: "#F5EA91",
              color: "#707070",
            }}
            className={classes.button}
            onClick={() => {}}
          >
            <NotificationsNoneIcon className={classes.icon} />
            お知らせ一覧
          </Button>
        </Grid>
      </Grid>
      <Grid container className={classes.new}>
        <Grid item xs={12}>
          <h2 className={styles.student_home__h2_new}>新着の投稿</h2>
          <Paper className={classes.paper}>
            <TableContainer>
              <Table>
                <TableBody>
                  {displasyComments.map((row, rowIndex) => (
                    <TableRow key={rowIndex} hover>
                      <Link
                        to={"/comment/" + row.commentId}
                        className={styles.student_home__nav}
                      >
                        <TableCell>
                          {row.isAnswered === "Answered"
                            ? "回答済み"
                            : "未回答"}
                        </TableCell>
                        <TableCell>{row.createdAt}</TableCell>
                        <TableCell>{row.subjectsName}</TableCell>
                        <TableCell>{omit(row.commentContent)}</TableCell>
                      </Link>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
          <Button
            variant="contained"
            style={{
              backgroundColor: "#F5EA91",
              color: "#707070",
            }}
            className={classes.button}
            onClick={() => {}}
          >
            <CreateIcon className={classes.icon} />
            投稿一覧
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

export default StudentHome;
