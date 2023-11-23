import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IPurchaseDetailRequestDTON, IPurchaseOrderRequestDTON, ISupplierProduct } from 'src/app/modules/purchase/models/ISuppliers';
import { BookingModalComponent } from '../booking-modal/booking-modal.component';
import { PurchaseOrderServiceService } from '../../services/purchase-order-service.service';
import { IBooking } from 'src/app/modules/purchase/models/ibooking';

@Component({
  selector: 'fn-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit {
  
  // item: any = {}
  purchaseOrderRequest: IPurchaseOrderRequestDTON = {} as IPurchaseOrderRequestDTON;
  booking: IBooking = {} as IBooking;

  constructor(private modalService: NgbModal, private purchaseOrderService: PurchaseOrderServiceService) { }

  ngOnInit(): void {
    this.purchaseOrderService.purchaseOrderRequest.subscribe({
      next: purchaseOrder => {
        this.purchaseOrderRequest = purchaseOrder;
      }
    });
    this.purchaseOrderService.booking.subscribe({
      next: newBooking => {
        this.booking = newBooking;
      }
    })
  }

  openModalNewSupplier(){
    this.modalService.open(BookingModalComponent, {
      backdrop: 'static',
      size: 'lg',
    });
  }

  // agregarFecha(item: any){
  //   this.item = item;
  //   this.purchaseService.deleteProductToBooking(item.idProduct);
  //   this.listBooking = {} as IBooking;
  // }

  irOrdenPago(){
    this.purchaseOrderService.setPurchaseBookingFlow(false);
    this.purchaseOrderService.setPurchasePreviewFlow(true);
  }

}
