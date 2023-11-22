import { Component, OnInit, ViewChild } from '@angular/core';
import { GetReceptionOrderDto } from '../../models/get-reception-order';
import { BookingServiceService } from '../../services/booking-service/booking-service.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { Pagination } from '../../models/pagination';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';
import { GetPaginatedData } from '../../models/receptions-orders/GetPaginatedData';
@Component({
  selector: 'fn-consult-reception-orders',
  templateUrl: './consult-reception-orders.component.html',
  styleUrls: ['./consult-reception-orders.component.css'],
})
export class ConsultReceptionOrdersComponent implements OnInit {
  receptionOrderList: Pagination | undefined;
  private subscripciones = new Subscription();
  filterValue: string = '';
  filterType: string = 'supplier';
  currentPage: number = 1;
  totalPages: number = 1;
  onlyConfirmedOrders: boolean = false;
  loading: boolean = false;
  paginationData: GetPaginatedData = {
    page: 0,
    confirmed_orders_only: false,
    filter_type: '',
    filter_value: '',
  };
  constructor(
    private bookingService: BookingServiceService,
    private router: Router
  ) {}

  ngOnDestroy(): void {
    this.subscripciones.unsubscribe();
  }

  ngOnInit(): void {
    this.loading = true;
    this.subscripciones.add(
      this.bookingService
        .getFilteredReceptionOrders(this.paginationData)
        .subscribe({
          next: (response: Pagination) => {
            this.receptionOrderList = response;
            this.loading = false;
          },
          error: (error: Error) => {
            this.loading = false;
            alert(error.message);
          },
        })
    );
  }
  updateorderList() {
    this.loading = true;
    if (this.onlyConfirmedOrders) {
      this.subscripciones.add(
        this.bookingService
          .getFilteredReceptionOrders(this.paginationData)
          .subscribe({
            next: (response: Pagination) => {
              this.receptionOrderList = response;
              this.onlyConfirmedOrders = false;
              this.loading = false;
            },
            error: (error: Error) => {
              this.loading = false;
              alert(error.message);
            },
          })
      );
    } else {
      this.subscripciones.add(
        this.bookingService
          .getFilteredReceptionOrders(this.paginationData)
          .subscribe({
            next: (response: Pagination) => {
              this.receptionOrderList = response;
              this.onlyConfirmedOrders = true;
              this.loading = false;
            },
            error: (error: Error) => {
              this.loading = false;
              alert(error.message);
            },
          })
      );
    }
  }
  navigateToDetails(orderId: number) {
    this.router.navigate(['inventory', 'reception-orders', orderId, 'details']);
  }
  applyFilters(form: NgForm) {
    if (form.valid) {
      console.log(form.value.filterValue);
      this.subscripciones.add(
        this.bookingService
          .getFilteredReceptionOrders(this.paginationData)
          .subscribe({
            next: (response: Pagination) => {
              this.receptionOrderList = response;
              console.log('LLEGUE');
              console.log(this.receptionOrderList);
            },
            error: (error: Error) => {
              Swal.fire({
                icon: 'error',
                title: '¡Error!',
                text: error.message,
              });
            },
          })
      );
    }
  }
  previousPage(form: NgForm) {
    this.currentPage--;
    this.loading = true;
    this.subscripciones.add(
      this.bookingService
        .getFilteredReceptionOrders(this.paginationData)
        .subscribe({
          next: (response: Pagination) => {
            this.receptionOrderList = response;
            console.log('LLEGUE');
            console.log(this.receptionOrderList);
            this.loading = false;
          },
          error: (error: Error) => {
            this.loading = false;
            Swal.fire({
              icon: 'error',
              title: '¡Error!',
              text: error.message,
            });
          },
        })
    );
  }
  nextPage(form: NgForm) {
    this.currentPage++;
    this.loading = true;
    this.subscripciones.add(
      this.bookingService
        .getFilteredReceptionOrders(this.paginationData)
        .subscribe({
          next: (response: Pagination) => {
            this.receptionOrderList = response;
            console.log('LLEGUE');
            console.log(this.receptionOrderList);
            this.loading = false;
          },
          error: (error: Error) => {
            this.loading = false;
            Swal.fire({
              icon: 'error',
              title: '¡Error!',
              text: error.message,
            });
          },
        })
    );
  }
}
