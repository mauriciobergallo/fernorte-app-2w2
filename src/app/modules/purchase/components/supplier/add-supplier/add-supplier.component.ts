import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ISupplier } from '../../../models/ISuppliers';
import { SupliersService } from '../services/supliers.service';
import { Subscription } from 'rxjs';
import { ListSuplierComponent } from '../list-suplier/list-suplier.component';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'fn-add-supplier',
  templateUrl: './add-supplier.component.html',
  styleUrls: ['./add-supplier.component.css'],
})
export class AddSupplierComponent {
  show = true;

  suplier: ISupplier = {} as ISupplier;

  constructor(
    private _serviceSuplier: SupliersService,
    public activeModal: NgbActiveModal
  ) {}

  suscription = new Subscription();

  addSupplier() {
    this.suscription.add(
      this._serviceSuplier.addSuplier(this.suplier).subscribe(() => {
        this.closeModal();
        this._serviceSuplier.notifyProductCreated();
      })
    );
  }

  closeModal() {
    this.activeModal.close('Modal closed');
  }
}
