import { Component } from '@angular/core';
import { TurnService } from '../../services/turn.service';

@Component({
  selector: 'fn-turns-component',
  templateUrl: './turns-component.component.html',
  styleUrls: ['./turns-component.component.css']
})
export class TurnsComponentComponent {
  ToCustomer: boolean = false;
  ToNoCustomer: boolean = false;
  Main: boolean = true;
  inputText:string='';
  documentNumber:string='';

  constructor(public turnService: TurnService){}

  redirectToCustomer() {
    this.ToCustomer = true;
    this.Main = false;
  }

  redirectToNoCustomer() {
    this.ToNoCustomer = true;
    this.Main = false;
  }

  eventBack(){
    this.Main = true;
    this.ToCustomer = false;
    this.ToNoCustomer = false;
  }

  addToInput(value:string){
    this.inputText += value;
    this.documentNumber=this.inputText;
  }

  deleteLastCharInput(){
    this.inputText = this.inputText.slice(0, -1);
  }

  sendDocumentNumber() {
    if (this.documentNumber) {
      this.turnService.postData(this.documentNumber).subscribe(response => {
        this.showCustomerInfo(response);
        const welcomeMessage = `Bienvenido ${response.firstName}, tu número de turno es ${response.number}, y fue creado el ${response.createdAt}`;
        alert(welcomeMessage);
        this.clearFields();
      });
    }
  }  
  
  clearFields() {
    this.inputText = ''; 
    this.documentNumber = ''; 
    this.ToCustomer = false; 
    this.ToNoCustomer = false; 
    this.Main = true; 
  }
  
  showCustomerInfo(customerData: any) {
    // Muestra la información del cliente en la interfaz de usuario
    console.log("Número: " + customerData.number);
    console.log("Nombre: " + customerData.firstName);
    console.log("Apellido: " + customerData.lastName);
    console.log("Fecha de creación: " + customerData.createdAt);
    if (customerData.companyName) {
      console.log("Nombre de la empresa: " + customerData.companyName);
    }
  }
}
