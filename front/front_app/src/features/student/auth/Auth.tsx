import React, { useState } from "react";
import { makeStyles, Theme } from "@material-ui/core/styles";
import { TextField, Button } from "@material-ui/core";

import { useSelector, useDispatch } from "react-redux";
import { AppDispatch } from "../../../app/store";
import { fetchAsyncLogin } from "./authSlice";

const useStyles = makeStyles((theme: Theme) => ({
  button: {
    margin: theme.spacing(3),
  },
}));

export const Auth: React.FC = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [credential, setCredential] = useState({ userId: "", password: "" });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const name = e.target.name;
    setCredential({ ...credential, [name]: value });
  };

  const login = async () => {
    await dispatch(fetchAsyncLogin(credential));
  };

  return (
    <div>
      <h1>ログイン</h1>
      <br />
      <TextField
        InputLabelProps={{
          shrink: true,
        }}
        label="ID"
        type="text"
        name="userId"
        value={credential.userId}
        onChange={handleInputChange}
      />
      <br />
      <TextField
        InputLabelProps={{
          shrink: true,
        }}
        label="パスワード"
        type="password"
        name="password"
        value={credential.password}
        onChange={handleInputChange}
      />
      <Button
        variant="contained"
        color="primary"
        size="small"
        className={classes.button}
        onClick={login}
      >
        ログイン
      </Button>
    </div>
  );
};
