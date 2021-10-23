import React from "react";
import App from "../../App";

import styles from "./Home.module.css";
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
//
function createData(
  name: string,
  calories: string,
  fat: string,
  carbs: string,
  protein: string
) {
  return { name, calories, fat, carbs, protein };
}

let rows = new Array(2).fill("");

//

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

const Home: React.FC = () => {
  const classes = useStyles();

  return (
    <App>
      <Grid container spacing={2}>
        <Grid item xs={5}>
          <h2 className={styles.home__h2}>通知</h2>
          <Paper className={classes.paper}>
            <TableContainer>
              <Table>
                <TableBody>
                  {rows.map((row) => (
                    <TableRow
                      key={row.name}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                      hover
                    >
                      <TableCell component="th" scope="row">
                        {row.name}
                      </TableCell>
                      <TableCell align="right">{row.calories}</TableCell>
                      <TableCell align="right">{row.fat}</TableCell>
                      <TableCell align="right">{row.carbs}</TableCell>
                      <TableCell align="right">{row.protein}</TableCell>
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
            onClick={() => {
              // dispatch(
              //   fetchAsyncDeleteStaff({
              //     ...row,
              //     is_active: false,
              //   })
              // );
            }}
          >
            <MailOutlineIcon className={classes.icon} />
            通知一覧
          </Button>
        </Grid>
        <Grid item xs={7}>
          <h2 className={styles.home__h2}>学校からのお知らせ</h2>
          <Paper className={classes.paper}>
            <TableContainer>
              <Table>
                <TableBody>
                  {rows.map((row) => (
                    <TableRow
                      key={row.name}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                      hover
                    >
                      <TableCell component="th" scope="row">
                        {row.name}
                      </TableCell>
                      <TableCell align="right">{row.calories}</TableCell>
                      <TableCell align="right">{row.fat}</TableCell>
                      <TableCell align="right">{row.carbs}</TableCell>
                      <TableCell align="right">{row.protein}</TableCell>
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
            onClick={() => {
              // dispatch(
              //   fetchAsyncDeleteStaff({
              //     ...row,
              //     is_active: false,
              //   })
              // );
            }}
          >
            <NotificationsNoneIcon className={classes.icon} />
            お知らせ一覧
          </Button>
        </Grid>
      </Grid>
      <Grid container className={classes.new}>
        <Grid item xs={12}>
          <h2 className={styles.home__h2_new}>新着の投稿</h2>
          <Paper className={classes.paper}>
            <TableContainer>
              <Table>
                <TableBody>
                  {rows.map((row) => (
                    <TableRow
                      key={row.name}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                      hover
                    >
                      <TableCell component="th" scope="row">
                        {row.name}
                      </TableCell>
                      <TableCell align="right">{row.calories}</TableCell>
                      <TableCell align="right">{row.fat}</TableCell>
                      <TableCell align="right">{row.carbs}</TableCell>
                      <TableCell align="right">{row.protein}</TableCell>
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
            onClick={() => {
              // dispatch(
              //   fetchAsyncDeleteStaff({
              //     ...row,
              //     is_active: false,
              //   })
              // );
            }}
          >
            <CreateIcon className={classes.icon} />
            投稿一覧
          </Button>
        </Grid>
      </Grid>
    </App>
  );
};

export default Home;
