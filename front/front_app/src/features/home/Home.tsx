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

let rows = new Array(5).fill("");

//

const useStyles = makeStyles((theme: Theme) => ({
  button: {
    margin: theme.spacing(0, 3),
  },
  small: {
    width: theme.spacing(5),
    height: theme.spacing(5),
  },
  saveModal: {
    marginTop: theme.spacing(4),
    marginLeft: theme.spacing(2),
  },
  paper: {
    position: "absolute",
    textAlign: "center",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  mainPaper: {
    padding: theme.spacing(2),
    marginLeft: theme.spacing(3),
  },
}));

const Home: React.FC = () => {
  const classes = useStyles();

  return (
    <App>
      <Grid container spacing={2}>
        <Grid item xs={5}>
          <h2 className={styles.home__h2}>お知らせ</h2>
          <TableContainer component={Paper}>
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
          <Button
            variant="contained"
            style={{
              backgroundColor: "#FF7B7B",
              color: "white",
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
            <MailOutlineIcon />
            受け取りBOX
          </Button>
        </Grid>
        <Grid item xs={7}>
          <h2 className={styles.home__h2}>学校からのお知らせ</h2>
          <TableContainer component={Paper}>
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
            <NotificationsNoneIcon />
            お知らせBOX
          </Button>
        </Grid>
      </Grid>
      <Grid container>
        <Grid item xs={12}>
          <Paper className={classes.mainPaper}>aaaa</Paper>
        </Grid>
      </Grid>
    </App>
  );
};

export default Home;
