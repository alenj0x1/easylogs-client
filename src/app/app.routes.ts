import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { userLoggedGuard } from './guards/user-logged.guard';
import { BaseLayoutComponent } from './layouts/base-layout/base-layout.component';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { WithoutAuthenticateLayoutComponent } from './layouts/without-authenticate-layout/without-authenticate-layout.component';
import { LogoutComponent } from './components/logout/logout.component';
import { CreateComponent as UsersCreateComponent } from './pages/users/create/create.component';
import { ViewComponent as UsersViewComponent } from './pages/users/view/view.component';
import { UpdateComponent as UsersUpdateComponent } from './pages/users/update/update.component';
import { CreateComponent as LogsCreateComponent } from './pages/logs/create/create.component';
import { ViewComponent as LogsViewComponent } from './pages/logs/view/view.component';
import { UpdateComponent as LogsUpdateComponent } from './pages/logs/update/update.component';
import { CreateComponent as TokenAccessCreateComponent } from './pages/tokenaccess/create/create.component';

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
    path: 'logs',
    component: BaseLayoutComponent,
    canActivate: [userLoggedGuard],
    children: [
      {
        path: 'create',
        component: LogsCreateComponent,
      },
      {
        path: 'update/:id',
        component: LogsUpdateComponent,
      },
      {
        path: 'view',
        component: LogsViewComponent,
      },
    ],
  },
  {
    path: 'users',
    component: BaseLayoutComponent,
    canActivate: [userLoggedGuard],
    children: [
      {
        path: 'create',
        component: UsersCreateComponent,
      },
      {
        path: 'update/:id',
        component: UsersUpdateComponent,
      },
      {
        path: 'view',
        component: UsersViewComponent,
      },
    ],
  },
  {
    path: 'tokenaccess',
    component: BaseLayoutComponent,
    canActivate: [userLoggedGuard],
    children: [
      {
        path: 'create',
        component: TokenAccessCreateComponent,
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
