import { inject, Injectable } from '@angular/core';
import { Customer } from '../models/customer.model';
import { CustomerPortService } from '../ports/customer-port.service';
import { HttpClient } from '@angular/common/http';
import { CustomerDto } from '@ngrx-leaky-backends/customer/dtos';
import { filter, map, Observable, of } from 'rxjs';

@Injectable()
export class CustomerMockAdapterService extends CustomerPortService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = '/assets/customers.json';

  loadOne(id: string): Observable<Customer> {
    return this.http.get<CustomerDto[]>(this.baseUrl).pipe(
      map((customersDto) =>
        customersDto.map(
          (customerDto) =>
            ({
              id: customerDto.id,
              firstName: customerDto.first_name,
              lastName: customerDto.last_name,
              dateOfBirth: new Date(customerDto.date_of_birth),
              email: customerDto.email,
              phone: customerDto.phone,
            } as Customer)
        )
      ),
      map((customers) => customers.find((customer) => customer.id === id)),
      filter((customer): customer is NonNullable<typeof customer> => !!customer)
    );
  }

  loadAll(): Observable<Customer[]> {
    return this.http.get<CustomerDto[]>(this.baseUrl).pipe(
      map((customersDto) =>
        customersDto.map(
          (customerDto) =>
            ({
              id: customerDto.id,
              firstName: customerDto.first_name,
              lastName: customerDto.last_name,
              dateOfBirth: new Date(customerDto.date_of_birth),
              email: customerDto.email,
              phone: customerDto.phone,
            } as Customer)
        )
      )
    );
  }


  create(customer: Customer): Observable<Customer> {
    return of(customer);
  }

  update(id: string, customer: Customer): Observable<Customer> {
    return of(customer);
  }
}
