import { Component, OnInit } from '@angular/core';
import { PurchaseOrderServiceService } from '../../purchase-order-container/services/purchase-order-service.service';
import { ISupliers } from '../../../models/ISuppliers';
import { SupliersService } from '../../../services/supliers.service';
import { ProductsService } from '../../../services/products.service';

@Component({
  selector: 'fn-hedear-supplier',
  templateUrl: './hedear-supplier.component.html',
  styleUrls: ['./hedear-supplier.component.css']
})
export class HedearSupplierComponent implements OnInit {

  constructor(private _productService: ProductsService) { }

  supplierList: ISupliers[] = []

  idSelected: number = 0

  ngOnInit(): void {
   this._productService.getProductsBySupplier(this.idSelected).subscribe(
    {
     next: (data) => {      console.log(data)    },
     error: (error) => {      console.log(error)    },
    }
   )
  }



}
