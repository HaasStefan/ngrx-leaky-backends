import {
  createAction,
  createActionGroup,
  emptyProps,
  props,
} from '@ngrx/store';
import { CustomersEntity } from './customers.models';

export const initCustomers = createAction('[Customers Page] Init');

export const customerApiActions = createActionGroup({
  source: 'Customers API',
  events: {
    loadCustomers: emptyProps(),
    loadCustomersSuccess: props<{ customers: CustomersEntity[] }>(),
    loadCustomersFailure: props<{ error: unknown }>(),
  },
});
