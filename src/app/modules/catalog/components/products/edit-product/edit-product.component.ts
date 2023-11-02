import { Component, Input, OnInit, Optional } from '@angular/core';
import { IProductCategory } from '../../../models/IProductCategory';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../../../services/product.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { CategoryService } from '../../../services/category.service';
import { ICategory } from '../../../models/ICategory';

@Component({
  selector: 'fn-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {
  @Input() product?: IProductCategory | null = null;
  listCategories: ICategory[] = [];
  formGroup: FormGroup;
  isLoading: boolean = false;


  //Variables utilizadas para mostrar mensajes de validaciones
  isSuccess: boolean = false;
  successMessage: string = 'El producto se actualizó correctamente.';
  showInvalidFormError: boolean = false;
  errorMessage: string = ''
  predeterminatedCategoryId: number = 1;

  image?: File

  constructor(private fb: FormBuilder, private prodService: ProductService, @Optional() private modalService: NgbActiveModal, private router: Router, private categoryService: CategoryService) {
    this.formGroup = this.fb.group({
      id_product: [null],
      name: [null, Validators.required],
      description: [null],
      unit_price: [null, Validators.required],
      stock_quantity: [null, Validators.required],
      unit_of_measure: [null],
      id_category: [null, Validators.required],
      image: [null],
      user_created: [null]
    });
  }

  ngOnInit(): void {
    this.formGroup.patchValue({
      id_product: this.product?.id_product,
      name: this.product?.name,
      description: this.product?.description,
      unit_price: this.product?.unit_price,
      stock_quantity: this.product?.stock_quantity,
      unit_of_measure: this.product?.unit_of_measure,
      id_category: this.product?.category.id_category,
      user_created: this.product?.user_created
    });
    this.getCategories();
  }
  getCategories() {
    this.categoryService.get().subscribe((res) => {
      this.listCategories = res;
    });
  }

  onFileSelected(event: any) {
    // Manejar la selección de archivos (imágenes)
    this.image = event.target.files[0];
    const fr = new FileReader();
    fr.onload = (e: any) => {
      this.image = e.target.result;
    }
    fr.readAsDataURL(this.image as Blob);
  }

  onSubmit() {
    if (this.formGroup.valid) {
      // El formulario es válido, procede con el envío
      this.isLoading = true;
      // Formula el request
      let request = this.formGroup.value;
      request.id_product = Number(request.id_product);
      request.unit_price = Number(request.unit_price);
      request.stock_quantity = Number(request.stock_quantity);
      request.id_category = Number(request.id_category);
      request.user_created = 'prueba';
      request.image = this.image;
  
      // Envía el request al servicio
      this.prodService.put(request).subscribe({
        next: (res) => {
          console.log('Respuesta del servidor:', res);
          // El producto se registró con éxito, muestra la alerta de éxito
          this.showSuccessAlert();
  
          // Simula una demora antes de cerrar el modal y redirigir para que la succesAlert sea visible
          setTimeout(() => {
            this.isLoading = false;
            this.modalService.close(res);
            this.router.navigateByUrl('/products/list', { skipLocationChange: true }).then(() => {
              location.reload();
            });
          }, 3000);  // Espera 3 segundos (ajustar esto según preferencias)
        },
        error: (error) => {
          // Maneja el error de acuerdo a tus necesidades (mostrar un mensaje, registrar en un archivo de registro, etc.).
          console.error('Error en la solicitud al servidor:', error);
          this.isLoading = false;
          this.errorMessage = 'Error al registrar el producto.'
          this.showInvalidFormAlert();
        }
      });
    } else {
      // El formulario no es válido, muestra la alerta de error
      this.errorMessage = 'Por favor completa todos los campos requeridos.'
      this.showInvalidFormAlert();
    }
  }


  close() {
    this.modalService.close(false);
  }

  // Métodos para obtener controles específicos del formulario
  get controlName(): FormControl {
    return this.formGroup.controls['name'] as FormControl;
  }

  get controlCategory(): FormControl {
    return this.formGroup.controls['id_category'] as FormControl;
  }
  get controlUnitPrice(): FormControl {
    return this.formGroup.controls['unit_price'] as FormControl;
  }

  get controlStockQuantity(): FormControl {
    return this.formGroup.controls['stock_quantity'] as FormControl;
  }

  // Método para mostrar la alerta de éxito
  showSuccessAlert() {
    this.isSuccess = true;
    setTimeout(() => {
      this.isSuccess = false;
    }, 3000); // La alerta se oculta después de 3 segundos
  }

  // Método para mostrar la alerta de formulario inválido
  showInvalidFormAlert() {
    this.showInvalidFormError = true;
    setTimeout(() => {
      this.showInvalidFormError = false;
    }, 3000); // La alerta se oculta después de 3 segundos
  }
}
