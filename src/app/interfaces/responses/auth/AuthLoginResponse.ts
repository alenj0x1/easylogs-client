export default interface AuthLoginResponse {
  accessToken: string;
  refreshToken: string;
  expiration: number;
}
