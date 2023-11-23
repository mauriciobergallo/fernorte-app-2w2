import { Component, OnInit } from '@angular/core';
import { IPurchaseDetailRequestDTON, IPurchaseOrderRequestDTON, ISupplier, ISupplierProduct } from 'src/app/modules/purchase/models/ISuppliers';
import { SupliersService } from '../../../supplier/services/supliers.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { PurchaseOrderServiceService } from '../../services/purchase-order-service.service';
import { IBooking, Grouping, GroupingItem } from 'src/app/modules/purchase/models/ibooking';
// import { Isupplier } from '../../../shared/interfaces/isupplier';


@Component({
  selector: 'fn-booking-modal',
  templateUrl: './booking-modal.component.html',
  styleUrls: ['./booking-modal.component.css']
})
export class BookingModalComponent implements OnInit {
  
  // listProductOriginalToBooking: any[] = []
  listSelected: any[] =[]
  listSelectedBooking: any[] =[]
  purchaseOrderRequest: IPurchaseOrderRequestDTON = {} as IPurchaseOrderRequestDTON;
  selectedDetails: { [productSupplierId: number|string]: boolean } = {};
  booking: IBooking = {} as IBooking;
  // selectedDetails: Map<string | number, boolean> = new Map();

  // receptionDate: string = ''; // Propiedad para almacenar la fecha de recepción
  // receptionHour: string = ''; // Propiedad para almacenar la hora de recepción
  
  constructor(    
    public activeModal: NgbActiveModal,
    public purchaseOrderService: PurchaseOrderServiceService
  ) {}


  ngOnInit(): void {
    this.purchaseOrderService.purchaseOrderRequest.subscribe({
      next: newPurchaseOrder => {
        this.purchaseOrderRequest = newPurchaseOrder;
      }
    });
    this.purchaseOrderService.booking.subscribe({
      next: newBooking => {
        this.booking = newBooking;
      }
    })
    // this.getListOriginal();
  }

  // //traigo los productos del carrito al iniciar el componente
  // getListOriginal(){
  //   this.purchaseOrderService.getCardProductList2().subscribe(
  //     (data: any[])=>
  //       {
  //         this.listProductOriginalToBooking = data;
  //       },
  //   );
  // }


  closeModal() {
    this.activeModal.close('Modal closed');
  }

  //con los productos seleccionados del modal agrega a una lista para ponerle la fecha y hora de entrega
  addSelected(){
    let grouping: Grouping = {} as Grouping;
    let groupingItems: GroupingItem[] = [];
    grouping.groupingItems = groupingItems;

    this.purchaseOrderRequest.purchaseDetails.forEach(detail => {
      if(this.selectedDetails[detail.productSupplierId]){
        let newGroupingItem: GroupingItem = {} as GroupingItem;
        newGroupingItem.id_product = detail.productSupplierId;
        newGroupingItem.quantity = detail.quantityReceived;
        groupingItems.push(newGroupingItem);
        // console.log("FOREACH LOOP OF GROUPING -- PASSED IF: ", JSON.stringify(detail));
        console.log("FOREACH LOOP OF GROUPING -- GROUPING ITEM: ", JSON.stringify(newGroupingItem));
        console.log("FOREACH LOOP OF GROUPING -- GROUPING ITEMSSSSS: ", JSON.stringify(groupingItems));
      }
      
    });

    console.log("AFTER CREATING GROUPING ", JSON.stringify(grouping));
    console.log("AFTER CREATING GROUPING ", JSON.stringify(this.selectedDetails));
    // console.log("AFTER CREATING GROUPING ", JSON.stringify(this.filterPurchaseOrderDetailsForBooking()));

    this.booking.groupings.push(grouping);
    this.purchaseOrderService.booking = this.booking;
    // console.log("AFTER CREATING GROUPING ", JSON.stringify(this.filterPurchaseOrderDetailsForBooking()));
    
    // console.log("NACHO - ALL PRODUCTS", JSON.stringify(this.purchaseOrderRequest.purchaseDetails))
    // console.log("NACHO - GROUPINGS", JSON.stringify(groupingItems))


    //obtengo los elementos seleccionados del modal de acuerdo al checkbox
    // this.listSelected= this.listProductOriginalToBooking.filter(item => item.isSelected);
    // console.log("listSelected: " + this.listSelected)

    // //borro los elementos seleccionados del modal de la lista original
    // this.listSelected.forEach(element => {
    //   this.listSelected.findIndex(item => item.idProduct === element.idProduct);
    //   this.listProductOriginalToBooking.splice(this.listProductOriginalToBooking.findIndex(item => item.idProduct === element.idProduct), 1);
    // });


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


    // this.purchaseOrderService.setListProductSelectedToBooking(this.listSelected);
    // this.getDesdeService();
    this.closeModal();
  }

  // getDesdeService(){
  //   this.purchaseOrderService.getListProductSelectedToBooking().subscribe(
  //     (data: any[])=>{this.listSelectedBooking = data},
  //   )
  // }

  filterPurchaseOrderDetailsForBooking(): IPurchaseDetailRequestDTON[]{
    let filteredDetails: IPurchaseDetailRequestDTON[] = [];
    this.purchaseOrderRequest.purchaseDetails.forEach(detail => {
      if(!this.selectedDetails[detail.productSupplierId]){
        filteredDetails.push(detail);
      }
    });
    return filteredDetails;
  }

  compareTruths(detail: IPurchaseDetailRequestDTON): boolean{
    // let result: boolean = this.selectedDetails[detail.productSupplierId] == undefined ? false : this.selectedDetails[detail.productSupplierId];
    // console.log("--------------" + detail.productName + "---------------");
    // console.log("NACHO- COMPARE TRUTHS: DETAIL ", detail);
    // console.log("NACHO- COMPARE TRUTHS: MAP ", this.selectedDetails);
    // console.log("NACHO- COMPARE TRUTHS: MAP CONTENT ", this.selectedDetails[detail.productSupplierId]);
    // console.log("NACHO- COMPARE TRUTHS: RESULT ", result);
    // console.log("\\/\\/\\/\\/\\/\\/\\/\\/\\/\\/\\/");
    // return result;
    return Math.random() >= 0.5;
  }
}
