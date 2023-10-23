import { Component, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ProductService } from '../../services/product.service';
import { IProduct } from '../../models/product.interface';
import Swal from 'sweetalert2';
@Component({
  selector: 'fn-storage-availability',
  templateUrl: './storage-availability.component.html',
  styleUrls: ['./storage-availability.component.css'],
})
export class StorageAvailabilityComponent implements OnDestroy {
  product: string = '';
  productInfo: IProduct = {
    location: {
      zone: '',
      section: '',
      space: '',
    },
    categoryName: '',
    productName: '',
    quantity: 0,
    measureUnit: '',
    maxCapacity: 0,
  };
  availableQuantity: number =
    this.productInfo.maxCapacity - this.productInfo.quantity;
  private suscriptions: Subscription = new Subscription();
  constructor(private productService: ProductService) {}
  ngOnDestroy(): void {
    this.suscriptions.unsubscribe();
  }
  searchProduct(form: NgForm) {
    if (form.invalid) {
      alert('Formulario invalido');
    }
    this.suscriptions.add(
      this.productService.getProduct(form.value.product).subscribe({
        next: (response: IProduct) => {
          this.productInfo = response;
          Swal.fire('SweetAlert2 is working!');
        },
        error: (error: Error) => {
          alert(error);
        },
      })
    );
  }
}
