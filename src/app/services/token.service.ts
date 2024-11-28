import { Injectable } from '@angular/core';
import AuthLoginResponse from '../interfaces/responses/auth/AuthLoginResponse';
import { HttpService } from './http.service';
import { jwtDecode } from 'jwt-decode';
import { BEFORE_TIME_RENEW_TOKEN, REFRESH_TOKEN_DEFINITION, TOKEN_DEFINITION } from '../lib/consts.lib';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  constructor(private readonly http: HttpService, private readonly router: Router) {}

  public set(data: AuthLoginResponse) {
    localStorage.setItem(TOKEN_DEFINITION, data.accessToken);
    localStorage.setItem(REFRESH_TOKEN_DEFINITION, data.refreshToken);
  }

  public validate() {
    const token = localStorage.getItem(TOKEN_DEFINITION);
    const refreshToken = localStorage.getItem(REFRESH_TOKEN_DEFINITION);

    if (!token || !refreshToken) {
      this.remove();
      return;
    }

    const decoded = jwtDecode(token);
    if (!decoded.exp) {
      this.remove();
      return;
    }

    const now = Date.now();
    const expiration = decoded.exp * 1000;

    setTimeout(() => this.renew(), expiration - now - BEFORE_TIME_RENEW_TOKEN);
  }

  get values() {
    return {
      accessToken: localStorage.getItem(TOKEN_DEFINITION),
      refreshToken: localStorage.getItem(REFRESH_TOKEN_DEFINITION),
    };
  }

  private renew() {
    this.http
      .authRenewAccess({
        refreshToken: localStorage.getItem(REFRESH_TOKEN_DEFINITION) ?? '',
      })
      .subscribe({
        next: ({ data }) => {
          if (data === null) {
            this.remove();
            return;
          }

          this.set(data);
        },
        error: () => this.remove(),
      });
  }

  public remove() {
    localStorage.removeItem(TOKEN_DEFINITION);
    localStorage.removeItem(REFRESH_TOKEN_DEFINITION);

    this.router.navigate(['/']);
  }
}
