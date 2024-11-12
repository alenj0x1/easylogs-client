import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import AuthLoginRequest from '../interfaces/requests/auth/AuthLoginRequest';
import { baseUrl } from '../lib/consts.lib';
import BaseResponse from '../interfaces/responses/BaseResponse';
import AuthLoginResponse from '../interfaces/responses/auth/AuthLoginResponse';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  constructor(private http: HttpClient) {}

  // Auth controller
  login(request: AuthLoginRequest) {
    return this.http.post<BaseResponse<AuthLoginResponse>>(`${baseUrl}/auth/login`, request);
  }
}
