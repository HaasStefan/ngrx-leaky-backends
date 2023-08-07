import { inject } from '@angular/core';
import { CustomerPortService } from '@ngrx-leaky-backends/customer/data-access';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { switchMap, catchError, of } from 'rxjs';
import { customerApiActions, initCustomers } from './customers.actions';

export const init = createEffect(
  (actions$ = inject(Actions)) =>
    actions$.pipe(
      ofType(initCustomers),
      switchMap(() =>
        of(customerApiActions.loadCustomersSuccess({ customers: [] }))
      ),
      catchError((error) => {
        console.error('Error', error);
        return of(customerApiActions.loadCustomersFailure({ error }));
      })
    ),
  { functional: true }
);

export const loadCustomers = createEffect(
  (actions$ = inject(Actions), customerService = inject(CustomerPortService)) =>
    actions$.pipe(
      ofType(customerApiActions.loadCustomers),
      switchMap(() =>
        customerService.loadAll().pipe(
          switchMap((customers) =>
            of(customerApiActions.loadCustomersSuccess({ customers }))
          ),
          catchError((error) => {
            console.error('Error', error);
            return of(customerApiActions.loadCustomersFailure({ error }));
          })
        )
      )
    ),
  { functional: true }
);
