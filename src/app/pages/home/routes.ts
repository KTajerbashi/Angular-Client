// home/routes.ts - CORRECTED
import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',  // ✅ Changed from '/' to '' (empty string for default/home route)
    loadComponent: () => import('./dashboard/dashboard').then((x) => x.Dashboard),
  },
  {
    path: 'dashboard',
    loadComponent: () => import('./dashboard/dashboard').then((x) => x.Dashboard),
  },
  {
    path: 'about',
    loadComponent: () => import('./about/about').then((x) => x.About),
  },
  {
    path: 'services',
    loadComponent: () => import('./services/services').then((x) => x.Services),
  },
  {
    path: 'products',
    loadComponent: () => import('./products/products').then((x) => x.Products),
  },
  {
    path: 'contact',
    loadComponent: () => import('./contact/contact').then((x) => x.Contact),
  },
];