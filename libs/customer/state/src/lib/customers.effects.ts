import { Injectable, inject } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { switchMap, catchError, of } from 'rxjs';
import * as CustomersActions from './customers.actions';
import * as CustomersFeature from './customers.reducer';

@Injectable()
export class CustomersEffects {
  private actions$ = inject(Actions);

  init$ = createEffect(() =>
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
}
