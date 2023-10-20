import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './components/home/home.component';
import { StorageAvailabilityComponent } from './components/storage-availability/storage-availability.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [HomeComponent, StorageAvailabilityComponent],
  providers: [],
  imports: [CommonModule, FormsModule, HttpClientModule],
  exports: [HomeComponent],
})
export class InventaryModule {}
