import { Component, EventEmitter, Input, OnDestroy, OnInit, Optional } from '@angular/core';
import { ICategory } from '../../../models/ICategory';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CategoryService } from '../../../services/category.service';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'fn-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnDestroy, OnInit {

  //Variables utilizadas para editar la categoría
  @Input() category?: ICategory | null = null;
  @Input() isEdit?: boolean = false;


  formGroup: FormGroup;
  isLoading: boolean = false;

  showMessage: boolean = false;
  messageClass: string = '';
  message: string = '';

  subscription: Subscription;
  ngbModal:NgbModal
  constructor( _ngbModal:NgbModal ,  private fb: FormBuilder, private catService: CategoryService, @Optional() private modalService: NgbActiveModal) {
    this.formGroup = this.fb.group({
      idCategory: [null],
      name: [null, Validators.required],
      description: [null, Validators.required],
      createdBy: [null]
    });
  this.ngbModal = _ngbModal;
    this.subscription = new Subscription();
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit() {
    this.formGroup.patchValue({
      idCategory: this.category?.idCategory,
      name: this.category?.name,
      description: this.category?.description,
      createdBy: this.category?.createdBy
    });
  }

  onSubmit() {
    if (this.formGroup.valid) {
      this.isLoading = true;
      const request: ICategory = {
        idCategory: this.isEdit ? Number(this.formGroup.get('idCategory')?.value) : 0,
        name: String(this.formGroup.get('name')?.value),
        description: String(this.formGroup.get('description')?.value),
        createdBy: 'Prueba'
      };

      this.subscription.add(this.catService.put(request).subscribe({
        next: (res) => {
          this.isLoading = false;
          if(this.isEdit){
            Swal.fire({
              title: "¡Éxito!",
              text: "Categoría editada con éxito.",
              icon: "success",
              confirmButtonText: 'Cerrar',
              confirmButtonColor: '#6c757d'
            });
          } else {
            Swal.fire({
              title: "¡Éxito!",
              text: "Categoría agregada con éxito.",
              icon: "success",
              confirmButtonText: 'Cerrar',
              confirmButtonColor: '#6c757d'
            });
          }
          setTimeout(() => this.modalService.close(res), 1500);
        },
        error: (error) => {
          this.isLoading = false;
          Swal.fire({
            icon: "error",
            title: "¡Error!",
            text: "Error al intentar actualizar el categoría.",
            confirmButtonText: 'Cerrar',
            confirmButtonColor: '#6c757d'
          });
        }
      }));
    } else {
      Swal.fire({
        icon: "warning",
        title: "¡Error!",
        text: "Todos los campos son requeridos.",
        confirmButtonText: 'Cerrar',
        confirmButtonColor: '#6c757d'
      });
    }
  }

  close() {
    this.modalService.close(false);
  }

  get controlName(): FormControl {
    return this.formGroup.controls['name'] as FormControl;
  }

  get controlDescription(): FormControl {
    return this.formGroup.controls['description'] as FormControl;
  }
}
