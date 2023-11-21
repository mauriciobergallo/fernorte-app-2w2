import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SupliersService } from '../../services/supliers.service';
import { IContact } from 'src/app/modules/purchase/models/ISuppliers';
import { Subscription } from 'rxjs';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';

@Component({
  selector: 'fn-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css'],
})
export class ContactsComponent implements OnInit {
  showingList: boolean = true;

  contact: any = {}

  contacts: IContact = this._serviceSuplier.contacts;

  getContacts() {
    this._serviceSuplier
      .getContacts(this._serviceSuplier.selectedSupplier)
      .subscribe({
        next: (data: any) => {
          this.contacts = data;
        },
        error: (error: any) => {
          console.log(error);
        },
      });
  }

  ngOnInit() {
    this.getContacts();
  }

  constructor(
    private _serviceSuplier: SupliersService,
    public activeModal: NgbActiveModal
  ) {}

  closeModal() {
    this.activeModal.close('Modal closed');
  }

  suscription = new Subscription();

  switchShowing() {
    this.showingList = !this.showingList;
  }

  onSubmit() {
    /* this.suscription.add(
      this._serviceSuplier.addContact(this.contact).subscribe({
        next: (data: any) => {
          this.contact.contactType = '';
          this.contact.contactValue = '';
          this.switchShowing();
          this.getContacts();
          Swal.fire({
            title: 'Transaccion completada',
            text: 'Contacto Asignado con Exito!',
            icon: 'success',
          });
        },
        error: (error) => alert('error al cargar: ' + error),
      })
    ); */
  }

  deleteContact(contact: any) {
    /* this.suscription.add(
      this._serviceSuplier
        .deleteContact(this._serviceSuplier.selectedSupplier, contact)
        .subscribe({
          next: (data: any) => {
            this.getContacts();
            Swal.fire({
              title: 'Transaccion completada',
              text: 'Contacto Eliminado con Exito!',
              icon: 'success',
            });
          },
          error: (error: any) => alert('error al cargar: ' + error),
        })
    ); */
  }
}
