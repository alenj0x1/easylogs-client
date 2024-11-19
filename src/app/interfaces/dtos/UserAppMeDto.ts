import PermissionDto from './PermissionDto';
import SessionTypeDto from './SessionTypeDto';

export default interface UserAppMeDto {
  userAppId: string;
  username: string;
  email: string;
  permissions: PermissionDto[];
  sessionType: SessionTypeDto;
  createdAt: string;
  updatedAt: string;
}
