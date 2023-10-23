import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './components/home/home.component';
import { FormsModule } from '@angular/forms';
import { UserRootComponent } from './components/user-root/user-root.component';
import { UserFormComponent } from './components/user-form/user-form.component';

@NgModule({
  declarations: [HomeComponent, UserRootComponent, UserFormComponent, UserFormComponent],
  providers: [],
  imports: [CommonModule, FormsModule, ReactiveFormsModule,],
  exports: [HomeComponent],
})
export class CustomerModule {}
