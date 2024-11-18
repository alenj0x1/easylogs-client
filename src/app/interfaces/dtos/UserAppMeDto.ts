import SessionTypeDto from './SessionTypeDto';
import UserAppPermissionDto from './UserAppPermissionDto';

export default interface UserAppMeDto {
  userAppId: string;
  username: string;
  email: string;
  permissions: UserAppPermissionDto[];
  sessionType: SessionTypeDto;
  createdAt: string;
  updatedAt: string;
}
