import BaseRequest from '../BaseRequest';

export default interface GetUsersRequest extends BaseRequest {
  userAppId?: string | null;
  username?: string | null;
  email?: string | null;
  startDate?: string | null;
  endDate?: string | null;
}
