export default interface SessionAuth {
  accessToken: string;
  refreshToken: string;
  userAppId: string;
  expiration: number;
}
