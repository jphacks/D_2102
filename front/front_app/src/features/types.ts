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

/*studentHomeSlice.ts*/
export interface READ_COMMENT_NEWS {
  usersName: string;
  commentId: number;
  subjectsName: string;
  createdAt: string;
}
export interface READ_NEWS {
  newsId: number;
  studentGroupId: number;
  newsSubject: string;
  newsText: string;
  isRead: string;
}
export interface READ_COMMENT {
  commentId: number;
  subjectsName: string;
  comment_content: string;
  isAnswered: string;
  createdAt: string;
}
export interface STUDENT_HOME_STATE {
  commentNews: READ_COMMENT_NEWS[];
  news: READ_NEWS[];
  comments: READ_COMMENT[];
}
