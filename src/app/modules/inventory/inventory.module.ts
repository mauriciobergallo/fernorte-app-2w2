import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './components/home/home.component';
import { FormLocationComponent } from './components/form-location/form-location.component';

@NgModule({
  declarations: [HomeComponent,FormLocationComponent],
  providers: [],
  imports: [CommonModule],
  exports: [HomeComponent],
})
export class InventaryModule {}
