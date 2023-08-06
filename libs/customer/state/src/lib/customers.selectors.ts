import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  CUSTOMERS_FEATURE_KEY,
  CustomersState,
  customersAdapter,
} from './customers.reducer';

// Lookup the 'Customers' feature state managed by NgRx
export const selectCustomersState = createFeatureSelector<CustomersState>(
  CUSTOMERS_FEATURE_KEY
);

const { selectAll, selectEntities } = customersAdapter.getSelectors();

export const selectCustomersLoaded = createSelector(
  selectCustomersState,
  (state: CustomersState) => state.loaded
);

export const selectCustomersError = createSelector(
  selectCustomersState,
  (state: CustomersState) => state.error
);

export const selectAllCustomers = createSelector(
  selectCustomersState,
  (state: CustomersState) => selectAll(state)
);

export const selectCustomersEntities = createSelector(
  selectCustomersState,
  (state: CustomersState) => selectEntities(state)
);

export const selectSelectedId = createSelector(
  selectCustomersState,
  (state: CustomersState) => state.selectedId
);

export const selectEntity = createSelector(
  selectCustomersEntities,
  selectSelectedId,
  (entities, selectedId) => (selectedId ? entities[selectedId] : undefined)
);
