import { Component } from '@angular/core';

interface Supplier {
  id: number;
  socialReason: string;
  fantasyName: string;
  cuit: string;
  adress: string;
}

@Component({
  selector: 'fn-suppliers',
  templateUrl: './suppliers.component.html',
  styleUrls: ['./suppliers.component.css']
})
export class SuppliersComponent {
  title = 'HTTP using native fetch API';
  private url: string = 'http://localhost:8080/suppliers';
  suppliers: Supplier[] = []

  isOpen: boolean = false;



  ngOnInit(): void {
    fetch(this.url)
    .then((response) => response.json())
    .then((data) => this.suppliers = data);
  }
}
