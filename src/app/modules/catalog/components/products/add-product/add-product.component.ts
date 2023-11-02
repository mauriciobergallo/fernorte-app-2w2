import { Component, Input, Optional } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ICategory } from '../../../models/ICategory';
import { IProductCategory } from '../../../models/IProductCategory';
import { CategoryService } from '../../../services/category.service';
import { ProductService } from '../../../services/product.service';

@Component({
  selector: 'fn-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent {
  @Input() product?: IProductCategory | null = null;
  listCategories: ICategory[] = [];
  formGroup: FormGroup;
  isLoading: boolean = false;

  //Variables utilizadas para mostrar mensajes de validaciones
  showMessage: boolean = false;
  messageClass: string = '';
  message: string = '';

  predeterminatedCategoryId: number = 1;

  image?: File

  constructor(private fb: FormBuilder, private prodService: ProductService, @Optional() private modalService: NgbActiveModal, private router: Router, private categoryService: CategoryService) {
    // Creación del formulario con validaciones
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
    // Obtener las categorías
    this.getCategories();
    //Se setea una categoría por defecto al iniciar el formulario
    this.formGroup.patchValue({ id_category: this.predeterminatedCategoryId });
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
          //console.log('Respuesta del servidor:', res);
          // El producto se registró con éxito, muestra la alerta de éxito
          this.showSuccessAlert('El producto se registró correctamente.');

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
          //console.error('Error en la solicitud al servidor:', error);
          this.isLoading = false;
          this.showErrorAlert('Error al registrar el producto.');
        }
      });
    } else {
      // El formulario no es válido, muestra la alerta de error
      this.showErrorAlert('Por favor completa todos los campos requeridos.');
    }
  }




  close() {
    // Cerrar el modal
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
