import { inject } from '@angular/core';
import { ENVIRONMENT } from '@ngrx-leaky-backends/shared/util-env';
import { CustomerAdapterService } from '../adapters/customer-adapter.service';
import { CustomerMockAdapterService } from '../adapters/customer-mock-adapter.service';

export const useCustomerAdapter = () =>
  inject(ENVIRONMENT).mockBackend
    ? inject(CustomerMockAdapterService)
    : inject(CustomerAdapterService);
