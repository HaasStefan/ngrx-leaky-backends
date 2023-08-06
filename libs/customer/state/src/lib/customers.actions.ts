import { createAction, props } from '@ngrx/store';
import { CustomersEntity } from './customers.models';

export const initCustomers = createAction('[Customers Page] Init');

export const loadCustomersSuccess = createAction(
  '[Customers/API] Load Customers Success',
  props<{ customers: CustomersEntity[] }>()
);

export const loadCustomersFailure = createAction(
  '[Customers/API] Load Customers Failure',
  props<{ error: any }>()
);
