import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { IProduct, ISupplier } from '../../../models/ISuppliers';
import { PurchaseModule } from '../../../purchase.module';
import { SupliersService } from '../services/supliers.service';
import { Subscription } from 'rxjs';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ContactsComponent } from '../contacts/contacts.component';
import { AddSupplierComponent } from '../add-supplier/add-supplier.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'fn-list-suplier',
  templateUrl: './list-suplier.component.html',
  styleUrls: ['./list-suplier.component.css'],
})
export class ListSuplierComponent implements OnInit {
  page = 1;
  pageSize = 3;
  suscription = new Subscription();
  collapsed = true;
  suppliers: ISupplier[] = [];
  filteredSuppliers: ISupplier[] = [];
  showValue: string = '2';

  constructor(
    private _serviceSuplier: SupliersService,
    private modalService: NgbModal,
    private _supplierService: SupliersService
  ) {}

  ngOnInit() {
    this.loadSuppliers();
    this._serviceSuplier.productCreated$.subscribe(() => {
      this.loadSuppliers();
    });
  }

  filterSuppliers(searchText: string) {
    this.filteredSuppliers = this.suppliers.filter((supplier) => {
      const cuitStr = supplier.cuit.toString(); // Convert cuit to a string
      return (
        supplier.socialReason
          .toLowerCase()
          .includes(searchText.toLowerCase()) ||
        supplier.fantasyName.toLowerCase().includes(searchText.toLowerCase()) ||
        cuitStr.includes(searchText) || // Compare as a string
        supplier.address.toLowerCase().includes(searchText.toLowerCase())
      );
    });
  }

  loadSuppliers() {
    if (this.showValue == '1') {
      this._supplierService.getSupliers().subscribe((suppliers) => {
        this.suppliers = suppliers;
        this.filteredSuppliers = suppliers;
      });
    } else if (this.showValue == '2') {
      this._supplierService.getActiveSuppliers().subscribe((suppliers) => {
        this.suppliers = suppliers;
        this.filteredSuppliers = suppliers;
      });
    } else if (this.showValue == '3') {
      this._supplierService.getInactiveSuppliers().subscribe((suppliers) => {
        this.suppliers = suppliers;
        this.filteredSuppliers = suppliers;
      });
    }
  }

  showFunction(isActive: boolean | undefined) {
    if (this.showValue == '1') {
      return true;
    } else if (isActive && this.showValue == '2') {
      return true;
    } else if (!isActive && this.showValue == '3') {
      return true;
    }
    return false;
  }

  openModal(id: number) {
    this.modalService.open(ContactsComponent, {
      backdrop: 'static',
      size: 'lg',
    });
    this._serviceSuplier.selectedSupplier = id;
  }

  openModalNewSupplier() {
    this.modalService.open(AddSupplierComponent, {
      backdrop: 'static',
      size: 'lg',
    });
  }

  ngOnDestroy(): void {
    this.suscription.unsubscribe();
  }

  openProducts(id: number) {
    this._serviceSuplier.selectedSupplier = id;
  }

  obtenerContactos(id: number) {
    this.suscription.add(this._serviceSuplier.getContacts(id).subscribe({}));
  }
  deleteSupplier(id: number) {
    this.suscription.add(
      this._serviceSuplier.deleteSuplier(id).subscribe(() => {
        this.loadSuppliers();
        Swal.fire({
          title: 'Transaccion completada',
          text: 'Proveedor Eliminado con Exito!',
          icon: 'success',
        });
      })
    );
  }

  onPageChange(page: number) {
    this.page = page;
  }
}
