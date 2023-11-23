import { Component, OnInit } from '@angular/core';
import { ISupplier, ISupplierProduct } from 'src/app/modules/purchase/models/ISuppliers';
import { SupliersService } from '../../../supplier/services/supliers.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { PurchaseOrderServiceService } from '../../services/purchase-order-service.service';
import { IBooking, Grouping } from 'src/app/modules/purchase/models/ibooking';
// import { Isupplier } from '../../../shared/interfaces/isupplier';


@Component({
  selector: 'fn-booking-modal',
  templateUrl: './booking-modal.component.html',
  styleUrls: ['./booking-modal.component.css']
})
export class BookingModalComponent implements OnInit {
  
  listProductOriginalToBooking: any[] = []
  listSelected: any[] =[]
  listSelectedBooking: any[] =[]

  receptionDate: string = ''; // Propiedad para almacenar la fecha de recepción
  receptionHour: string = ''; // Propiedad para almacenar la hora de recepción
  
  constructor(    
    public activeModal: NgbActiveModal,
    public purchaseService: PurchaseOrderServiceService
  ) {}


  ngOnInit(): void {
    this.getListOriginal();
  }

  //traigo los productos del carrito al iniciar el componente
  getListOriginal(){
    this.purchaseService.getCardProductList2().subscribe(
      (data: any[])=>
        {
          this.listProductOriginalToBooking = data;
        },
    );
  }


  closeModal() {
    this.activeModal.close('Modal closed');
  }

  //con los productos seleccionados del modal agrega a una lista para ponerle la fecha y hora de entrega
  addSelected(){

    // console.log("NACHO - ", JSON.stringify(this.purchaseService.getListProductSelected));
    // console.log("NACHO - ", JSON.stringify(this.purchaseService.getCardProductList));
    // console.log("NACHO - ", JSON.stringify(this.purchaseService.getListProductSelectedToBooking));
    // console.log("NACHO - ", JSON.stringify(this.purchaseService.getCardProductList));
    // console.log("NACHO - ", JSON.stringify(this.purchaseService.getCardProductList));

    //obtengo los elementos seleccionados del modal de acuerdo al checkbox
    this.listSelected= this.listProductOriginalToBooking.filter(item => item.isSelected);
    console.log("listSelected: " + this.listSelected)

    //borro los elementos seleccionados del modal de la lista original
    this.listSelected.forEach(element => {
      this.listSelected.findIndex(item => item.idProduct === element.idProduct);
      this.listProductOriginalToBooking.splice(this.listProductOriginalToBooking.findIndex(item => item.idProduct === element.idProduct), 1);
    });


    //  // Creo el objeto IBooking
    // const bookingObject: IBooking = {
    //   id_supplier: this.idSupplier,
    //   orders: this.listSelected.map(selectedItem => {
    //     const order: Grouping = {
    //       purchaseItem: [
    //         {
    //           quantity: selectedItem.quantity,
    //           id_product: selectedItem.idProduct
    //         }
    //         // Puedes agregar más detalles si es necesario
    //       ],
    //       receptiondate: this.receptionDate, // Asigna la fecha de recepción
    //       receptionhour: this.receptionHour // Asigna la hora de recepción
    //     };
    //     return order;
    //   })
    // };

    // // Llamo al servicio para enviar el objeto
    // this.purchaseService.setBooking(bookingObject.orders);
    console.warn("NACHO - Send booking object to purchase service");


    this.purchaseService.setListProductSelectedToBooking(this.listSelected);
    this.getDesdeService();
    this.activeModal.close('Modal closed');
  }

  getDesdeService(){
    this.purchaseService.getListProductSelectedToBooking().subscribe(
      (data: any[])=>{this.listSelectedBooking = data},
    )
  }

}
