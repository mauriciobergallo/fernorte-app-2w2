import { Component, OnDestroy, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ProductService } from '../../services/product.service';
import { IProduct } from '../../models/product.interface';
// import Swal from 'sweetalert2';
@Component({
  selector: 'fn-storage-availability',
  templateUrl: './storage-availability.component.html',
  styleUrls: ['./storage-availability.component.css'],
})
export class StorageAvailabilityComponent implements OnDestroy {
  @Output() backToMenuEmitter: EventEmitter<boolean> = new EventEmitter();
  loader: boolean = false;
  showModal: boolean = false;
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
      return;
    }
    this.loader = true;
    this.suscriptions.add(
      this.productService.getProduct(form.value.product).subscribe({
        next: (response: IProduct) => {
          this.productInfo = response;
          this.loader = false;
        },
        error: (error: Error) => {
          this.loader = false;
          console.log(error);
          // Swal.fire({
          //   icon: 'error',
          //   title: 'Oops...',
          //   text: 'El producto buscado no existe',
          //   confirmButtonText: 'Ok',
          //   confirmButtonColor: '#0D6EFD',
          // });
          this.showModal = true;
          this.productInfo.categoryName = '';
          this.productInfo.measureUnit = '';
          this.productInfo.quantity = 0;
          this.productInfo.maxCapacity = 0;
        },
      })
    );
  }
  hideModal() {
    this.showModal = false;
  }
  backToMenu() {
    this.backToMenuEmitter.emit(false);
  }
}
