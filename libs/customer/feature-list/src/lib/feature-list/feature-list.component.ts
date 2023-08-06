import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import {
  CustomersPartialState,
  loadCustomers,
  selectAllCustomers,
  selectCustomersLoaded,
} from '@ngrx-leaky-backends/customer/state';

@Component({
  selector: 'ngrx-leaky-backends-feature-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './feature-list.component.html',
  styleUrls: ['./feature-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FeatureListComponent implements OnInit {
  private readonly store = inject(Store<CustomersPartialState>);
  readonly customersSignal = this.store.selectSignal(selectAllCustomers);
  readonly customersLoadedSignal = this.store.selectSignal(
    selectCustomersLoaded
  );

  ngOnInit() {
    this.store.dispatch(loadCustomers());
  }
}
