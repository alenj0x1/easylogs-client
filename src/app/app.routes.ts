import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { userLoggedGuard } from './guards/user-logged.guard';
import { BaseLayoutComponent } from './layouts/base-layout/base-layout.component';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { WithoutAuthenticateLayoutComponent } from './layouts/without-authenticate-layout/without-authenticate-layout.component';
import { LogoutComponent } from './components/logout/logout.component';

export const routes: Routes = [
  {
    path: '',
    component: LandingPageComponent,
  },
  {
    path: 'login',
    component: WithoutAuthenticateLayoutComponent,
    canActivate: [userLoggedGuard],
    children: [
      {
        path: '**',
        component: LoginComponent,
      },
    ],
  },
  {
    path: 'home',
    component: BaseLayoutComponent,
    canActivate: [userLoggedGuard],
    children: [
      {
        path: '**',
        component: HomeComponent,
      },
    ],
  },
  {
    path: 'logout',
    component: LogoutComponent,
    canActivate: [userLoggedGuard],
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];
