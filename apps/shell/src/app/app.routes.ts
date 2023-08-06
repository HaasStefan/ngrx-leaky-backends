import { Routes } from '@angular/router';

export const appRoutes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'customer',
  },
  {
    path: 'customer',
    loadChildren: async () =>
      (await import('@ngrx-leaky-backends/customer/routes')).routes,
  },
  {
    path: '**',
    redirectTo: 'customer',
  },
];
