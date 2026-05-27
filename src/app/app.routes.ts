// app.routes.ts - CORRECTED
import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./shared/layouts/main-layout/main-layout').then((x) => x.MainLayout),
    children: [
      // ✅ Use children instead of loadChildren with main layout
      {
        path: '',
        loadChildren: () => import('./pages/routes').then((x) => x.routes),
      },
    ],
  },
  // Catch-all route for 404
  { path: '**', redirectTo: '' },
];
