// pages/routes.ts - CORRECTED
import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',  // Empty path for home section
    loadChildren: () => import('./home/routes').then((x) => x.routes),
  },
  {
    path: '',  // ✅ Add a path prefix instead of empty string
    loadChildren: () => import('./common/routes').then((x) => x.routes),
  },
  {
    path: 'security',  // ✅ Add a path prefix instead of empty string
    loadChildren: () => import('./security/routes').then((x) => x.routes),
  },
];