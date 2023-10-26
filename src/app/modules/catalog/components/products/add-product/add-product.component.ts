import { Component } from '@angular/core';

@Component({
  selector: 'fn-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent {

  addCategoryVisible = false;
  addCategoryLinkVisible = true;
  showAddCategory() {
    this.addCategoryVisible = true;
    this.addCategoryLinkVisible = false;
  }

  hideAddCategory(){
    this.addCategoryVisible = false;
    this.addCategoryLinkVisible = true;
  }

}
