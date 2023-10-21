import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { IContacts, IProduct, ISupliers } from '../../../models/ISuppliers';
import { PurchaseModule } from '../../../purchase.module';
import { SupliersService } from '../../../services/supliers.service';
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

  toastAddSupplier: boolean = false;
  toastAddContact: boolean = false;
  toastRemovedContact: boolean = false;

  suplier: ISupliers = {} as ISupliers;
  supliers: ISupliers[] = [];
  contacts: IContacts = {} as IContacts;

  supplier2: ISupliers = {} as ISupliers;

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

  openProducts(id: number) {
    this._serviceSuplier.getSuplier(id).subscribe({
      next: (data: ISupliers) => {
        this.supplier2 = data;
        this.isOpenProductSupplier = true;
      },
      error: (error: any) => {
        console.log(error);
      },
    });
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

  addedSupplier() {
    this.toastAddSupplier = true;
    this.refescarService();
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

  addedContact(){
    this.toastAddContact = true;
  }

  removedContact(){
    this.toastRemovedContact = true;
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
