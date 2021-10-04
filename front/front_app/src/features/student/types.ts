/*authSlice.ts*/
export interface LOGIN_USER {
  id: number;
  userName: stritng;
}
export interface CRED {
  userId: string;
  password: string;
}
export interface JWT {
  refresh: string;
  access: string;
}
