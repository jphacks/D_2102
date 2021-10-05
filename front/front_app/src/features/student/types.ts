/*authSlice.ts*/
export interface LOGIN_USER {
  id: number;
  userName: string;
}
export interface CRED {
  userId: string;
  password: string;
}
export interface JWT {
  refresh: string;
  access: string;
}
