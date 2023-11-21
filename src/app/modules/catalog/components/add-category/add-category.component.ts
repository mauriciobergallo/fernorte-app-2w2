import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'fn-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent {

  @Output() onHideAddCategory = new EventEmitter();

  hideAddCategory() {
    this.onHideAddCategory.emit();
  }

  addCategory() {
    this.hideAddCategory();
  }
}
