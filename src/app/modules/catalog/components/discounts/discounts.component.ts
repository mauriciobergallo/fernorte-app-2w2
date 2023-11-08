import { Component, OnInit } from '@angular/core';
import { IDiscount } from '../../models/IDiscounts';
import { DiscountsService } from '../../services/discounts.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddDiscountComponent } from './add-discount/add-discount.component';
import { ViewDiscountsComponent } from './view-discounts/view-discounts.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'fn-discounts',
  templateUrl: './discounts.component.html',
  styleUrls: ['./discounts.component.css']
})
export class DiscountsComponent implements OnInit {
  discountsList: IDiscount[] = [];
  isLoading = true;

  currentPage = 1;
  itemsPerPage = 10;

  constructor(private disService: DiscountsService, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.getDiscount();
  }
  getDiscount() {
    this.disService.getDiscounts().subscribe({
      next: (dis: IDiscount[]) => {
        this.isLoading = false;
        this.discountsList = dis;
      },
      error: () => {
        this.isLoading = false;
        /*   Swal.fire({
             icon: 'error',
             title: 'Oops...',
             text: 'Error al cargar los descuentos, intente nuevamente',
           });*/
      }
    });
  }

  // get pagedDiscounts(): IDiscount[] {
  //   const startIndex = (this.currentPage - 1) * this.itemsPerPage;
  //   return this.products.slice(startIndex, startIndex + this.itemsPerPage);
  // }

  isDiscountActive(discount: IDiscount) {
    const currentDate = new Date();
    return new Date(discount.end_date) >= currentDate && new Date(discount.start_date) <= currentDate;
  }

  openEditModal(discount: IDiscount) {
    const modalRef = this.modalService.open(AddDiscountComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.discount = discount;
    modalRef.componentInstance.isEdit = true;
    modalRef.result.then(res => {
      if (res) {
        this.disService.getDiscounts().subscribe((res: IDiscount[]) => {
          this.discountsList = res;
        })
      }
    })
  }
  openCreateModal() {
    const modalRef = this.modalService.open(AddDiscountComponent, { size: 'lg', backdrop: 'static' });
    modalRef.result.then(res => {
      if (res) {
        this.disService.getDiscounts().subscribe((res: IDiscount[]) => {
          this.discountsList = res;
        })
      }
    })
  }
  openDeleteModal(discount: IDiscount) {
    Swal.fire({
      title: `¿Estás seguro que desea eliminar el descuento de ${discount.product.name}?`,
      text: "¡No podrás revertir esto!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc3545",
      cancelButtonColor: "#6c757d",
      confirmButtonText: "¡Sí, bórrar!",
      cancelButtonText: "Cancelar"
    }).then((result) => {
      if (result.isConfirmed) {
        this.disService.deleteDiscounts(discount.id_discount, "prueba").subscribe(() => {
          Swal.fire({
            title: "¡Borrado!",
            text: "El descuento ha sido borrado.",
            icon: "success"
          });
          this.isLoading = true;
          this.getDiscount();
        });
      }
    });
  }

  openViewModal(discount: IDiscount) {
    const modalRef = this.modalService.open(ViewDiscountsComponent, { backdrop: 'static' });
    modalRef.componentInstance.discount = discount;
    modalRef.result.then(() => {
      this.disService.getDiscounts().subscribe((res: IDiscount[]) => {
        this.isLoading = false;
        this.discountsList = res;
      })
    })
  }

}
