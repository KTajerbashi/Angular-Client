import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'privacy',
    loadComponent: () => import('./privacy/privacy').then((x) => x.Privacy),
  },
  {
    path: 'terms',
    loadComponent: () => import('./terms/terms').then((x) => x.Terms),
  },
];
