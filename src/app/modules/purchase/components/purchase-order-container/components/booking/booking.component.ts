import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ISupplierProduct } from 'src/app/modules/purchase/models/ISuppliers';
import { BookingModalComponent } from '../booking-modal/booking-modal.component';
import { PurchaseOrderServiceService } from '../../services/purchase-order-service.service';
import { IBooking } from 'src/app/modules/purchase/models/ibooking';

@Component({
  selector: 'fn-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit {
  
  item: any = {}

  constructor(private modalService: NgbModal, private purchaseService: PurchaseOrderServiceService) { }

  ngOnInit(): void {
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
    this.purchaseService.setPurchaseBookingFlow(false);
    this.purchaseService.setPurchasePreviewFlow(true);
  }

  get booking(){
    return this.purchaseService.getBooking();
  }
}
