import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchAsyncCreateComment,
  selectSubjects,
  selectEditedComment,
  editComment,
  handleClose,
} from "./authSlice";
import { AppDispatch } from "../../app/store";

import { makeStyles, Theme, useTheme } from "@material-ui/core/styles";
import styles from "./QuestionForm.module.css";
import { Button } from "@material-ui/core";
import TextField from "@mui/material/TextField";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

const useStyles = makeStyles((theme: Theme) => ({
  field: {
    margin: theme.spacing(2),
    minWidth: 240,
  },
  button: {
    margin: theme.spacing(3),
  },
}));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const QuestionForm = () => {
  const theme = useTheme();
  const classes = useStyles();
  const dispatch: AppDispatch = useDispatch();
  const [value, setValue] = React.useState("");
  const [personName, setPersonName] = React.useState<string[]>([]);

  const subjects = useSelector(selectSubjects);
  const editedComment = useSelector(selectEditedComment);

  const isDisabled =
    editedComment.subjectsId === 0 || editedComment.commentContent.length === 0;

  const handleSelectSubjectChange = (e: SelectChangeEvent<number>) => {
    const value = e.target.value as unknown as number;
    dispatch(editComment({ ...editedComment, subjectsId: value }));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value: string = e.target.value;
    dispatch(editComment({ ...editedComment, commentContent: value }));
  };

  let subjectsOptions = subjects.map((subject) => (
    <MenuItem key={subject.subjectsId} value={subject.subjectsId}>
      {subject.subjectsName}
    </MenuItem>
  ));

  return (
    <>
      <h2 className={styles.question_form__h2}>質問投稿</h2>
      <FormControl sx={{ m: 1, width: 250 }}>
        <InputLabel id="demo-multiple-name-label">科目</InputLabel>
        <Select
          labelId="demo-multiple-name-label"
          id="demo-multiple-name"
          value={editedComment.subjectsId}
          onChange={handleSelectSubjectChange}
          input={<OutlinedInput label="Name" />}
        >
          {subjectsOptions}
        </Select>
      </FormControl>
      <FormControl sx={{ m: 1, width: 500 }}>
        <TextField
          id="outlined-multiline-static"
          label="質問内容"
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
          dispatch(fetchAsyncCreateComment(editedComment));
          dispatch(handleClose());
        }}
      >
        投稿
      </Button>
    </>
  );
};

export default QuestionForm;
