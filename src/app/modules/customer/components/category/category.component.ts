import { Component, OnInit } from '@angular/core';
import { Category } from '../../models/category';
import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {


  category: Category = {
    idCategory: 0,
    name: "",
    rangeDownTo: 0,
    rangeUpTo: 0,
    discount: 0
  }

  show: boolean = false;
  isEditMode: boolean =  false;
  categories: Category[] = [];

  constructor(private categoryService: CategoryService) { }

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories() {
    this.categoryService.getCategories().subscribe(
      categories => {
        this.categories = categories;
      },
      error => {
        console.error('Error al cargar las categorías', error);
      }
    );
  }


  createCategory() {
    
      this.categoryService.createCategory(this.category).subscribe({
        next: (response: Category) => {
          console.log('Categoría creada exitosamente', response);
          this.loadCategories();
          this.categoryService.clearFields(this.category);
        },
        error: (error: any) => {
          console.error('Error al crear la categoría', error);
        }
      });
    }


}
