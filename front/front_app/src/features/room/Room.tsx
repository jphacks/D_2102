import React from "react";

import { RouteComponentProps } from "react-router-dom";
import App from "../../App";
import styles from "./Room.module.css";
import { AppDispatch } from "../../app/store";
import { useSelector, useDispatch } from "react-redux";
import { selectSubjects } from "../auth/authSlice";

type RoomProps = RouteComponentProps<{
  subjectsId: string;
}>;

const Room: React.FC<RoomProps> = (props) => {
  const subjectsId = props.match.params.subjectsId as unknown as number;
  const subjects = useSelector(selectSubjects);
  const roomSubject = subjects.find(
    (subject) => subject.subjectsId === subjectsId
  );
  return (
    <App>
      <h2 className={styles.room__h2}>{roomSubject?.subjectsName}の部屋</h2>
    </App>
  );
};

export default Room;
