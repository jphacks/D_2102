import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { handleClose } from "../auth/authSlice";
import { selectEditedReply, editReply } from "./commentSlice";
import { AppDispatch } from "../../app/store";

import { makeStyles, Theme, useTheme } from "@material-ui/core/styles";
import styles from "./ReplyForm.module.css";
import { Button } from "@material-ui/core";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";

const useStyles = makeStyles((theme: Theme) => ({
  button: {
    margin: theme.spacing(3),
  },
}));

const ReplyForm = () => {
  const classes = useStyles();
  const dispatch: AppDispatch = useDispatch();

  const editedReply = useSelector(selectEditedReply);

  const isDisabled = editedReply.commentContent.length === 0;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value: string = e.target.value;
    dispatch(editReply({ ...editedReply, commentContent: value }));
  };

  return (
    <>
      <h2 className={styles.reply_form__h2}>返信</h2>
      <FormControl sx={{ m: 1, width: 500 }}>
        <TextField
          id="outlined-multiline-static"
          label="返信内容"
          multiline
          rows={10}
          defaultValue=""
          onChange={handleInputChange}
        />
      </FormControl>
      <Button
        variant="contained"
        color="default"
        onClick={() => {
          dispatch(handleClose());
        }}
      >
        キャンセル
      </Button>
      <Button
        variant="contained"
        color="primary"
        className={classes.button}
        disabled={isDisabled}
        onClick={() => {
          // dispatch(fetchAsyncCreateComment(editedComment));
          dispatch(handleClose());
        }}
      >
        投稿
      </Button>
    </>
  );
};

export default ReplyForm;
