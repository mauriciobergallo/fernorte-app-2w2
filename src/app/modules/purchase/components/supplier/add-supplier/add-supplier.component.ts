import {
  Component,
  ErrorHandler,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { ISupplier } from '../../../models/ISuppliers';
import { SupliersService } from '../services/supliers.service';
import { Subscription } from 'rxjs';
import { ListSuplierComponent } from '../list-suplier/list-suplier.component';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';

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
        Swal.fire({
          title: 'Proveedor agregado correctamente',
          icon: 'success',
          confirmButtonText: 'Aceptar',
        });
      })
    );
  }

  closeModal() {
    this.activeModal.close('Modal closed');
  }

  preventFunc($event: any) {
    if ($event.keyCode == 13) {
      $event.preventDefault();
      return false;
    }
    if ($event.srcElement.value.length > 10) {
      return false;
    }
    return null;
  }
}
