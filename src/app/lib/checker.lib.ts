import UserAppDefaultDto from '../interfaces/dtos/UserAppDefaultDto';
import UserAppMeDto from '../interfaces/dtos/UserAppMeDto';
import { PERMISSIONS } from './consts.lib';

const userPerms = (user: UserAppMeDto | UserAppDefaultDto, permission: number) => {
  const gt = user.permissions.filter(
    (perm) => perm.permissionId == PERMISSIONS.ADMINISTRATOR || perm.permissionId == permission
  );

  return gt.length > 0;
};

const checkGuid = (value: string) => {
  return new RegExp(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i).test(value);
};

const isNullOrWhiteSpace = (value: string | null | undefined) => {
  return value === null || !value || value.trim() === '';
};

export { userPerms, checkGuid, isNullOrWhiteSpace };
