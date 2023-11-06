import { Component, Input } from '@angular/core';
import { ICategory } from '../../../models/ICategory';
import { CategoryService } from '../../../services/category.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'fn-delete-modal-category',
  templateUrl: './delete-modal-category.component.html',
  styleUrls: ['./delete-modal-category.component.css']
})
export class DeleteModalCategoryComponent {
  @Input() category?:ICategory | null = null;
  isLoading:boolean=false;

  constructor(private catService:CategoryService,private modalService: NgbActiveModal){}

  onSubmit(){
    this.isLoading = true;

    this.catService.deleteCategory(Number(this.category?.id_category),'usuarioTest').subscribe((res)=>{
      this.isLoading = false;
      this.modalService.close(res)
    })
  }
  
  close(){
    this.modalService.close();
  }
}
