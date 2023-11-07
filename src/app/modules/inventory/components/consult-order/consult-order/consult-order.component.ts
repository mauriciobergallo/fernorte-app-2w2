import { Component } from '@angular/core';
import { DeliverOrderService } from '../../../services/deliver-order.service';
import { DeilveryOrder } from '../../../models/deilvery-order';
import { Pagination } from '../../../models/pagination';
import { StateIconPipePipe } from '../../../pipes/state-icon-pipe.pipe';
import { Router } from '@angular/router';
@Component({
  selector: 'fn-consult-order',
  templateUrl: './consult-order.component.html',
  styleUrls: ['./consult-order.component.css'],
})
export class ConsultOrderComponent {
  orderId: string = '';
  deliveryOrder: Pagination | null = null;
  currentPage = 1;
  itemsPerPage = 10;
  totalPages = 1;
  pagesToShow: number[] = [];

  constructor(
    private deliveryorderService: DeliverOrderService,
    private router: Router
  ) {}

  navigateToDetails(orderId: number) {
    this.router.navigate(['/orders', orderId, 'details']);
  }

  search() {
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
        },
        (error) => {
          alert('Orden No encontrada');
          this.deliveryOrder = null;
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
      this.search();
    }
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.search();
    }
  }
  changePage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }
}
