export default interface UserUpdateRequest {
  username?: string | null;
  email?: string | null;
  passwordNew?: string | null;
  passwordConfirm?: string | null;
  permissions?: number[] | null;
}
