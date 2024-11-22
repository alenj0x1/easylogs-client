export default interface UserUpdateRequest {
  username?: string | null;
  email?: string | null;
  password?: string | null;
  permissions?: number[] | null;
}
