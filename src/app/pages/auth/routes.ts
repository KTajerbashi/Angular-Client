import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./login/login').then((x) => x.Login),
  },
  {
    path: 'sign-up',
    loadComponent: () => import('./sign-up/sign-up').then((x) => x.SignUp),
  },
];
