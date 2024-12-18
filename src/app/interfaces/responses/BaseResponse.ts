export default interface BaseResponse<T> {
  ok: boolean;
  data: T | null;
  statusCode: number;
  message: string;
  statusCodeCat: string;
  count: number;
  timeStamp: string;
}
