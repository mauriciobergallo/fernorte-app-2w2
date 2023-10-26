import { Component } from '@angular/core';

@Component({
  selector: 'fn-home-catalog',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  productsVisible: boolean = true;
  addProductVisible: boolean = false;
  addDiscountVisible: boolean = false;
  discountsVisible: boolean = false;
  categoryVisible: boolean = false;

  showAddProduct() {
    this.addProductVisible = true;
    this.productsVisible = false;
    this.addDiscountVisible = false;
    this.discountsVisible = false;
    this.categoryVisible = false;
  }
  showProducts() {
    this.productsVisible = true;
    this.addProductVisible = false;
    this.discountsVisible = false;
    this.addDiscountVisible = false;
    this.categoryVisible = false;
  }

  showAddDiscount() {
    this.addDiscountVisible = true;
    this.discountsVisible = false;
    this.addProductVisible = false;
    this.productsVisible = false;
    this.categoryVisible = false;
  }
  showDiscounts() {
    this.discountsVisible = true;
    this.addDiscountVisible = false;
    this.productsVisible = false;
    this.addProductVisible = false;
    this.categoryVisible = false;
  }
  showCategories() {
    this.discountsVisible = false;
    this.addDiscountVisible = false;
    this.productsVisible = false;
    this.addProductVisible = false;
    this.categoryVisible = true;
  }

}
