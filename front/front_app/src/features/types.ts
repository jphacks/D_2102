/*authSlice.ts*/
export interface LOGIN_USER {
  usersLoginId: string;
  usersLoginPassword: string;
}
export interface CRED {
  usersLoginId: string;
  usersLoginPassword: string;
}
export interface JWT {
  Authorization: string;
}

/*appSlice.ts*/
export interface USER {
  usersId: number;
  schoolsId: number;
  usersName: string;
  usersLoginId: string;
  usersLoginPassword: string;
  schoolsName: string;
  studentGroupName: string;
  studentGroupGrade: number;
  studentGroupId: number;
}
export interface READ_SUBJECT {
  subjectsName: string;
  subjectsId: number;
}
