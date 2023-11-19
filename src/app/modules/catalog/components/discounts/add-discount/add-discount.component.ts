import { AfterViewInit, Component, Input, OnDestroy, OnInit, Optional } from '@angular/core';
import { IDiscount } from '../../../models/IDiscounts';
import { AbstractControl, ValidatorFn, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../../../services/product.service';
import { DiscountsService } from '../../../services/discounts.service';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IProductCategory } from '../../../models/IProductCategory';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'fn-add-discount',
  templateUrl: './add-discount.component.html',
  styleUrls: ['./add-discount.component.css']
})
export class AddDiscountComponent implements OnInit, OnDestroy {

  @Input() discount?: IDiscount | null = null;
  @Input() isEdit?: boolean = false;

  formGroup: FormGroup = new FormGroup({});
  listProducts: IProductCategory[] = [];
  isLoading: boolean = false;
  ngbModal: NgbModal
  subscription: Subscription;

  currentPage = 1;
  itemsPerPage = 15;
  sortBy = 'name';
  sortDir = 'asc';
  totalItems: number = 0;
  isDeleted: boolean = false
  name = '';
  category = 0;
  today = new Date().toISOString().split('T')[0];

  constructor(private fb: FormBuilder, _ngbModal: NgbModal, private prodService: ProductService, private disService: DiscountsService, @Optional() private modalService: NgbActiveModal, private activeRoute:ActivatedRoute) {
    this.formGroup = this.fb.group({
      idDiscount: [null],
      idProduct: [null, [Validators.required]],
      discountRate: [null, [Validators.required, Validators.min(0.1),Validators.max(100) ]],
      startDate: [null, [Validators.required]],
      endDate: [null, [Validators.required]]
    });
    this.ngbModal = _ngbModal;
    this.subscription = new Subscription();
  }

  ngOnInit(): void {
    this.getProducts();
    this.initForm();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  getProducts() {
    this.isLoading = true;
    this.prodService.get(null,null,this.sortBy,this.sortDir,false).subscribe((res: any) => {
      this.listProducts = res.products
      if(this.isEdit){
        this.formGroup.patchValue(this.discount!)
        this.formGroup.get('idProduct')?.setValue(this.discount?.product.idProduct)
      }
      this.isLoading = false;
    })
  }

  initForm(): FormGroup {
    if (!this.isEdit) {
      return this.formGroup = this.fb.group({
        idDiscount: [0],
        idProduct: ["0", Validators.required],
        discountRate: [0, Validators.required],
        startDate: [this.today, Validators.required],
        endDate: [null]
      });
    } else {
      return this.formGroup = this.fb.group({
        idDiscount: [this.discount?.idDiscount],
        idProduct: [this.discount?.product.idProduct, Validators.required],
        discountRate: [this.discount?.discountRate, Validators.required],
        startDate: [this.discount?.startDate],
        endDate: [this.discount?.endDate]
      });
    }
  }

  onSubmit() {

    let request = this.formGroup.value;
    request.idProduct = Number(request.idProduct);
    request.startDate = new Date(request.startDate).toISOString();
    request.endDate = new Date(request.endDate).toISOString()
    request.user = 'prueba';

    if (this.isEdit) {
      let request = this.formGroup.value;
      request.idProduct = Number(request.idProduct)
      request.startDate = new Date(request.startDate)
      request.endDate = new Date(request.endDate)
      request.user = 'prueba';
      request.name = this.listProducts?.filter(p => p.idProduct == request.idProduct)[0].name;

      console.log(request)

      this.disService.updateDiscounts([request]).subscribe(
      {
        next:(res) => {
          this.isLoading = false;
          Swal.fire({
            title: "¡Éxito!",
            text: "Descuento editado con éxito.",
            icon: "success",
            confirmButtonText: 'Cerrar',
            confirmButtonColor: '#6c757d'
          });
          this.modalService.close(res)
        },
        error: (err)=>{
          this.isLoading = false;
          this.modalService.close()
          Swal.fire({
            icon: "error",
            title: "¡Error!",
            text: "Error al intentar actualizar el descuento.",
            confirmButtonText: 'Cerrar',
            confirmButtonColor: '#6c757d'
          });
        }
      } 
      )
    } else {
      if (request.idProduct != 0) {
        request.idDiscount = 0;
        this.disService.updateDiscounts(request).subscribe({
          next: (res) => {
            this.isLoading = false;
            Swal.fire({
              title: "¡Éxito!",
              text: "Descuento agregado con éxito.",
              icon: "success",
              confirmButtonText: 'Cerrar',
              confirmButtonColor: '#6c757d'
            });
            setTimeout(() => this.modalService.close(res), 1500);
          },
          error: (error) => {
            this.isLoading = false;
            Swal.fire({
              icon: "error",
              title: "¡Error!",
              text: "Error al intentar agregar el descuento.",
              confirmButtonText: 'Cerrar',
              confirmButtonColor: '#6c757d'
            });
          },
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "¡Error!",
          text: "Debe seleccionar un producto.",
          confirmButtonText: 'Cerrar',
          confirmButtonColor: '#6c757d'
        });
      }
    }
  }

  close() {
    this.modalService.close(false);
  }
}
