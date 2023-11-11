import { Component, OnDestroy, OnInit } from '@angular/core';
import { DeilveryOrder } from '../../models/deilvery-order';
import { BookingServiceService } from '../../services/booking-service/booking-service.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { IUpdatedDetailDto } from '../../models/receptions-orders/updatedDetailDto.interface';
import { GetReceptionOrderDto } from '../../models/get-reception-order';

@Component({
  selector: 'fn-reception-order-details',
  templateUrl: './reception-order-details.component.html',
  styleUrls: ['./reception-order-details.component.css'],
})
export class ReceptionOrderDetailsComponent implements OnInit, OnDestroy {
  orderData: GetReceptionOrderDto | undefined;
  details: IUpdatedDetailDto[] = [];
  subscriptions: Subscription = new Subscription();
  constructor(
    private bookingService: BookingServiceService,
    private activatedRoute: ActivatedRoute
  ) {}
  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
  ngOnInit(): void {
    this.subscriptions.add(
      this.activatedRoute.params.subscribe((params) => {
        this.bookingService
          .getReceptionOrderDetailsById(params['id'])
          .subscribe({
            next: (response: IUpdatedDetailDto[]) => {
              this.details = response;
              console.log(this.details);
            },
            error: (error: Error) => {
              alert(error);
            },
          });
        this.bookingService.getReceptionOrderById(params['id']).subscribe({
          next: (response: GetReceptionOrderDto) => {
            this.orderData = response;
          },
          error: (error: Error) => {
            alert(error);
          },
        });
      })
    );
  }

  getStatusText(state: string | undefined): string {
    switch (state) {
      case 'CREATED':
        return 'Creado';
      case 'RECEIVED_INCORRECTLY':
        return 'Parcialmente entregado';
      case 'RECEIVED_CORRECTLY':
        return 'Entregado';
      default:
        return '';
    }
  }
}
