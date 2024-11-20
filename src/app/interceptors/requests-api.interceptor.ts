import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { TokenService } from '../services/token.service';

export const requestsApiInterceptor: HttpInterceptorFn = (req, next) => {
  let token = inject(TokenService);
  let cloned = req.clone({
    headers: req.headers.set('Authorization', `Bearer ${token.values.accessToken}`),
  });

  return next(cloned);
};
