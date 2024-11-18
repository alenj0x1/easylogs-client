import LogTypeDto from './LogTypeDto';
import PermissionDto from './PermissionDto';
import SessionTypeDto from './SessionTypeDto';

export default interface AppInfoDto {
  permissions: PermissionDto[];
  sessionTypes: SessionTypeDto[];
  logTypes: LogTypeDto[];
}
