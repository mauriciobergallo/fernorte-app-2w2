import { Component, OnInit } from '@angular/core';
import { ICategory } from '../../../models/ICategory';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CategoryService } from '../../../services/category.service';
import { AddCategoryComponent } from '../add-category/add-category.component';
import Swal from 'sweetalert2';
import { Subscription } from 'rxjs';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-list-categories',
  templateUrl: './list-categories.component.html',
  styleUrls: ['./list-categories.component.css']
})
export class ListCategoriesComponent implements OnInit {
  isLoading = true;
  listCategories: ICategory[] = [];
  filterCategories: FormGroup;
  private subscription = new Subscription();
  currentPage = 1;
  itemsPerPage = 10;
  sortBy = 'name';
  sortDir = 'asc';
  totalItems: number = 0;

  constructor(private categoryService:CategoryService,private modalService: NgbModal,private fb: FormBuilder) {
    
    this.filterCategories= this.fb.group({
        name: [''],
        isDeleted: [false]
      });
   }

  ngOnInit() {
    this.pagedCategories();
    this.filterCategories.valueChanges.subscribe(()=>{
      this.pagedCategories();
    });
  }

  private pagedCategories(){
    this.isLoading=true;
    this.subscription.add(
      this.categoryService
      .get(
          this.currentPage,
          this.itemsPerPage,
          this.sortBy,
          this.sortDir,
          this.filterCategories.value.isDeleted,
          this.filterCategories.value.name
      )
      .subscribe({
        next: (categories:any) => {
          this.listCategories = categories.categories;
          this.totalItems = categories.length;
          this.isLoading=false;
        },
        error: () => {
          Swal.fire({
            icon: 'error',
            title: '¡Error!',
            text: 'No se han encontrado resultados',
          });
          this.isLoading=false;
        }
      })
    )
  }
  public handlePagination(event:any){
    this.currentPage = event;
    this.pagedCategories();
  }
  
  getCategories() {
    this.categoryService.get().subscribe({
      next: (cat: ICategory[]) => {
        this.isLoading = false;
        this.listCategories = cat;
      },
      error: () => {
        this.isLoading = false;
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Error al cargar las categorías, intente nuevamente',
        });
      }
    });
  }
  openEditModal(category: ICategory) {
    const modalRef = this.modalService.open(AddCategoryComponent, { size: 'lg' ,backdrop: 'static' });
    modalRef.componentInstance.category = category;
    modalRef.componentInstance.isEdit = true;
    modalRef.result.then(data => {
      if (data) {
        this.categoryService.get().subscribe((cat: ICategory[]) => {
          this.listCategories = cat;
        })
      }
    })
  }
  openCreateModal() {
    const modalRef = this.modalService.open(AddCategoryComponent, { size: 'lg' ,backdrop: 'static'  });
    modalRef.result.then(data => {
      if (data) {
        this.categoryService.get().subscribe((cat: ICategory[]) => {
          this.listCategories = cat;
        })
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
          this.categoryService.delete(category.id_category, "prueba").subscribe(() => {
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
    
  }


function get(currentPage: number, itemsPerPage: number, sortBy: string, sortDir: string, isDeleted: any, name: any) {
  throw new Error('Function not implemented.');
}



