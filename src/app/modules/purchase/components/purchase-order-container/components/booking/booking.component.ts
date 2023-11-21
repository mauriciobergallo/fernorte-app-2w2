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
  
 listBooking: IBooking ={} as IBooking;
 item: any = {}


  constructor(private modalService: NgbModal, private purchaseService: PurchaseOrderServiceService) { }

  ngOnInit(): void {
    // this.getListBooking();
    this.getlistBooking();
  }


  // getListBooking(){
  //   this.purchaseService.getListProductSelectedToBooking().subscribe
  //     (
  //       (data: any)=>{this.listBooking = data; },
  //     )
  // }

  getlistBooking(){
    this.purchaseService.getBooking().subscribe({
      next: (booking) => {this.listBooking = booking; alert("booking: " + JSON.stringify(this.listBooking))}
    })
  }



  openModalNewSupplier(){
    this.modalService.open(BookingModalComponent, {
      backdrop: 'static',
      size: 'lg',
    });
  }

  agregarFecha(item: any){
    this.item = item;
    this.purchaseService.deleteProductToBooking(item.idProduct);
    this.listBooking = {} as IBooking;
    
  }

  irOrdenPago(){
    this.purchaseService.setPurchaseBookingFlow(false);
    this.purchaseService.setPurchasePreviewFlow(true);
  }
}
