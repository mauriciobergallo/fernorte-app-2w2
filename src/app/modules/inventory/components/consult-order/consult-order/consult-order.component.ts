import { Component, OnInit } from '@angular/core';
import { DeliverOrderService } from '../../../services/deliver-order.service';
import { Pagination } from '../../../models/pagination';
import { Router } from '@angular/router';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { DeliveryOrdersMockService } from '../../../services/delivery-order-mock.service';

@Component({
  selector: 'fn-consult-order',
  templateUrl: './consult-order.component.html',
  styleUrls: ['./consult-order.component.css'],
})
export class ConsultOrderComponent implements OnInit {
  orderId: string = '';
  deliveryOrder: Pagination = new Pagination();
  currentPage = 1;
  itemsPerPage = 10;
  totalPages = 1;
  pagesToShow: number[] = [];
  loading: boolean = false;
  constructor(
    private deliveryorderService: DeliverOrderService,
    private router: Router,
    public serviceMock: DeliveryOrdersMockService
  ) {}
  ngOnInit(): void {
    this.iniciarlizar();
    console.log(this.deliveryOrder);
  }

  iniciarlizar() {
    this.deliveryOrder = new Pagination();
    this.deliveryOrder.items = this.serviceMock.originallist;
    this.deliveryOrder.page = 1;
    this.deliveryOrder.totalPages = this.serviceMock.originallist.length / 15;
    this.totalPages = this.serviceMock.originallist.length / 15;
  }

  navigateToDetails(orderId: number) {
    this.router.navigate(['inventory', 'orders', orderId, 'details']);
  }

  search() {
    this.loading = true;
    this.deliveryorderService
      .getDeliveryOrder(this.orderId, this.currentPage - 1)
      .subscribe(
        (result) => {
          result.items = result.items.sort((a, b) => {
            const statusOrder = [
              'CREATED',
              'PARTIALLY_DELIVERED',
              'DELIVERED',
              'CANCELED',
            ];
            return statusOrder.indexOf(a.state) - statusOrder.indexOf(b.state);
          });
          this.deliveryOrder = result;
          this.totalPages = result.totalPages;
          this.loading = false;
        },
        (error) => {
          this.loading = false;
          alert('Orden No encontrada');
        }
      );
  }

  getTooltipText(state: string): string {
    switch (state) {
      case 'CREATED':
        return 'Estado: Creado';
      case 'PARTIALLY_DELIVERED':
        return 'Estado: Parcialmente entregado';
      case 'DELIVERED':
        return 'Estado: Entregado';
      case 'CANCELED':
        return 'Estado: Cancelado';
      default:
        return '';
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.deliveryOrder.splitList(this.currentPage);
    }
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.deliveryOrder.splitList(this.currentPage);
    }
  }
  changePage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }
  onOrderIdChange(value: string): void {
    this.orderId = value.trim();
    this.serviceMock.filterByString(this.orderId);
    this.deliveryOrder.items = this.serviceMock.listFiltered;
    console.log(this.serviceMock.listFiltered.length);
    this.totalPages = this.serviceMock.listFiltered.length / 15;
  }

  filterByDate(event: { from: NgbDate | null; to: NgbDate | null }) {
    this.deliveryOrder.items = this.serviceMock.filterByDate(event);
    this.orderId = '';
    this.totalPages = this.serviceMock.listFiltered.length / 15;
  }

  ClearFilter() {
    this.deliveryOrder.items = this.serviceMock.clearFilter();
    this.orderId = '';
    this.totalPages = this.serviceMock.listFiltered.length / 15;
  }
}
