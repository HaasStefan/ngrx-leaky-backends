import { Routes } from '@angular/router';
import { provideState } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import {
  CustomersEffects,
  customersReducer,
  CUSTOMERS_FEATURE_KEY,
} from '@ngrx-leaky-backends/customer/state';

export const routes: Routes = [
  {
    path: '',
    providers: [
      provideState(CUSTOMERS_FEATURE_KEY, customersReducer),
      provideEffects(CustomersEffects),
    ],
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'list',
      },
      {
        path: 'list',
        loadComponent: async () =>
          (await import('@ngrx-leaky-backends/customer/feature-list'))
            .FeatureListComponent,
      },
    ],
  },
];
