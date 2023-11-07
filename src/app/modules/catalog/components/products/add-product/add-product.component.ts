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
} from '@angular/forms';
import { Router } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ICategory } from '../../../models/ICategory';
import { IProductCategory } from '../../../models/IProductCategory';
import { CategoryService } from '../../../services/category.service';
import { ProductService } from '../../../services/product.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'fn-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css'],
})
export class AddProductComponent implements OnDestroy, OnInit {
  //Variables utilizadas para editar el producto
  @Input() isEdit?: boolean | null = null;
  @Input() product?: IProductCategory | null = null;
  @Output() productAdded: EventEmitter<any> = new EventEmitter();
  listCategories: ICategory[] = [];

  formGroup: FormGroup;
  isLoading: boolean = false;

  showMessage: boolean = false;
  messageClass: string = '';
  message: string = '';
  predeterminatedCategoryId: number = 1;

  subscription: Subscription;
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
      id_product: [null],
      name: [null, Validators.required],
      description: [null],
      unit_price: [null, Validators.required],
      stock_quantity: [null, Validators.required],
      unit_of_measure: [null],
      id_category: [null, Validators.required],
      image: [null],
      user_created: [null],
    });

    this.subscription = new Subscription();
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit() {
    this.getCategories();

    if (this.product && this.isEdit) {
      this.formGroup.patchValue({
        id_product: this.product.id_product,
        name: this.product.name,
        description: this.product.description,
        unit_price: this.product.unit_price,
        stock_quantity: this.product.stock_quantity,
        unit_of_measure: this.product.unit_of_measure,
        id_category: this.product.category.id_category,
        url_image: this.product.url_image,
        user_created: this.product.user_created,

        price_product: this.product.price_product,
        created_by: this.product.user_created,
      });
    } else {
      this.formGroup.patchValue({
        id_product: null,
        name: null,
        description: null,
        unit_price: null,
        stock_quantity: null,
        unit_of_measure: null,
        id_category: this.predeterminatedCategoryId,
        url_image: null,
        user_created: null,
        price_product: null,
        created_by: null,
      });
    }
  }

  getCategories() {
    this.categoryService.get().subscribe((res) => {
      this.listCategories = res;
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

      let request = this.formGroup.value;
      request.id_product = Number(request.id_product);
      request.unit_price = Number(request.unit_price);
      request.stock_quantity = Number(request.stock_quantity);
      request.id_category = Number(request.id_category);
      request.user_created = 'prueba';
      request.image = this.image;

      //Si envío todos los campos del modelo me arroja bad request

      //Modelo
      /*       id_product: number;
            name: string;
            description: string;
            unit_Price: number;
            stock_Quantity: number;
            unit_Of_Measure: string;
            id_category: number;
            image: string;
            user_created:string; */

      /*       const request: IProduct = {
              id_product: this.isEdit ? Number(this.formGroup.get('id_product')?.value) : 0,
              name: String(this.formGroup.get('name')?.value),
              description: String(this.formGroup.get('description')?.value),
              unit_Price: Number(this.formGroup.get('unit_price')?.value),
              stock_Quantity: Number(this.formGroup.get('stock_quantity')?.value),
              unit_Of_Measure: String(this.formGroup.get('unit_of_measure')?.value),
              id_category: Number(this.formGroup.get('id_category')?.value),
              image: String(this.formGroup.get('url_image')?.value),
              user_created: 'Prueba',
            }; */

      this.subscription.add(
        this.prodService.put(request).subscribe({
          next: (res) => {
            this.isLoading = false;
            const message = this.isEdit
              ? 'El producto se actualizó correctamente.'
              : 'El producto se registró correctamente.';
            this.productAdded.emit();
            this.showSuccessAlert(message);
            setTimeout(() => this.modalService.close(res), 1500);
          },
          error: (error) => {
            this.isLoading = false;
            this.showErrorAlert('Error al registrar el producto.');
          },
        })
      );
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
