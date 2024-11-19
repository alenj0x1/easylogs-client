import AppInfoDto from '../interfaces/dtos/AppInfoDto';
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

export default {
  appInfo,
  userAppDefault,
  userAppMe,
};
