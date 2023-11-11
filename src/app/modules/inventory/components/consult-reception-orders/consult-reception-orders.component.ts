import { Component, OnInit, ViewChild } from '@angular/core';
import { GetReceptionOrderDto } from '../../models/get-reception-order';
import { BookingServiceService } from '../../services/booking-service/booking-service.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'fn-consult-reception-orders',
  templateUrl: './consult-reception-orders.component.html',
  styleUrls: ['./consult-reception-orders.component.css'],
})
export class ConsultReceptionOrdersComponent implements OnInit {
  receptionOrderList: GetReceptionOrderDto[] = [];
  private subscripciones = new Subscription();

  constructor(
    private bookingService: BookingServiceService,
    private router: Router
  ) {}

  ngOnDestroy(): void {
    this.subscripciones.unsubscribe();
  }

  ngOnInit(): void {
    this.fillTable();
  }

  private fillTable() {
    this.bookingService.getAllReceptionOrders().subscribe({
      next: (resp) => {
        resp.forEach((element) => {
          if (element.supplier_name === null) {
            element.supplier_name = 'N/A';
          }
        });
        this.receptionOrderList = resp;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
  navigateToDetails(orderId: number) {
    this.router.navigate(['reception-orders', orderId, 'details']);
  }
}
