import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { IContacts, IProduct, ISupliers } from '../../models/ISuppliers';
import { PurchaseModule } from '../../purchase.module';
import { SupliersService } from '../../services/supliers.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'fn-list-suplier',
  templateUrl: './list-suplier.component.html',
  styleUrls: ['./list-suplier.component.css'],
})
export class ListSuplierComponent implements OnInit, OnDestroy {
  isOpenAddSupplier: boolean = false;
  isOpenContacts: boolean = false;
  isOpenAddContact: boolean = false;
  isOpenProductSupplier: boolean = false;

  suplier: ISupliers = {} as ISupliers;
  supliers: ISupliers[] = [];
  contacts: IContacts = {} as IContacts;


  supplierId: number = 0;


  suscription = new Subscription();

  constructor(private _serviceSuplier: SupliersService) {}

  ngOnDestroy(): void {
    this.suscription.unsubscribe();
  }

  ngOnInit(): void {
    this.refescarService();
  }

  showAddSupplier() {
    this.isOpenAddSupplier = true;
  }

  closeAddSupplier() {
    this.isOpenAddSupplier = false;
  }

  openContacts(id: number) {
    this.obtenerContactos(id);
    this.isOpenContacts = true;
  }

  closeContacts() {
    this.isOpenContacts = false;
  }

  openProducts(id: number){
    this.isOpenProductSupplier = true;
    this.supplierId = id;
  }


  refescarService() {
    this.suscription.add(
      this._serviceSuplier.getSupliers().subscribe({
        next: (data: ISupliers[]) => {
          this.supliers = data;
        },
        error: (error: any) => {
          console.log(error);
        },
      })
    );
  }

  obtenerContactos(id: number) {
    this.suscription.add(
      this._serviceSuplier.getContacts(id).subscribe({
        next: (data: IContacts) => {
          this.contacts = data;
        },
        error: (error: any) => {
          console.log(error);
        },
      })
    );
  }


  eliminar(suplier: ISupliers) {
    let confirmar = confirm(
      '¿Desea eliminar el proveedor ' + suplier.socialReason + '?'
    );

    if (!confirmar) {
      return;
    }

    this.suscription.add(
      this._serviceSuplier.deleteSuplier(suplier).subscribe({
        next: (data: ISupliers) => {
          this.refescarService();
        },
        error: (error) => alert('error al eliminar: ' + error),
      })
    );
  }


}
