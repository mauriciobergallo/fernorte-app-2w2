import { Component, OnInit } from '@angular/core';
import { ICategory } from '../../../models/ICategory';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CategoryService } from '../../../services/category.service';
import { AddCategoryComponent } from '../add-category/add-category.component';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-list-categories',
  templateUrl: './list-categories.component.html',
  styleUrls: ['./list-categories.component.css']
})
export class ListCategoriesComponent implements OnInit {

  sortOrder = 'asc';

  isLoading = true;
  listCategories: ICategory[] = [];
  currentPage = 1;
  itemsPerPage = 15;
  sortBy = 'name';
  sortDir = 'asc';
  totalItems: number = 0;
  filterCategory: FormGroup;

  constructor(private categoryService: CategoryService, private modalService: NgbModal, private fb: FormBuilder) {
    this.filterCategory = this.fb.group({
      name: [''],
      isDeleted: [false]
    });
  }

  ngOnInit() {
    this.getCategories();
    this.filterCategory.valueChanges.subscribe(() => {
      this.getCategories();
    });
  }


  sortTable(column: string) {
    this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
    this.sortBy = column;
    this.sortDir = this.sortOrder;
    this.getCategories();
  }
  getCategories() {
    debugger
    this.categoryService.get(this.currentPage, this.itemsPerPage, this.sortBy, this.sortDir, this.filterCategory.value.isDeleted, this.filterCategory.value.name).subscribe({
      next: (cat) => {
        this.isLoading = false;
        this.listCategories = cat.categories;
        this.totalItems = cat.totalItems;
      },
      error: () => {
        this.isLoading = false;
        Swal.fire({
          icon: 'error',
          title: '!Error!',
          text: 'No se han encontrado resultados.',
        })
      }
    });
  }
  openEditModal(category: ICategory) {
    const modalRef = this.modalService.open(AddCategoryComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.category = category;
    modalRef.componentInstance.isEdit = true;
    modalRef.result.then(data => {
      if (data) {
        this.getCategories();
      }
    })
  }
  openCreateModal() {
    const modalRef = this.modalService.open(AddCategoryComponent, { size: 'lg', backdrop: 'static' });
    modalRef.result.then(data => {
      if (data) {
        this.getCategories();
      }
    })
  }
  openDeleteModal(category: ICategory) {
    Swal.fire({
      title: `¿Estás seguro que desea eliminar la categoria, ${category.name}?`,
      text: "¡No podrás revertir esto!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc3545",
      cancelButtonColor: "#6c757d",
      confirmButtonText: "¡Sí, bórrar!",
      cancelButtonText: "Cancelar"
    }).then((result) => {
      if (result.isConfirmed) {
        this.categoryService.delete(category.idCategory, "prueba").subscribe(() => {
          Swal.fire({
            title: "¡Borrado!",
            text: "La categoria ha sido borrado.",
            icon: "success"
          });
          this.isLoading = true;
          this.getCategories();
        });
      }
    });
  }
  public handlePagination(event: any) {
    this.currentPage = event;
    this.getCategories();
  }
}
