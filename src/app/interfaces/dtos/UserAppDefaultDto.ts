import PermissionDto from './PermissionDto';

export default interface UserAppDefaultDto {
  userAppId: string;
  username: string;
  email: string;
  permissions: PermissionDto[];
  createdAt: string;
}
