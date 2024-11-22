export default interface LogUpdateRequest {
  message?: string | null;
  trace?: string | null;
  exception?: string | null;
  stackTrace?: string | null;
  type?: string | null;
  dataJson?: string | null;
}
