export default interface LogDto {
  logId: string;
  message: string;
  trace: string;
  exception?: string | null;
  stackTrace?: string | null;
  type: number;
  dataJson: string;
  createdAt: string;
}
