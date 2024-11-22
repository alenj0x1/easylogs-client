import AppInfoDto from '../interfaces/dtos/AppInfoDto';
import TokenAccessDto from '../interfaces/dtos/TokenAccessDto';
import UserAppDefaultDto from '../interfaces/dtos/UserAppDefaultDto';
import UserAppMeDto from '../interfaces/dtos/UserAppMeDto';

// Interfaces
const appInfo: AppInfoDto = {
  permissions: [],
  logTypes: [],
  sessionTypes: [],
};

const userAppDefault: UserAppDefaultDto = {
  userAppId: '',
  username: '',
  email: '',
  permissions: [],
  createdAt: '',
};

const userAppMe: UserAppMeDto = {
  userAppId: '',
  username: '',
  email: '',
  sessionType: {
    name: '',
    sessionTypeId: 0,
  },
  permissions: [],
  updatedAt: '',
  createdAt: '',
};

const tokenAccess: TokenAccessDto = {
  tokenAccessId: 0,
  value: '',
  userApp: userAppDefault,
  expiration: '',
  createdAt: '',
};

export default {
  appInfo,
  userAppDefault,
  userAppMe,
  tokenAccess,
};
