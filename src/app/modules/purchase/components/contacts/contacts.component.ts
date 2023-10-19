import { Component, EventEmitter, Input, OnDestroy, Output } from '@angular/core';
import { SupliersService } from '../../services/supliers.service';
import { Contact, IContacts } from '../../models/ISuppliers';
import { Subscription } from 'rxjs';

@Component({
  selector: 'fn-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css'],
})
export class ContactsComponent implements OnDestroy {
  @Input() contacts: IContacts = {} as IContacts;
  @Output() closeContacts = new EventEmitter<string>();
  @Output() refreshService = new EventEmitter<number>();
  buttonText: string = 'Agregar';

  showingList: boolean = true;

  contact: Contact = {} as Contact;

  constructor(private _serviceSuplier: SupliersService) {}
  
  
  ngOnDestroy(): void {
    this.suscription.unsubscribe();
  }

  suscription = new Subscription();

  switchShowing() {
    this.showingList = !this.showingList;
    this.refreshService.emit(this.contacts.id);
    this.buttonText = this.showingList ? 'Agregar' : 'Listado';
  }

  onSubmit() {
    this.suscription.add(
      this._serviceSuplier.addContact(this.contacts.id, this.contact).subscribe({
        next: (data: any) => {
          this.switchShowing();
        },
        error: (error) => alert('error al cargar: ' + error),
      })
    );
  }

  deleteContact(contact: Contact){
    this.suscription.add(
      this._serviceSuplier.deleteContact(this.contacts.id, contact).subscribe({
        next: (data: any) => {
          alert('Eliminado con exito')
          this.refreshService.emit(this.contacts.id);
        },
        error: (error: any) => alert('error al cargar: ' + error),
      })
    );
  }


  closeModal() {
    this.closeContacts.emit();
  }
}
