import { inject } from '@angular/core';
import { ENVIRONMENT } from '@ngrx-leaky-backends/shared/util-env';
import { CustomerMockAdapterService } from '../adapters/customer-mock-adapter.service';

export const useCustomerAdapter = () => {
  switch (inject(ENVIRONMENT).mockBackend ? 'mock' : 'rest') {
    case 'mock':
      return inject(CustomerMockAdapterService);
    case 'rest':
    default:
      throw new Error('No adapter found for backend');
  }
};
