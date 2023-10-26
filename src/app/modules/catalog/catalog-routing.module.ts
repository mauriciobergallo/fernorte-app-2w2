import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "./components/home/home.component";
import { NgModule } from "@angular/core";
import { DiscountsComponent } from "./components/discounts/discounts.component";
import { AddDiscountComponent } from "./components/add-discount/add-discount.component";
import { ViewDiscountsComponent } from "./components/view-discounts/view-discounts.component";

const routes: Routes = [
    {
        path: '', component: HomeComponent, children: [
            {
                path: 'discount', children: [
                    { path: 'add', component: AddDiscountComponent },
                    { path: 'list', component: DiscountsComponent },
                    { path: 'view/:id', component: ViewDiscountsComponent },
                ]
            }
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [RouterModule],
})
export class CatalogRoutingModule { }
