import { Component } from '@angular/core';
import { TurnService } from '../../services/turn.service';
import { CaseConversionPipe } from '../../pipes/case-conversion.pipe';

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

  show: boolean = false;

  constructor(public turnService: TurnService, private conversion: CaseConversionPipe){}

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
      this.turnService.postData(this.documentNumber).subscribe(
        (response) => {
          if (response) {
            this.showCustomerInfo(response);
            response = this.conversion.toCamelCase(response);
            //TODO: ver formato hora (me devuelve la hora de Europa)
            const welcomeMessage = `Bienvenido ${response.firstName}, tu número de turno es ${response.number}, y fue creado el ${response.createdAt}`;
            alert(welcomeMessage);
            this.clearFields();
          } 
        },
        (error) => {          
          alert("El numero de documento es incorrecto");
          this.clearFields();
        }
      );
    } else {
      alert('El número de documento está vacío, por favor ingrese un número válido.');
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
