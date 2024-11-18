import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const userLoggedGuard: CanActivateFn = (route, state) => {
  const allowedPages = ['logout', 'home', 'users', 'logs', 'tokenaccess'];
  let token = localStorage.getItem('token');
  let path = route.routeConfig?.path;
  let router = inject(Router);

  if (path == 'login') {
    return token ? router.navigate(['/home']).then(() => false) : true;
  }

  if (allowedPages.includes(path ?? '')) {
    return token ? true : router.navigate(['/login']).then(() => false);
  }

  return false;
};
