import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import AuthLoginRequest from '../interfaces/requests/auth/AuthLoginRequest';
import { BASE_URL } from '../lib/consts.lib';
import BaseResponse from '../interfaces/responses/BaseResponse';
import AuthLoginResponse from '../interfaces/responses/auth/AuthLoginResponse';
import AppInfoDto from '../interfaces/dtos/AppInfoDto';
import UserAppDefaultDto from '../interfaces/dtos/UserAppDefaultDto';
import GetUsersRequest from '../interfaces/requests/user/GetUsersRequest';
import AuthRenewAccessRequest from '../interfaces/requests/auth/AuthRenewAccessRequest';
import UserAppMeDto from '../interfaces/dtos/UserAppMeDto';
import CreateUserRequest from '../interfaces/requests/user/CreateUserRequest';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  constructor(private http: HttpClient) {}

  // Auth controller
  login(request: AuthLoginRequest) {
    return this.http.post<BaseResponse<AuthLoginResponse>>(`${BASE_URL}/auth/login`, request);
  }

  renewAccess(request: AuthRenewAccessRequest) {
    return this.http.post<BaseResponse<AuthLoginResponse>>(`${BASE_URL}/auth/renewAccess`, request);
  }

  validateToken() {
    return this.http.get<BaseResponse<string>>(`${BASE_URL}/auth/validateToken`);
  }

  // App controller
  get appInfo() {
    return this.http.get<BaseResponse<AppInfoDto>>(`${BASE_URL}/app/info`);
  }

  // User controller
  userCreate(request: CreateUserRequest) {
    return this.http.post<BaseResponse<UserAppDefaultDto>>(`${BASE_URL}/user/create`, request);
  }

  users(request: GetUsersRequest) {
    return this.http.post<BaseResponse<UserAppDefaultDto[]>>(`${BASE_URL}/user`, request);
  }

  get me() {
    return this.http.get<BaseResponse<UserAppMeDto>>(`${BASE_URL}/user/me`);
  }

  userDelete(id: string) {
    return this.http.delete<BaseResponse<boolean>>(`${BASE_URL}/user/delete/${id}`);
  }
}
