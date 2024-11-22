import UserAppDefaultDto from './UserAppDefaultDto';

export default interface TokenAccessDto {
  tokenAccessId: number;
  userApp: UserAppDefaultDto;
  value: string;
  createdAt: string;
  expiration: string;
}
