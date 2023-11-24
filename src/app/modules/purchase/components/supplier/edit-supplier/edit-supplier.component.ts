import {
  Component,
  ErrorHandler,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { ISupplier } from '../models/ISuppliers';
import { SupliersService } from '../services/supliers.service';
import { Subscription } from 'rxjs';
import { ListSuplierComponent } from '../list-suplier/list-suplier.component';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';

@Component({
  selector: 'fn-edit-supplier',
  templateUrl: './edit-supplier.component.html',
  styleUrls: ['./edit-supplier.component.css'],
})
export class EditSupplierComponent {
  show = true;

  suplier: ISupplier = this._serviceSuplier.editingSupplier;

  constructor(
    private _serviceSuplier: SupliersService,
    public activeModal: NgbActiveModal
  ) {}

  suscription = new Subscription();

    logsupplier(){
      console.log(this.suplier)
    }

  addSupplier() {
    this.suscription.add(
      this._serviceSuplier.updateSuplier(this.suplier).subscribe(() => {
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
