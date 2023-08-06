import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { useCustomerAdapter } from '../factories/customer-adapter-factory.util';
import { Customer } from '../models/customer.model';

@Injectable({
  providedIn: 'root',
  useFactory: useCustomerAdapter,
})
export abstract class CustomerPortService {
  abstract loadOne(id: string): Observable<Customer>;
  abstract loadAll(): Observable<Customer[]>;
  abstract create(customer: Customer): Observable<Customer>;
  abstract update(id: string, customer: Customer): Observable<Customer>;
}
