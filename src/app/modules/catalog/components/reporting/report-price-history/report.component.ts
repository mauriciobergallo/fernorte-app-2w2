import { Component, OnInit } from '@angular/core';
import { PriceHistory } from '../../../models/priceHistory';
import { ProductService } from '../../../services/product.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { jsPDF } from "jspdf";
// import "jspdf-autotable";

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportPriceHistoryComponent implements OnInit {
  listPriceHistory: PriceHistory[] = []
  originalListPriceHistory: PriceHistory[] = [];
  page = 1;
  pageSize = 10;
  filterForm: FormGroup = new FormGroup({});
  sortOrder: boolean = false;
  dataForPDF: PriceHistory[] = [];
  isLoading: boolean = false;

  constructor(private productService: ProductService, private fb: FormBuilder, private datePipe: DatePipe) {

  }
  ngOnInit() {
    this.getpriceHistory();
    this.filterForm = this.fb.group({
      startDate: [''],
      endDate: [''],
      name: ['']
    });

    this.filterForm.valueChanges.subscribe(() => this.filter());
  }

  getpriceHistory() {
    this.isLoading = true;
    this.productService.getPriceHistory().subscribe({
      next: (res) => {
        this.originalListPriceHistory = res.priceHistory;
        this.listPriceHistory = [...this.originalListPriceHistory]; // Copia la lista original a listPriceHistory
        this.filter();
        this.sortTable();
        this.isLoading = false;
      }
    })
  }


  filter() {
    const startDateStr = this.filterForm.get('startDate')?.value;
    const endDateStr = this.filterForm.get('endDate')?.value;
    const nameStr = this.filterForm.get('name')?.value.toLowerCase();
    this.listPriceHistory = this.originalListPriceHistory.filter(item => {
      const startDate = this.formatDateWithTime(new Date(item.startDate));
      const endDate = this.formatDateWithTime(new Date(item.endDate))
      const name = item.name.toLowerCase();

      return startDate >= startDateStr && endDateStr <= endDate && name.includes(nameStr);
    });
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
    // Update the list used for the PDF
    this.dataForPDF = [...this.listPriceHistory];
  }
  downloadPDF() {
    const data = this.dataForPDF

    const pdf = new jsPDF() as any;

    const headers = ['Nombre', 'Precio', 'Fecha de inicio', 'Fecha de fin'];

    const rows = data.map((item) => {
      const endDate = item.endDate ? this.datePipe.transform(item.endDate, 'dd/MM/yyyy') : '----';
      return [
        item.name,
        item.unitPrice,
        this.datePipe.transform(item.startDate, 'dd/MM/yyyy'),
        endDate
      ];
    });

    const filters = [];
    if (this.filterForm.value.name) {
      filters.push(['Nombre', this.filterForm.value.name]);
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
    const data = this.filterForm.value.name ? this.listPriceHistory : this.originalListPriceHistory;

    let csvContent = 'Nro Nombre Precio Fecha de inicio Fecha de fin\n';

    data.forEach((item, index) => {
      const endDate = item.endDate ? this.datePipe.transform(item.endDate, 'dd/MM/yyyy') : '----';
      csvContent += `${index + 1} ${item.name} ${item.unitPrice} ${this.datePipe.transform(item.startDate, 'dd/MM/yyyy')},${endDate}\n`;
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
