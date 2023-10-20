import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'fn-storage-availability',
  templateUrl: './storage-availability.component.html',
  styleUrls: ['./storage-availability.component.css'],
})
export class StorageAvailabilityComponent {
  product: String = '';
  availableQuantity: String = '';
  measureUnit: String = '';
  storageQuantity: String = '';
  category: String = '';
  searchProduct(form: NgForm) {}
}
