/*authSlice.ts*/
export interface CRED {
  usersLoginId: string;
  usersLoginPassword: string;
}
export interface JWT {
  Authorization: string;
}
export interface USER {
  usersId: number;
  schoolsId: number;
  usersName: string;
  usersLoginId: string;
  schoolsName: string;
  studentGroupName: string;
  studentGroupGrade: number;
  studentGroupId: number;
}
export interface READ_SUBJECT {
  subjectsName: string;
  subjectsId: number;
}
export interface AUTH_STATE {
  loginUser: USER;
  subjects: READ_SUBJECT[];
}
