import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import AuthLoginRequest from '../interfaces/requests/auth/AuthLoginRequest';
import { baseUrl } from '../lib/consts.lib';
import BaseResponse from '../interfaces/responses/BaseResponse';
import AuthLoginResponse from '../interfaces/responses/auth/AuthLoginResponse';
import AppInfoDto from '../interfaces/dtos/AppInfoDto';
import UserAppDefaultDto from '../interfaces/dtos/UserAppDefaultDto';
import GetUsersRequest from '../interfaces/requests/user/GetUsersRequest';
import AuthRenewAccessRequest from '../interfaces/requests/auth/AuthRenewAccessRequest';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  constructor(private http: HttpClient) {}

  // Auth controller
  login(request: AuthLoginRequest) {
    return this.http.post<BaseResponse<AuthLoginResponse>>(`${baseUrl}/auth/login`, request);
  }

  renewAccess(request: AuthRenewAccessRequest) {
    return this.http.post<BaseResponse<AuthLoginResponse>>(`${baseUrl}/auth/renewAccess`, request);
  }

  validateToken() {
    return this.http.get<BaseResponse<string>>(`${baseUrl}/auth/validateToken`);
  }

  // App controller
  get appInfo() {
    return this.http.get<BaseResponse<AppInfoDto>>(`${baseUrl}/app/info`);
  }

  // User controller
  users(request: GetUsersRequest) {
    return this.http.post<BaseResponse<UserAppDefaultDto[]>>(`${baseUrl}/user`, request);
  }
}
