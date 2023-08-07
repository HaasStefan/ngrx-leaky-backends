import { Routes } from '@angular/router';
import { provideState } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import {
  customersEffects,
  customersFeature,
} from '@ngrx-leaky-backends/customer/state';

export const routes: Routes = [
  {
    path: '',
    providers: [
      provideState(customersFeature),
      provideEffects(customersEffects),
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
