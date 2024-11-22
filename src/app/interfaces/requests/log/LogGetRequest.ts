import BaseRequest from '../BaseRequest';

export default interface LogGetRequest extends BaseRequest {
  logId?: string;
  trace?: string;
  type?: string;
  startDate?: string;
  endDate?: string;
}
