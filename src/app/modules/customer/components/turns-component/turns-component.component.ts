import { Component } from '@angular/core';
import { TurnService } from '../../services/turn.service';
import { TurnResponse } from '../../models/turn-response';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { CaseConversionPipe } from '../../pipes/case-conversion.pipe';
import Swal from 'sweetalert2';


@Component({
  selector: 'fn-turns-component',
  templateUrl: './turns-component.component.html',
  styleUrls: ['./turns-component.component.css']
})
export class TurnsComponentComponent {

  show: boolean = false;
  showCustomer: boolean = false;
  showNoCustomer: boolean = false;
  document_number: string = '';
  inputText:string='';
  modalRef: NgbModalRef | undefined;
  turnNumber: number = 0;

  openModal(message: string) {
    this.modalRef = this.modalService.open(message, {
      windowClass: 'modal-lg' 
    });
  }

  cancelCustomer() {
    this.showNoCustomer = false;  
    this.showCustomer = false; 
}

  redirectToCustomer() {
    this.showCustomer = true;
    this.showNoCustomer = false;
  }

  redirectToNoCustomer() {
    this.showNoCustomer = true;
    this.showCustomer = false;
  }  

  constructor(private turnService: TurnService,
    private modalService:NgbModal, private conversion: CaseConversionPipe){}
    
  addToInput(value:string){
    this.inputText += value;
    this.document_number=this.inputText;
  }

  deleteLastCharInput() {
    if (this.inputText.length > 0) {
      this.inputText = this.inputText.slice(0, -1);
      this.document_number = this.inputText;
    }
  }
  
  // sendNoCustomer(){
    
  //     this.turnService.postData(this.document_number).subscribe(
  //       (response)=>{
  //         if(response){
            
  //           this.showCustomerInfo(response);
  //           const welcomeMessage=`Bienvenido, tu turno es el N°${response.number}, aguarde unos minutos`
  //           this.turnNumber = response.number;
  //           this.openModal(welcomeMessage);
  //           console.log(welcomeMessage, response.number);
            
          
  //         }
  //       },

  //     )
  //   }

  sendNoCustomer() {
    this.turnService.postData(this.document_number).subscribe(
      (response) => {
        if (response) {
          this.showCustomerInfo(response);
          const welcomeMessage = `Bienvenido, tu turno es el N°${response.number}, aguarde unos minutos`;
          this.turnNumber = response.number;

          
          Swal.fire({
            title: 'Bienvenido',
            text: welcomeMessage,
            icon: 'success',
          }).then(() => {
            this.clearFields();
          });
        }
      },
    );
  }

  sendDocumentNumber() {
    if (this.document_number) {
      this.turnService.postData(this.document_number).subscribe(
        (response) => {
          if (response) {
            this.showCustomerInfo(response);

            let welcomeMessage = '';
            if (response.first_name == null && response.last_name == null) {
              if (response.company_name) {
                welcomeMessage = `Bienvenido ${response.company_name}, tu número de turno es el N°${response.number}, y fue creado el ${response.created_at}`;
              }
            } else {
              welcomeMessage = `Bienvenido ${response.first_name} ${response.last_name}, tu número de turno es el N°${response.number}, y fue creado el ${response.created_at}`;
            }

            
            Swal.fire({
              title: 'Bienvenido',
              text: welcomeMessage,
              icon: 'success',
            }).then(() => {
              this.turnNumber = response.number;
              this.clearFields();
            });
          } else {
            this.sendNoCustomer();
          }
        },
        (error) => {
          
          Swal.fire({
            title: 'Error',
            text: 'El número de documento es incorrecto',
            icon: 'error',
          }).then(() => {
            this.clearFields();
          });
        }
      );
    } else {
      
      Swal.fire({
        title: 'Error',
        text: 'El número de documento está vacío, por favor ingrese un número válido.',
        icon: 'error',
      });
    }
  }
  clearFields() {
    this.document_number = '';
    this.showCustomer = false;
    this.showNoCustomer = false;
    this.inputText='';
  }
  
  showCustomerInfo(customerData: any) {
    console.log("Número: " + customerData.number);
    console.log("Nombre: " + customerData.first_name); 
    console.log("Apellido: " + customerData.last_name); 
    console.log("Fecha de creación: " + customerData.created_at);
    if (customerData.company_name) {
      console.log("Nombre de la empresa: " + customerData.company_name);
    }
  }

}
