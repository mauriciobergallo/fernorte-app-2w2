import { Component, EventEmitter, Input, Optional} from '@angular/core';
import { ICategory } from '../../../models/ICategory';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CategoryService } from '../../../services/category.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'fn-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent {

  @Input() category?: ICategory | null = null;
  @Input() isEdit?:boolean = false;
    
  formGroup:FormGroup = new FormGroup({});

  isLoading:boolean= false;

  constructor(private fb:FormBuilder,private catService:CategoryService,@Optional() private modalService: NgbActiveModal){
    this.formGroup = this.fb.group({
      id_category: [null],
      name: [null],
      description: [null],
      created_by: [null]
    })
  }

 
  ngOnInit(){
    this.formGroup.patchValue({
      id_category: this.category?.id_category,
      name: this.category?.name,
      description: this.category?.description,
      created_by: this.category?.created_by
    })
  }

  onSubmit(){
    this.isLoading = true;
    if(this.isEdit){
      let request: ICategory = {
        id_category: Number(this.formGroup.get('id_category')?.value),
        name: String(this.formGroup.get('name')?.value),
        description: String(this.formGroup.get('description')?.value),
        created_by: "Prueba"
      };
      
      this.catService.put(request).subscribe((res)=>{
        this.isLoading=false;
        this.modalService.close(res)
      })
    } else{
      let request: ICategory = {
        id_category: 0,
        name: String(this.formGroup.get('name')?.value),
        description: String(this.formGroup.get('description')?.value),
        created_by: "Prueba"
      };
      this.catService.put(request).subscribe((res)=>{
        this.isLoading=false;
        this.modalService.close(res)
      })
    }

  }

  close(){
    this.modalService.close(false);
  }
  
}
