import { Component, OnInit } from '@angular/core';
import { IDiscount } from '../../models/IDiscounts';
import { DiscountsService } from '../../services/discounts.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddDiscountComponent } from './add-discount/add-discount.component';
import { ViewDiscountsComponent } from './view-discounts/view-discounts.component';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'fn-discounts',
  templateUrl: './discounts.component.html',
  styleUrls: ['./discounts.component.css']
})
export class DiscountsComponent implements OnInit {
  discountsList: IDiscount[] = [];
  isLoading = true;
  sortOrder = 'asc';
  currentPage = 1;
  itemsPerPage = 15;
  sortBy = 'name';
  sortDir = 'asc';
  totalItems: number = 0;
  filterForm: FormGroup
  listProducts: any

  constructor(private disService: DiscountsService, private modalService: NgbModal,
    private fb: FormBuilder, private productService: ProductService) {
    this.filterForm = this.fb.group({
      idProduct: '',
      initStartDate: '',
      finalStartDate: '',
      initEndDate: '',
      finalEndDate: '',
      isDeleted: false
    });
  }

  ngOnInit(): void {
    this.getDiscounts();
    this.filterForm.valueChanges.subscribe(() => {
      this.getDiscounts();
    });
    this.getProducts();
  }

  public handlePagination(event: any) {
    this.currentPage = event;
    this.getDiscounts();
  }

  getProducts() {
    this.isLoading = true;
    this.productService.get(undefined, undefined, this.sortBy, this.sortDir, false).subscribe((res: any) => {
      this.listProducts = res.products
      this.isLoading = false;
    })
  }

  sortTable(column: string) {
    this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
    this.sortBy = column;
    this.sortDir = this.sortOrder;
    this.getDiscounts();
  }

  getDiscounts() {
    this.disService.getDiscounts(
      this.currentPage,
      this.itemsPerPage,
      this.sortBy,
      this.sortDir,
      this.filterForm.value.isDeleted,
      this.filterForm.value.idProduct,
      this.filterForm.value.initStartDate,
      this.filterForm.value.finalStartDate,
      this.filterForm.value.initEndDate,
      this.filterForm.value.finalEndDate
    ).subscribe({
      next: (dis) => {
        this.isLoading = false;
        this.discountsList = dis.discounts
        this.totalItems = dis.totalItems;
      },
      error: () => {
        this.isLoading = false;
        Swal.fire({
          icon: 'error',
          title: '!Error!',
          text: 'No se han encontrado resultados.',
          confirmButtonText: 'Cerrar',
          confirmButtonColor: '#6c757d'
        });
      }
    });
  }

  isDiscountActive(discount: IDiscount) {
    const currentDate = new Date();
    return new Date(discount.endDate) >= currentDate && new Date(discount.startDate) <= currentDate;
  }

  openEditModal(discount: IDiscount) {
    const modalRef = this.modalService.open(AddDiscountComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.discount = discount;
    modalRef.componentInstance.isEdit = true;
    modalRef.result.then(res => {
      if (res) {
        this.getDiscounts();
      }
    })
  }

  openCreateModal() {
    const modalRef = this.modalService.open(AddDiscountComponent, { size: 'lg', backdrop: 'static' });
    modalRef.result.then(res => {
      if (res) {
        this.getDiscounts();
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
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
      customClass: {
        confirmButton: "order-2",
        cancelButton: "order-1",
      }
    }).then((result) => {
      if (result.isConfirmed) {
        this.disService.deleteDiscounts(discount.idDiscount, "prueba").subscribe({
          next: (data) => {
            Swal.fire({
              title: "¡Borrado!",
              text: "El descuento ha sido eliminado.",
              icon: "success",
              confirmButtonText: 'Cerrar',
              confirmButtonColor: '#6c757d'
            });
            this.isLoading = true;
            this.getDiscounts();
          },
          error: () => {
            Swal.fire({
              title: "!Error!",
              text: "No se ha podido eliminar el descuento.",
              icon: "error",
              confirmButtonText: 'Cerrar',
              confirmButtonColor: '#6c757d'
            })
          }
        });
      }
    });
  }

  openViewModal(discount: IDiscount) {
    const modalRef = this.modalService.open(ViewDiscountsComponent, { backdrop: 'static' });
    modalRef.componentInstance.discount = discount;
    modalRef.result.then(() => {
      this.getDiscounts();
    })
  }

}
