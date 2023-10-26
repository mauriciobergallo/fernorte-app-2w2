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

  formGroup:FormGroup;
  isLoading:boolean= false;

  constructor(private fb:FormBuilder,private catService:CategoryService,@Optional() private modalService: NgbActiveModal){
    this.formGroup = this.fb.group({
      id_category: [null],
      name: [null],
      description: [null],
      created_by: [null]
    })
  }

  
}
