import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './components/home/home.component';
import { AddProductComponent } from './components/add-product/add-product.component';
import { ProductsComponent } from './components/products/products.component';
import { AddDiscountComponent } from './components/add-discount/add-discount.component';
import { DiscountsComponent } from './components/discounts/discounts.component';
import { AddCategoryComponent } from './components/add-category/add-category.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { EditProductComponent } from './components/edit-product/edit-product.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SpinnerComponent } from './components/spinner/viewspinner/spinner.component';
import { CatalogRoutingModule } from './catalog-routing.module';

@NgModule({
  declarations: [HomeComponent, AddProductComponent, ProductsComponent, AddDiscountComponent, DiscountsComponent, AddCategoryComponent, EditProductComponent,SpinnerComponent],
  providers: [],
  imports: [CommonModule, NgbModule, FormsModule, ReactiveFormsModule, CatalogRoutingModule],
  exports: [HomeComponent],
})

export class CatalogModule { }
