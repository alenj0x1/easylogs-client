import { Routes } from '@angular/router';
import { WithoutAuthenticateLayoutComponent } from './layouts/without-authenticate-layout/without-authenticate-layout.component';
import { LoginComponent } from './pages/login/login.component';

export const routes: Routes = [
  {
    path: '',
    component: WithoutAuthenticateLayoutComponent,
    children: [
      {
        path: '',
        component: LoginComponent,
      },
    ],
  },
];
