export default interface LogCreateRequest {
  message: string;
  trace: string;
  exception?: string | null;
  stackTrace?: string | null;
  type: number;
  dataJson: string;
}
