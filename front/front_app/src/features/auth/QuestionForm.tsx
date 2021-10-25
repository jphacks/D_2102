import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectLoginUser,
  selectSubjects,
  selectModalState,
  fetchAsyncGetUser,
  fetchAsyncGetSubject,
  handleClose,
  handleOpen,
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

const names = [
  "Oliver Hansen",
  "Van Henry",
  "April Tucker",
  "Ralph Hubbard",
  "Omar Alexander",
  "Carlos Abbott",
  "Miriam Wagner",
  "Bradley Wilkerson",
  "Virginia Andrews",
  "Kelly Snyder",
];

function getStyles(name: string, personName: string[], theme: Theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

const QuestionForm = () => {
  const theme = useTheme();
  const classes = useStyles();
  const dispatch: AppDispatch = useDispatch();
  const [value, setValue] = React.useState("");
  const [personName, setPersonName] = React.useState<string[]>([]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const handleSelectSubjectChange = (
    event: SelectChangeEvent<typeof personName>
  ) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a the stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  return (
    <>
      <h2>質問投稿</h2>
      <FormControl sx={{ m: 1, width: 250 }}>
        <InputLabel id="demo-multiple-name-label">科目</InputLabel>
        <Select
          labelId="demo-multiple-name-label"
          id="demo-multiple-name"
          multiple
          value={personName}
          onChange={handleSelectSubjectChange}
          input={<OutlinedInput label="Name" />}
          MenuProps={MenuProps}
        >
          {names.map((name) => (
            <MenuItem
              key={name}
              value={name}
              style={getStyles(name, personName, theme)}
            >
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl sx={{ m: 1, width: 500 }}>
        <TextField
          id="outlined-multiline-static"
          label="質問内容"
          multiline
          rows={10}
          defaultValue=""
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
        onClick={() => {}}
      >
        投稿
      </Button>
    </>
  );
};

export default QuestionForm;
