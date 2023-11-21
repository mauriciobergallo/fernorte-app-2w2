import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../services/products.service';
import { SupliersService } from '../services/supliers.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import { ISupplierPrice } from '../../../models/ISuppliers';



@Component({
  selector: 'fn-prices-modal',
  templateUrl: './prices-modal.component.html',
  styleUrls: ['./prices-modal.component.css']
})

export class PricesModalComponent implements OnInit {
  suppliers: ISupplierPrice[] = [];

  constructor(
    private _productService: ProductsService,
    private _supplierService: SupliersService,
    public activeModal: NgbActiveModal
  ) {}

  ngOnInit(): void {
    this._productService.getSuppliersOfProducts(this._productService.selectedProductPrice).subscribe((response) => {
      this.suppliers = response.suppliers;
    });
  }

  closeModal() {
    this.activeModal.close('Modal closed');
  }

}
