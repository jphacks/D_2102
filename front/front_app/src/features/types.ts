export interface RESPONSE_STATUS {
  status: string;
}
/*authSlice.ts*/
export interface CRED {
  usersLoginId: string;
  usersLoginPassword: string;
}
export interface JWT {
  Authorization: string;
  userType: string;
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
export interface POST_COMMENT {
  subjectsId: number;
  commentContent: string;
}
export interface MODAL_STATE {
  modalOpen: boolean;
}
export interface FORM_STATE {
  formNumber: number;
}
export interface AUTH_STATE {
  loginUser: USER;
  subjects: READ_SUBJECT[];
  editedComment: POST_COMMENT;
  modalState: MODAL_STATE;
  formState: FORM_STATE;
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
  userName: string;
  newsSubject: string;
  newsText: string;
  isRead: string;
  createdAt: string;
}
export interface READ_COMMENT {
  commentId: number;
  subjectsId: number;
  usersName: string | null;
  vote: number;
  voted: boolean;
  subjectsName: string;
  commentContent: string;
  isAnswered: string;
  createdAt: string;
  commentIsAnswered: number;
}
export interface STUDENT_HOME_STATE {
  commentNews: READ_COMMENT_NEWS[];
  news: READ_NEWS[];
  comments: READ_COMMENT[];
}
/*teacherHomeSlice.ts*/
export interface TEACHER_HOME_STATE {
  comments: READ_COMMENT[];
}

/*commentSlice.ts*/
export interface POST_REPLY {
  subjectsId: number;
  commentContent: string;
  commentIsAnswered: number;
}
export interface READ_COMMENT_STATE {
  student: READ_COMMENT[];
  teacher: READ_COMMENT[] | undefined;
}
export interface COMMENT_STATE {
  studentComment: READ_COMMENT[];
  teacherComment: READ_COMMENT[];
  textpearComments: READ_COMMENT[];
  editedReply: POST_REPLY;
}
export interface POST_VOTE {
  commentId: number;
}
