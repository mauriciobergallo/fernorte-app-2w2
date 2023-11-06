import { LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';
import { HomeComponent } from './components/home/home.component';
import { AddProductComponent } from './components/products/add-product/add-product.component';
import { ProductsComponent } from './components/products/products.component';
import { AddDiscountComponent } from './components/discounts/add-discount/add-discount.component';
import { DiscountsComponent } from './components/discounts/discounts.component';
import { AddCategoryComponent } from './components/categories/add-category/add-category.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SpinnerComponent } from './components/spinner/viewspinner/spinner.component';
import { CatalogRoutingModule } from './catalog-routing.module';
import { DeleteModalDiscountComponent } from './components/discounts/delete-modal-discount/delete-modal-discount.component';
import { ViewDiscountsComponent } from './components/discounts/view-discounts/view-discounts.component';
import localeEs from '@angular/common/locales/es';
import { ListCategoriesComponent } from './components/categories/list-categories/list-categories.component';
import { DeleteProductComponent } from './components/products/delete-product/delete-product.component';
import { DeleteModalCategoryComponent } from './components/categories/delete-modal-category/delete-modal-category.component';

registerLocaleData(localeEs);

@NgModule({
  declarations: [
    HomeComponent,
    AddProductComponent,
    ProductsComponent,
    AddDiscountComponent,
    DiscountsComponent,
    AddCategoryComponent,
    SpinnerComponent,
    DeleteModalDiscountComponent,
    ViewDiscountsComponent,
    ListCategoriesComponent,
    DeleteProductComponent,
    DeleteModalCategoryComponent],


  providers: [{ provide: LOCALE_ID, useValue: 'es' }],
  imports: [CommonModule, NgbModule, FormsModule, ReactiveFormsModule, CatalogRoutingModule],
  exports: [HomeComponent],
})

export class CatalogModule { }
