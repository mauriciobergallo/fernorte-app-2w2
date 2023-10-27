import { Component, Input, OnInit } from '@angular/core';
import { IProductCategory } from '../../../models/IProductCategory';
import { ProductService } from '../../../services/product.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';

@Component({
  selector: 'app-delete-product',
  templateUrl: './delete-product.component.html',
  styleUrls: ['./delete-product.component.css']
})
export class DeleteProductComponent{
  @Input() product?:IProductCategory | null = null;
  isLoading:boolean = false;

  constructor(private productService:ProductService, private modalService: NgbActiveModal, private router: Router){}

  onSubmit(){
    this.isLoading = true;

      this.productService.delete(Number(this.product?.id_product), 'usuario').subscribe((res)=>{
        this.isLoading = false;
        this.modalService.close(res)
        this.router.navigateByUrl('/catalog/products/list', { skipLocationChange: true }).then(() => {
          location.reload();
        });
      })
  }
  
  close(){
    this.modalService.close();
  }
}
