import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { TokenService } from '../services/token.service';
import { DEFAULT_API_LANGUAGE } from '../lib/consts.lib';

export const requestsApiInterceptor: HttpInterceptorFn = (req, next) => {
  let token = inject(TokenService);
  let cloned = req.clone({
    headers: req.headers
      .set('Authorization', `Bearer ${token.values.accessToken}`)
      .set('Accept-Language', DEFAULT_API_LANGUAGE),
  });

  return next(cloned);
};
