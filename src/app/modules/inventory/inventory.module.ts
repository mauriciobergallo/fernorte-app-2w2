import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './components/home/home.component';
import { SearchLocationProductComponent } from './components/search-location-product/search-location-product.component';

@NgModule({
  declarations: [HomeComponent, SearchLocationProductComponent],
  providers: [],
  imports: [CommonModule,FormsModule,HttpClientModule],
  exports: [HomeComponent],
})
export class InventaryModule {}
