import UserAppDefaultDto from '../interfaces/dtos/UserAppDefaultDto';
import UserAppMeDto from '../interfaces/dtos/UserAppMeDto';
import { PERMISSIONS } from './consts.lib';

const userPerms = (user: UserAppMeDto | UserAppDefaultDto, permission: number) => {
  const gt = user.permissions.filter(
    (perm) => perm.permissionId == PERMISSIONS.ADMINISTRATOR || perm.permissionId == permission
  );

  return gt.length > 0;
};

export { userPerms };
