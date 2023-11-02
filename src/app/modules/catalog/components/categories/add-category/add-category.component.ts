import { Component, EventEmitter, Input, Optional } from '@angular/core';
import { ICategory } from '../../../models/ICategory';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CategoryService } from '../../../services/category.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'fn-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent {
  @Input() category?: ICategory | null = null;
  @Input() isEdit?: boolean = false;
  formGroup: FormGroup;
  isLoading: boolean = false;

  showMessage: boolean = false;
  messageClass: string = '';
  message: string = '';

  constructor(private fb: FormBuilder, private catService: CategoryService, @Optional() private modalService: NgbActiveModal) {
    this.formGroup = this.fb.group({
      id_category: [null],
      name: [null, Validators.required],
      description: [null, Validators.required],
      created_by: [null]
    });
  }

  ngOnInit() {
    this.formGroup.patchValue({
      id_category: this.category?.id_category,
      name: this.category?.name,
      description: this.category?.description,
      created_by: this.category?.created_by
    });
  }

  onSubmit() {
    if (this.formGroup.valid) {
      this.isLoading = true;
      const request: ICategory = {
        id_category: this.isEdit ? Number(this.formGroup.get('id_category')?.value) : 0,
        name: String(this.formGroup.get('name')?.value),
        description: String(this.formGroup.get('description')?.value),
        created_by: 'Prueba'
      };

      this.catService.put(request).subscribe({
        next: (res) => {
          this.isLoading = false;
          const message = this.isEdit
            ? 'La categoría se actualizó correctamente.'
            : 'La categoría se registró correctamente.';
          this.showSuccessAlert(message);
          setTimeout(() => this.modalService.close(res), 3000);
        },
        error: (error) => {
          this.isLoading = false;
          this.showErrorAlert('Error al registrar la categoría.');
        }
      });
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
    }, 3000);
  }
  
  showErrorAlert(message: string) {
    this.showMessage = true;
    this.messageClass = 'alert-danger';
    this.message = message;

    setTimeout(() => {
      this.hideAlert();
    }, 3000);
  }
  
  hideAlert() {
    this.showMessage = false;
    this.messageClass = '';
    this.message = '';
  }
}
