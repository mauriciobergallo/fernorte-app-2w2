import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "./components/home/home.component";
import { NgModule } from "@angular/core";
import { DiscountsComponent } from "./components/discounts/discounts.component";

const routes: Routes = [
    {
        path: '', component: HomeComponent, children: [
            {
                path: 'discount', children: [
                    { path: 'list', component: DiscountsComponent },
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
