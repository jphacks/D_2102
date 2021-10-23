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
