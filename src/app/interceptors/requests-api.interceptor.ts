import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { HttpService } from '../services/http.service';
import { remove, set } from '../lib/token.lib';
import { MessageService } from 'primeng/api';

export const requestsApiInterceptor: HttpInterceptorFn = (req, next) => {
  let router = inject(Router);
  let http = inject(HttpService);
  let token = localStorage.getItem('token') ?? '';
  let cloned = req.clone({
    headers: req.headers.set('Authorization', `Bearer ${token}`),
  });

  return next(cloned).pipe(
    catchError(({ error }: any) => {
      switch (error.message) {
        case 'token_not_found':
          remove(window);
          router.navigate(['/']);

          break;
        case 'token_expired':
          const refreshToken = localStorage.getItem('refresh_token');

          if (refreshToken) {
            http.renewAccess({ refreshToken }).subscribe({
              next: ({ data }) => {
                if (data) set(window, data);
              },
              error: () => {
                remove(window);
                router.navigate(['/']);
              },
            });
          }

          break;
        default:
          break;
      }

      return throwError(() => new Error(error.message));
    })
  );
};
