import { Component, EventEmitter, Input, OnDestroy, OnInit, Optional } from '@angular/core';
import { ICategory } from '../../../models/ICategory';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CategoryService } from '../../../services/category.service';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';

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
          const message = this.isEdit
            ? 'La categoría se actualizó correctamente.'
            : 'La categoría se registró correctamente.';
          this.showSuccessAlert(message);
          setTimeout(() => this.modalService.close(res), 1500);
        },
        error: (error) => {
          this.isLoading = false;
          this.showErrorAlert('Error al registrar la categoría.');
        }
      }));
    } else {
      this.showErrorAlert('Por favor completa todos los campos requeridos.');
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

  showSuccessAlert(message: string) {
    this.showMessage = true;
    this.messageClass = 'alert-success';
    this.message = message;

    setTimeout(() => {
      this.hideAlert();
    }, 1500);
  }

  showErrorAlert(message: string) {
    this.showMessage = true;
    this.messageClass = 'alert-danger';
    this.message = message;

    setTimeout(() => {
      this.hideAlert();
    }, 1500);
  }

  hideAlert() {
    this.showMessage = false;
    this.messageClass = '';
    this.message = '';
  }
}
