import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "./components/home/home.component";
import { NgModule } from "@angular/core";
import { DiscountsComponent } from "./components/discounts/discounts.component";
import { AddDiscountComponent } from "./components/discounts/add-discount/add-discount.component";
import { ViewDiscountsComponent } from "./components/discounts/view-discounts/view-discounts.component";
import { ProductsComponent } from "./components/products/products.component";
import { AddProductComponent } from "./components/products/add-product/add-product.component";
import { ListCategoriesComponent } from "./components/categories/list-categories/list-categories.component";
import { AddCategoryComponent } from "./components/categories/add-category/add-category.component";
import { ReportPriceHistoryComponent } from "./components/reporting/report-price-history/report.component";
import { GraphsPriceHistoryComponent } from "./components/reporting/report-price-history/graphs-price-history/graphs-price-history.component";

const routes: Routes = [
  {
    path: '', component: HomeComponent, children: [
      {
        path: 'discount', children: [
          { path: 'add', component: AddDiscountComponent },
          { path: 'list', component: DiscountsComponent },
          { path: 'view/:id', component: ViewDiscountsComponent },
        ],
      },
      {
        path: 'products', children: [
          { path: 'list', component: ProductsComponent },
          { path: 'add', component: AddProductComponent },
        ],
      },
      {
        path: 'categories', children: [
          { path: 'list', component: ListCategoriesComponent },
          { path: 'add', component: AddCategoryComponent },
        ],
      },
      {
        path: 'reporting', children: [
          { path: 'price-history', component: ReportPriceHistoryComponent },
          {path: 'grahps-price-history', component: GraphsPriceHistoryComponent}
        ],
      },
    ],
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule],
})
export class CatalogRoutingModule { }
