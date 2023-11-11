import { Component, Input, OnDestroy, OnInit, Optional } from '@angular/core';
import { IDiscount } from '../../../models/IDiscounts';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../../../services/product.service';
import { DiscountsService } from '../../../services/discounts.service';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IProductCategory } from '../../../models/IProductCategory';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'fn-add-discount',
  templateUrl: './add-discount.component.html',
  styleUrls: ['./add-discount.component.css']
})
export class AddDiscountComponent implements OnInit, OnDestroy {

  @Input() discount?: IDiscount | null = null;
  @Input() isEdit?: boolean = false;

  formGroup: FormGroup;
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

  constructor(private fb: FormBuilder, _ngbModal: NgbModal, private prodService: ProductService, private disService: DiscountsService, @Optional() private modalService: NgbActiveModal) {
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
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }


  getProducts() {
    this.prodService.get(null,null,this.sortBy,this.sortDir,false).subscribe((res: any) => {
      this.listProducts = res.products
      if(this.isEdit){
        this.formGroup.patchValue(this.discount!)
        this.formGroup.get('idProduct')?.setValue(this.discount?.product.idProduct)
      }
    })

  }



  onSubmit() {
    this.isLoading = true;
    if (this.isEdit) {
      let request = this.formGroup.value;
      request.idProduct = Number(request.idProduct)
      request.startDate = new Date(request.startDate)
      request.endDate = new Date(request.endDate)
      request.user = 'prueba';
      request.name = this.listProducts?.filter(p => p.idProduct == request.idProduct)[0].name;

      this.disService.updateDiscounts([request]).subscribe(
      {
        next:(res) => {
          this.isLoading = false;
          Swal.fire('¡Éxito!', 'Operación exitosa', 'success');
          this.modalService.close(res)
        },
        error: (err)=>{
          this.isLoading = false;
          this.modalService.close()
          Swal.fire('¡Error!', 'Ocurrió un error', 'error');
        }
      } 
      )
    } else {
      let request = this.formGroup.value;
      request.idDiscount = 0;
      request.idProduct = Number(request.idProduct)
      request.startDate = new Date(request.startDate)
      request.endDate = new Date(request.endDate)
      request.user = 'prueba';

      this.disService.updateDiscounts([request]).subscribe((res) => {
        this.isLoading = false;
        this.modalService.close(res)
      })
    }
  }

  close() {
    this.modalService.close(false);
  }


}
