import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on, createFeature, createSelector } from '@ngrx/store';

import * as CustomersActions from './customers.actions';
import { customerApiActions } from './customers.actions';
import { CustomersEntity } from './customers.models';

export interface CustomersState extends EntityState<CustomersEntity> {
  selectedId: string | null;
  loaded: boolean;
  error: unknown | null;
}

export const customersAdapter: EntityAdapter<CustomersEntity> =
  createEntityAdapter<CustomersEntity>();

export const initialCustomersState: CustomersState =
  customersAdapter.getInitialState({
    selectedId: null,
    loaded: false,
    error: null,
  });

const { selectAll } = customersAdapter.getSelectors();

/**
 * Note that optional parameters are not allowed in the state interface, because all keys must be present in the state all the time.
 * solution: use "| null" or "| undefined"
 */
export const customersFeature = createFeature({
  name: 'customers',
  reducer: createReducer(
    initialCustomersState,
    on(CustomersActions.initCustomers, (state) => ({
      ...state,
      loaded: false,
      error: null,
    })),
    on(customerApiActions.loadCustomersSuccess, (state, { customers }) =>
      customersAdapter.setAll(customers, { ...state, loaded: true })
    ),
    on(customerApiActions.loadCustomersFailure, (state, { error }) => ({
      ...state,
      error,
    }))
  ),
  extraSelectors: ({
    selectCustomersState,
  }) => ({
    selectAllCustomers: createSelector(
      selectCustomersState,
      (state: CustomersState) => selectAll(state)
    ),
  }),
});
