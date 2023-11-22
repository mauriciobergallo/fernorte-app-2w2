import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { CustomerService } from '../../services/customer.service';
import { Customer } from '../../models/customer';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UpdateCustomerComponent } from '../update-customer/update-customer.component';
import { CreateCustomerComponent } from '../create-customer/create-customer.component';
import { CustomerRequest } from '../../models/customer-request';

@Component({
  selector: 'fn-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent implements OnInit {

  customerList: Customer[] = [];
  searchInput: string = "";
  selectedCategory: string ="todos";
  selectedTipoCliente: string ="todos";
  @ViewChild('customerForm') updateCustomerModal: TemplateRef<any> | undefined;
  selectedCustomerId: number | null = null;

  constructor(private customerService: CustomerService,private modalService: NgbModal) {}

  ngOnInit(): void {
    this.loadUser();
  this.customerList = this.customers;
  }

  //Este mock tiene que remplazarse por un getall de clientes, podría hacerse en el loadUser
  //La lista "customers" va a tener un valor inmutable, mientras que customerList va cambiando
  //Según los filtros que se apliquen

  newCustomer: CustomerRequest =
    {
      firstName: '',
      lastName: '',
      companyName: '',
      ivaCondition: '',
      email: '',
      birthDate: '',
      idDocumentType:0, 
      documentNumber: '', 
      address: '',
      phoneNumber: '',
      customerType: '',
    }

   customers: Customer[] = [
    {
      id_customer: 1,
      first_name: "John",
      last_name: "Doe",
      company_name: "ABC Inc",
      iva_condition: "IVA Registered",
      email: "john.doe@example.com",
      phone_number: "123-456-7890",
      birth_date: new Date("1990-01-01"),
      address: "123 Main St, City",
      document_number: "ABC123",
      document_type: "ID Card",
      customer_type: "Fisica",
      discount_factor: 0.1,
      customer_category: "ORO",
    },
    {
      id_customer: 2,
      first_name: "Jane",
      last_name: "Smith",
      email: "jane.smith@example.com",
      phone_number: "987-654-3210",
      birth_date: new Date("1985-05-15"),
      document_number: "XYZ789",
      document_type: "Passport",
      customer_type: "Juridica",
      customer_category: "PLATA",
    },
    // Add more customer objects as needed
  ];

  loadUser() {
    this.customerService.getAllCustomer().subscribe((data: Customer[]) => {
      this.customerList = data;
    });
  }

  onOptionClick(customer: Customer) {

    const modalRef = this.modalService.open(UpdateCustomerComponent, { ariaLabelledBy: 'modal-basic-title' });
    modalRef.componentInstance.customerToUpdate = customer; // Pasar el ID del cliente al componente de actualización
    modalRef.componentInstance.onlyForRead = true;

  }


  filterName(event: any, userInput: boolean) {

    
if(userInput){

  this.searchInput = event.target.value;
  let filtro = event.target.value;
}

this.customerList = this.customers;

let filtroNombre: Customer[] = this.buscarNombre(this.searchInput );

 let filtroApellido: Customer[] = this.buscarApellido(this.searchInput );
 let filtroDocumento: Customer[] = this.buscarDocumento(this.searchInput );

 let listaFiltrada: Customer[] = filtroNombre
.concat(filtroApellido, filtroDocumento)
.filter((item, index, array) => array.indexOf(item) === index);

if(this.selectedCategory != "todos"){
  listaFiltrada = listaFiltrada.filter(c =>{

    return c.customer_category?.startsWith(this.selectedCategory)
    
      })
}

if(this.selectedTipoCliente != "todos"){

  listaFiltrada = listaFiltrada.filter(c =>{

    return c.customer_type?.startsWith(this.selectedTipoCliente)
    
      })
}


 this.customerList = listaFiltrada;
 

  }

categoryChange(event:any, userChange: boolean){
  console.log("EVENTO CAMBIO", event.target.value);
  this.customerList = this.customers;
  let categoria = "";
  if(userChange){
    this.selectedCategory = event.target.value;
    categoria = event.target.value;
  }
  else{
  
     categoria = this.selectedCategory ;
  }
  
  
  if(this.searchInput != ""){
    this.filterName(this.searchInput, false);
  }

  if(this.selectedTipoCliente != "todos"){
    this.customerTypeChange(this.selectedTipoCliente, false);
  }


  if(categoria !="todos"){
  this.customerList = this.customerList.filter(c =>{

return c.customer_category?.startsWith(categoria)

  })}

 

}

customerTypeChange(event:any, userChange: boolean){

  let tipoCliente = "";
  this.customerList = this.customers;
  if(userChange){
    this.selectedTipoCliente = event.target.value;
    tipoCliente = event.target.value;
  }
  else{
    tipoCliente = this.selectedTipoCliente;
  }

  if(this.selectedCategory != "todos"){
    this.customerList = this.customerList.filter(c =>{
  
      return c.customer_category?.startsWith(this.selectedCategory)
      
        })
  }


  if(tipoCliente != "todos"){
    this.customerList = this.customerList .filter(c =>{
  
      return c.customer_type?.startsWith(tipoCliente)
      
        })
  }

  
  if(this.searchInput != ""){
    this.filterName(this.searchInput, false);
  }




}






  buscarNombre(palabraIncompleta: string): Customer[] {
    palabraIncompleta = palabraIncompleta.toLowerCase(); // Convierte a minúsculas para hacer la búsqueda no sensible a mayúsculas

    return this.customerList.filter(palabra => {
      const palabraEnMinusculas = palabra.first_name.toLowerCase();
      return palabraEnMinusculas.startsWith(palabraIncompleta);
    });
  }



  buscarApellido(palabraIncompleta: string): Customer[] {
    palabraIncompleta = palabraIncompleta.toLowerCase(); // Convierte a minúsculas para hacer la búsqueda no sensible a mayúsculas

    return this.customerList.filter(palabra => {
      const palabraEnMinusculas = palabra.last_name.toLowerCase();
      return palabraEnMinusculas.startsWith(palabraIncompleta);
    });
  }


  buscarDocumento(palabraIncompleta: string): Customer[] {
    palabraIncompleta = palabraIncompleta.toLowerCase(); // Convierte a minúsculas para hacer la búsqueda no sensible a mayúsculas

    return this.customerList.filter(palabra => {
      const palabraEnMinusculas = palabra.document_number.toLowerCase();
      return palabraEnMinusculas.startsWith(palabraIncompleta);
    });
  }




  openUpdateCustomerModal(customer: Customer) {
    console.log(customer);
    this.selectedCustomerId = customer.id_customer;
    const modalRef = this.modalService.open(UpdateCustomerComponent, { ariaLabelledBy: 'modal-basic-title' });
    modalRef.componentInstance.customerToUpdate = customer; // Pasar el ID del cliente al componente de actualización
    
    modalRef.componentInstance.updateClicked.subscribe(() => {
      // Abrir el modal del formulario de actualización
      this.modalService.open(this.updateCustomerModal);
      console.log('se abrio el modal del cliente');
      
    });
  }

  openNewCustomerModal() {
   
    const modalRef = this.modalService.open(CreateCustomerComponent, { ariaLabelledBy: 'modal-basic-title', backdrop: 'static' });
     
    modalRef.componentInstance.updateClicked.subscribe(() => {
      // Abrir el modal del formulario de actualización
      this.modalService.open(this.newCustomer);
      console.log('se abrio el modal del cliente');

    });
  }
}