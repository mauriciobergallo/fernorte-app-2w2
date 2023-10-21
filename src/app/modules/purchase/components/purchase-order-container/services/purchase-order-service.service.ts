import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Isupplier } from '../../shared/interfaces/isupplier';
import { Observable } from 'rxjs';
import { IProduct } from '../../../models/ISuppliers';

@Injectable({
  providedIn: 'root'
})
export class PurchaseOrderServiceService {
  
  idSupplier: number = 0
  productsSelected: IProduct[] = []

  constructor() { }




  


}
