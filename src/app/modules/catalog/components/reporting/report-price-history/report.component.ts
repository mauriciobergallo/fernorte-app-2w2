import { Component, OnInit } from '@angular/core';
import { PriceHistory } from '../../../models/priceHistory';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { jsPDF } from "jspdf";
import { IProductCategory } from '../../../models/IProductCategory';
import { ProductService } from '../../../services/product.service';
import 'jspdf-autotable';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportPriceHistoryComponent implements OnInit {
  listPriceHistory: PriceHistory[] = []
  filterForm: FormGroup = new FormGroup({});
  sortOrder: boolean = false;
  dataForPDF: PriceHistory[] = [];
  isLoading: boolean = false;
  listProduct: IProductCategory[] = [];

  currentPage = 1;
  itemsPerPage = 15;
  sortBy = 'unitPrice';
  sortDir = 'desc';
  totalItems: number = 0;
  constructor(private productService: ProductService, private fb: FormBuilder, private datePipe: DatePipe) {

  }
  ngOnInit() {
    this.getProducts();
    this.filterForm = this.fb.group({
      startDate: [''],
      endDate: [''],
      idProduct: [''],
    });
    this.getpriceHistory();
    this.filterForm.valueChanges.subscribe(() => this.getpriceHistory());
  }

  getProducts() {
    this.productService.get().subscribe({
      next: (res) => {
        this.listProduct = res.products;
      }
    });
  }
  public handlePagination(event: any) {
    this.currentPage = event.page;
    this.getpriceHistory();
  }
  getpriceHistory() {
    this.isLoading = true;
    this.productService.getPriceHistory(this.currentPage, this.itemsPerPage, this.sortBy, this.sortDir,
      this.filterForm.value.idProduct, this.filterForm.value.starDate, this.filterForm.value.endDate).subscribe({
        next: (res) => {
          this.listPriceHistory = res.priceHistory;
          this.totalItems = res.totalItems;
          this.sortTable();
          this.isLoading = false;
        }
      })
  }


  formatDateWithTime(fecha: Date): string {
    return this.datePipe.transform(fecha, 'yyyy-MM-dd') || '';
  }
  clean() {
    this.filterForm.patchValue({
      startDate: '',
      endDate: '',
      name: ''
    });
    this.getpriceHistory();
  }
  sortTable() {
    this.sortOrder = !this.sortOrder;
    this.listPriceHistory.sort((a, b) => {
      const nameA = a.name.toUpperCase();
      const nameB = b.name.toUpperCase();
      if (nameA < nameB) {
        return this.sortOrder ? -1 : 1;
      }
      if (nameA > nameB) {
        return this.sortOrder ? 1 : -1;
      }

      // If names are equal, sort by start price
      if (a.unitPrice < b.unitPrice) {
        return this.sortOrder ? 1 : -1;
      }
      if (a.unitPrice > b.unitPrice) {
        return this.sortOrder ? -1 : 1;
      }

      return 0;
    });
    this.dataForPDF = [...this.listPriceHistory];
  }
  downloadPDF() {
    const data = this.dataForPDF

    const pdf = new jsPDF() as any;

    const headers = ['Nombre', 'Precio', 'Fecha de inicio', 'Fecha de fin'];

    const rows = data.map((item) => {
      const endDate = item.endDate ? this.formatDateWithTime(new Date(item.endDate)) : '----';
      return [
        item.name,
        item.unitPrice,
        this.formatDateWithTime(new Date(item.startDate)),
        endDate
      ];
    });
    const filters = [];
    if (this.filterForm.value.idProduct) {
      const product = this.listProduct.find((item) => item.idProduct == this.filterForm.value.idProduct);
      filters.push(['Nombre', product?.name]);
    }
    if (this.filterForm.value.startDate) {
      filters.push(['Fecha de inicio', this.filterForm.value.startDate]);
    }
    if (this.filterForm.value.endDate) {
      filters.push(['Fecha de fin', this.filterForm.value.endDate]);
    }

    // Add filters to the report
    let startY = 10;
    if (filters.length > 0) {
      pdf.text('Filtros aplicados:', 10, startY);
      pdf.autoTable({
        startY: startY + 5,
        head: [['Filtro', 'Valor']],
        body: filters,
      });
      startY = pdf.autoTable.previous.finalY;
    }

    pdf.text('Reporte Precios Históricos', 10, startY + 10);
    pdf.autoTable({
      startY: startY + 15,
      head: [headers],
      body: rows,
    });
    pdf.save('report.pdf');
  }
  downloadCSV() {
    const data = this.dataForPDF

    let csvContent = 'Nro Nombre Precio Fecha de inicio Fecha de fin\n';

    data.forEach((item, index) => {
      const endDate = item.endDate ? this.formatDateWithTime(new Date(item.endDate,)) : '----';
      csvContent += `${index + 1} ${item.name} ${item.unitPrice} ${this.formatDateWithTime(new Date(item.startDate))},${endDate}\n`;
    });

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', 'ReportePreciosHistoricos.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }


}
