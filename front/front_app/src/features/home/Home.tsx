import React from "react";
import { useSelector } from "react-redux";

import App from "../../App";
import StudentHome from "./StudentHome";
import TeacherHome from "./TeacherHome";

const Home: React.FC = () => {
  const userType = localStorage.getItem("localUserTyoe");
  return (
    <App>{userType === "student" ? <StudentHome /> : <TeacherHome />}</App>
  );
};

export default Home;
