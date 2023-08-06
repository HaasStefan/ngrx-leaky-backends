import { Injectable, inject } from '@angular/core';
import { CustomerPortService } from '@ngrx-leaky-backends/customer/data-access';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { switchMap, catchError, of } from 'rxjs';
import * as CustomersActions from './customers.actions';
import * as CustomersFeature from './customers.reducer';

@Injectable()
export class CustomersEffects {
  private readonly actions$ = inject(Actions);
  private readonly customerService = inject(CustomerPortService);

  readonly init$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CustomersActions.initCustomers),
      switchMap(() =>
        of(CustomersActions.loadCustomersSuccess({ customers: [] }))
      ),
      catchError((error) => {
        console.error('Error', error);
        return of(CustomersActions.loadCustomersFailure({ error }));
      })
    )
  );

  readonly loadCustomers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CustomersActions.loadCustomers),
      switchMap(() =>
        this.customerService.loadAll().pipe(
          switchMap((customers) =>
            of(CustomersActions.loadCustomersSuccess({ customers }))
          ),
          catchError((error) => {
            console.error('Error', error);
            return of(CustomersActions.loadCustomersFailure({ error }));
          })
        )
      )
    )
  );
}
