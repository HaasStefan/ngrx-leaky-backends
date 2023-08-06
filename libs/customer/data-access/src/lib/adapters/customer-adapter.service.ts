import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Customer } from "../models/cutomer.model";
import { CustomerPortService } from "../ports/customer-port.service";

/**
 * @todo Implement this adapter
 */
@Injectable()
export class CustomerAdapterService extends CustomerPortService {
    loadOne(id: string): Observable<Customer> {
        throw new Error("Method not implemented.");
    }
    loadAll(): Observable<Customer[]> {
        throw new Error("Method not implemented.");
    }
    create(customer: Customer): Observable<Customer> {
        throw new Error("Method not implemented.");
    }
    update(id: string, customer: Customer): Observable<Customer> {
        throw new Error("Method not implemented.");
    }
}