import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Optional,
  Output,
} from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { Router } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ICategory } from '../../../models/ICategory';
import { IProductCategory } from '../../../models/IProductCategory';
import { CategoryService } from '../../../services/category.service';
import { ProductService } from '../../../services/product.service';
import { Observable, Subscription, catchError, map, of, tap } from 'rxjs';
import Swal from 'sweetalert2';
import { IProduct } from '../../../models/IProduct';

@Component({
  selector: 'fn-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css'],
})
export class AddProductComponent implements OnInit {
  //Variables utilizadas para editar el producto
  @Input() isEdit?: boolean | null = null;
  @Input() product?: IProductCategory | null = null;

  listCategories: ICategory[] = [];

  formGroup: FormGroup;
  isLoading: boolean = false;

  ngbModal: NgbModal;
  image?: File;

  constructor(
    private fb: FormBuilder,
    private prodService: ProductService,
    @Optional() private modalService: NgbActiveModal,
    private router: Router,
    private categoryService: CategoryService,
    private _ngbModal: NgbModal
  ) {
    this.ngbModal = _ngbModal;
    this.formGroup = this.fb.group({
      idProduct: [null],
      name: ['', {
        validators: [Validators.required, Validators.minLength(5)],
        asyncValidators: [this.productNameValidator.bind(this)],
        updateOn: 'change'
      }], description: [null, Validators.maxLength(255)],
      unitPrice: [null, Validators.required],
      stockQuantity: [null, Validators.required],
      unitOfMeasure: [null],
      idCategory: [null, Validators.required],
      image: [null],
      userCreated: [null],
    });

  }


  ngOnInit() {
    this.getCategories();
    if (this.product && this.isEdit) {
      this.formGroup.patchValue({
        idProduct: this.product.idProduct,
        name: this.product.name,
        description: this.product.description,
        unitPrice: this.product.unitPrice,
        stockQuantity: this.product.stockQuantity,
        unitOfMeasure: this.product.unitOfMeasure,
        idCategory: this.product.category.idCategory,
        urlImage: this.product.urlImage,
        userCreated: this.product.userCreated,
        priceProduct: this.product.priceProduct,
        createdBy: this.product.userCreated,
      });
    } else {
      this.formGroup.patchValue({
        idProduct: null,
        name: null,
        description: null,
        unitPrice: null,
        stockQuantity: null,
        unitOfMeasure: null,
        idCategory: null,
        urlImage: null,
        userCreated: null,
        priceProduct: null,
        createdBy: null,
      });
    }
  }
  productNameValidator(control: AbstractControl): Observable<ValidationErrors | null> {
    console.log(this.product)
    return this.prodService.get(1, 0, "name", "asc", true).pipe(
      map((products: any) => {
        const isProductNameExists = products.products.some((product: any) => product.name.toLowerCase() === control.value.toLowerCase() && product.idProduct != this.product?.idProduct);
        return isProductNameExists ? { productNameExists: true } : null;
      }),
      catchError(() => of(null))
    );
  }
  getCategories() {
    this.categoryService.get().subscribe((res) => {
      this.listCategories = res.categories;
    });
  }

  onFileSelected(event: any) {
    this.image = event.target.files[0];
    const fr = new FileReader();
    fr.onload = (e: any) => {
      this.image = e.target.result;
    };
    fr.readAsDataURL(this.image as Blob);
  }

  onSubmit() {
    if (this.formGroup.valid) {
      this.isLoading = true;
      let product = this.formGroup.value;
      if (this.image) {
        product.image = this.image
      }
      this.prodService.put(product).subscribe({
        next: (res) => {
          this.isLoading = false;
          Swal.fire({
            title: "¡Éxito!",
            text: "Operación ejecutada con éxito.",
            icon: "success"
          });
          setTimeout(() => this.modalService.close(res), 1500);
        },
        error: (error) => {
          this.isLoading = false;
          Swal.fire({
            icon: "error",
            title: "¡Error!",
            text: "Error al intentar registrar el producto.",
          });
        },
      });
    } else {
      this.formGroup.markAllAsTouched()
    }
  }

  close() {
    this.modalService.close(false);
  }

  get controlName(): FormControl {
    return this.formGroup.controls['name'] as FormControl;
  }

  get controlCategory(): FormControl {
    return this.formGroup.controls['idCategory'] as FormControl;
  }

  get controlUnitPrice(): FormControl {
    return this.formGroup.controls['unitPrice'] as FormControl;
  }

  get controlStockQuantity(): FormControl {
    return this.formGroup.controls['stockQuantity'] as FormControl;
  }

}
