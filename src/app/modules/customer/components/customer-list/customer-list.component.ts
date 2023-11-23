import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { CustomerService } from '../../services/customer.service';
import { Customer } from '../../models/customer';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UpdateCustomerComponent } from '../update-customer/update-customer.component';
import { CreateCustomerComponent } from '../create-customer/create-customer.component';
import { CustomerRequest } from '../../models/customer-request';
import { jsPDF } from "jspdf";
import 'jspdf-autotable';

@Component({
  selector: 'fn-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent implements OnInit {

downloadPDF() {
  let data = this.customerList
  const pdf = new jsPDF() as any;

  let containsCompany = false;
  let containsPerson = false;
  let headers = [""];
  let dataForPDF: any
  let socialReason: string | undefined;

  data.forEach(element => {
    if(element.customer_type == "Fisica"){
      containsPerson = true;
    }

    if(element.customer_type == "Juridica"){
      containsCompany = true
    }
    
  });

  if(containsCompany && !containsPerson){

    headers = ["Empresa", "Condición de Iva",
    "Telefono", "Fecha de nacimiento/fundación", "Dirección",
  "Tipo de documento", "Documento", "Tipo de cliente", ];
  
  dataForPDF = this.customerList.map((item) => {

    if (item.customer_type === "Fisica") {
      socialReason = `${item.first_name} ${item.last_name}`
    } 
    if (item.customer_type === "Juridica") {
      socialReason = item.company_name
    } 

    const formattedDate = `${item.birth_date.getDate()}/${item.birth_date.getMonth() + 1}/${item.birth_date.getFullYear()}`;


    return [socialReason, item.iva_condition,
       item.phone_number, formattedDate, item.address, item.document_type,
    item.document_number, item.customer_type]; // Devuelve un array con los valores deseados
  });
  


  }

  if(!containsCompany && containsPerson){
    
    headers = ['Nombre', "Condición de Iva",
     "Telefono", "Fecha de nacimiento/fundación", "Dirección",
  "Tipo de documento", "Documento", "Tipo de cliente", ];
  
  dataForPDF = this.customerList.map((item) => {

    if (item.customer_type === "Fisica") {
      socialReason = `${item.first_name} ${item.last_name}`
    } 
    if (item.customer_type === "Juridica") {
      socialReason = item.company_name
    } 
    const formattedDate = `${item.birth_date.getDate()}/${item.birth_date.getMonth() + 1}/${item.birth_date.getFullYear()}`;


    return [socialReason, item.iva_condition,
       item.phone_number, formattedDate, item.address, item.document_type,
    item.document_number, item.customer_type]; // Devuelve un array con los valores deseados
  });

  }


  if(containsCompany && containsPerson){
     headers = ["Nombre / Razón social", "Condición de Iva",
  "Telefono", "Fecha de nacimiento/fundación", "Dirección",
"Tipo de documento", "Documento", "Tipo de cliente", ];

dataForPDF = this.customerList.map((item) => {

  if (item.customer_type === "Fisica") {
    socialReason = `${item.first_name} ${item.last_name}`
  } 
  if (item.customer_type === "Juridica") {
    socialReason = item.company_name
  } 
  const formattedDate = `${item.birth_date.getDate()}/${item.birth_date.getMonth() + 1}/${item.birth_date.getFullYear()}`;


  return [socialReason, item.iva_condition,
    item.phone_number, formattedDate, item.address, item.document_type,
  item.document_number, item.customer_type]; // Devuelve un array con los valores deseados
});


  }




  // dataForPDF = this.customerList.map((item) => {
  //   return [item.first_name, item.last_name]; // Devuelve un array con los valores deseados
  // });
  
data = dataForPDF;


this.generatePdf(data, headers, "Listado de clientes");

}


  generatePdf(data: any[], columns: any[], title: string): void {
    const doc = new jsPDF() as any;

    // Configurar título
    doc.text(title, 10, 10);

    

    // Configurar la tabla
    doc.autoTable({
      startY: 20,
      head: [columns],
      body: data,
      autoSize: true,
      theme: 'grid', // Otra opción de tema que puede ser útil
      columnStyles: { 0: { cellWidth: 'auto' }, 1: { cellWidth: 'auto' } }, // Ajusta según tus necesidades
      styles: { overflow: 'linebreak' }, // Permite saltos de línea
      bodyStyles: { minCellHeight: 10 },
      cellStyles: { text: { fontSize: 7, fontStyle: 'normal' } },
    });

    // Guardar o mostrar el PDF
    doc.save('table.pdf');
  }

  downloadCSV() {
    let data = this.customerList;

    let socialReason: string | undefined;

    console.log("Test")



    let csvContent = 'Nombre/Razón social,Condición de IVA,Telefono,Fecha de nacimiento/fundación,Dirección,Tipo de documento,Documento,Tipo de cliente\n';

   


    data.forEach((item)=> {

            if (item.customer_type === "Fisica") {
        socialReason = `${item.first_name} ${item.last_name}`
      } 
      if (item.customer_type === "Juridica") {
        socialReason = item.company_name
      } 
         const formattedDate = `${item.birth_date.getDate()}/${item.birth_date.getMonth() + 1}/${item.birth_date.getFullYear()}`;

      //       Nombre/Razón social,Condición de IVA,Telefono,Fecha de nacimiento/fundación,Dirección,Tipo de documento,Documento,Tipo de cliente\n'
      csvContent += `${socialReason} ,${item.iva_condition},${item.phone_number},${formattedDate},${item.address},${item.document_type},${item.document_number},${item.customer_type}\n`;
    });


    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', 'ReportePreciosHistoricos.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);


  }
    
    
    


  


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
      company_name: "ABC Inc",
      email: "jane.smith@example.com",
      phone_number: "987-654-3210",
      birth_date: new Date("1985-05-15"),
      document_number: "XYZ789",
      document_type: "Passport",
      customer_type: "Juridica",
      customer_category: "PLATA",
    },

    {
      id_customer: 3,
      first_name: "",
      last_name: "",
      company_name: "Empresa Rodolfo",
      email: "jane.smith@example.com",
      phone_number: "987-654-3210",
      birth_date: new Date("1985-05-15"),
      document_number: "XYZ789",
      document_type: "Passport",
      customer_type: "Juridica",
      customer_category: "PLATA",
    }
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