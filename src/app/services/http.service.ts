import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import AuthLoginRequest from '../interfaces/requests/auth/AuthLoginRequest';
import BaseResponse from '../interfaces/responses/BaseResponse';
import AuthLoginResponse from '../interfaces/responses/auth/AuthLoginResponse';
import AppInfoDto from '../interfaces/dtos/AppInfoDto';
import UserAppDefaultDto from '../interfaces/dtos/UserAppDefaultDto';
import GetUsersRequest from '../interfaces/requests/user/UserGetRequest';
import AuthRenewAccessRequest from '../interfaces/requests/auth/AuthRenewAccessRequest';
import UserAppMeDto from '../interfaces/dtos/UserAppMeDto';
import CreateUserRequest from '../interfaces/requests/user/UserCreateRequest';
import AuthCreateAccessTokenRequest from '../interfaces/requests/auth/AuthCreateAccessTokenRequest';
import TokenAccessDto from '../interfaces/dtos/TokenAccessDto';
import BaseRequest from '../interfaces/requests/BaseRequest';
import LogCreateRequest from '../interfaces/requests/log/LogCreateRequest';
import LogDto from '../interfaces/dtos/LogDto';
import LogUpdateRequest from '../interfaces/requests/log/LogUpdateRequest';
import UserUpdateRequest from '../interfaces/requests/user/UserUpdateRequest';
import LogGetRequest from '../interfaces/requests/log/LogGetRequest';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  private readonly BASE_URL = import.meta.env.NG_APP_API_URL;

  constructor(private readonly http: HttpClient) {}

  // Auth controller
  authCreateAccessToken(request: AuthCreateAccessTokenRequest) {
    return this.http.post<BaseResponse<AuthLoginResponse>>(`${this.BASE_URL}/auth/accessToken/create`, request);
  }

  authTokenAccesses(request: BaseRequest) {
    return this.http.post<BaseResponse<TokenAccessDto[]>>(`${this.BASE_URL}/auth/accessToken`, request);
  }

  authRemoveAccessToken(id: number) {
    return this.http.delete<BaseResponse<boolean>>(`${this.BASE_URL}/auth/accessToken/delete/${id}`);
  }

  authLogin(request: AuthLoginRequest) {
    return this.http.post<BaseResponse<AuthLoginResponse>>(`${this.BASE_URL}/auth/login`, request);
  }

  authRenewAccess(request: AuthRenewAccessRequest) {
    return this.http.post<BaseResponse<AuthLoginResponse>>(`${this.BASE_URL}/auth/renewAccess`, request);
  }

  authValidateToken() {
    return this.http.get<BaseResponse<string>>(`${this.BASE_URL}/auth/validateToken`);
  }

  // App controller
  get appInfo() {
    return this.http.get<BaseResponse<AppInfoDto>>(`${this.BASE_URL}/app/info`);
  }

  // User controller
  userCreate(request: CreateUserRequest) {
    return this.http.post<BaseResponse<UserAppDefaultDto>>(`${this.BASE_URL}/user/create`, request);
  }

  userGetByFilter(request: GetUsersRequest) {
    return this.http.post<BaseResponse<UserAppDefaultDto[]>>(`${this.BASE_URL}/user`, request);
  }

  get userMe() {
    return this.http.get<BaseResponse<UserAppMeDto>>(`${this.BASE_URL}/user/me`);
  }

  userGetById(id: string) {
    return this.http.get<BaseResponse<UserAppDefaultDto>>(`${this.BASE_URL}/user/${id}`);
  }

  userUpdate(request: UserUpdateRequest, id: string) {
    return this.http.put<BaseResponse<UserAppDefaultDto>>(`${this.BASE_URL}/user/update/${id}`, request);
  }

  userDelete(id: string) {
    return this.http.delete<BaseResponse<boolean>>(`${this.BASE_URL}/user/delete/${id}`);
  }

  // Log controller
  logCreate(request: LogCreateRequest) {
    return this.http.post<BaseResponse<LogDto>>(`${this.BASE_URL}/log/create`, request);
  }

  logGetById(id: string) {
    return this.http.get<BaseResponse<LogDto>>(`${this.BASE_URL}/log/${id}`);
  }

  logGetByFilter(request: LogGetRequest) {
    return this.http.post<BaseResponse<LogDto[]>>(`${this.BASE_URL}/log`, request);
  }

  logUpdate(request: LogUpdateRequest, id: string) {
    return this.http.put<BaseResponse<LogDto>>(`${this.BASE_URL}/log/update/${id}`, request);
  }

  logDelete(id: string) {
    return this.http.delete<BaseResponse<boolean>>(`${this.BASE_URL}/log/delete/${id}`);
  }
}
