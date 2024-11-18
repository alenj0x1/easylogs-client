import UserAppPermissionDto from './UserAppPermissionDto';

export default interface UserAppDefaultDto {
  userAppId: string;
  username: string;
  email: string;
  permissions: UserAppPermissionDto[];
  createdAt: string;
}
