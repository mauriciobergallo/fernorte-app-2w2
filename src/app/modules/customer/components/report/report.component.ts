import { Component, OnInit } from '@angular/core';
import { Points } from 'src/app/modules/customer/models/registeredPoinst';
import { CustomerService } from 'src/app/modules/customer/services/customer.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { jsPDF } from "jspdf";
import "jspdf-autotable";

@Component({
  selector: 'fn-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent {
  listPriceHistory: Points[] = []
  originalListPriceHistory: Points[] = [];
  page = 1;
  pageSize = 10;
  filterForm: FormGroup = new FormGroup({});
  sortOrder: boolean = false;
  dataForPDF: Points[] = [];

  constructor(private service: CustomerService, private fb: FormBuilder, private datePipe: DatePipe) {}


  ngOnInit() {
    this.getPointsHistory();
    this.filterForm = this.fb.group({
      startDate: ['01/01/2000'],
      endDate: ['01/01/2023'],
      name: ['']
    });

    this.filterForm.valueChanges.subscribe(() => this.filter());
  }

  getPointsHistory() {
    this.service.getPoints().subscribe({
      next: (res) => {
        this.originalListPriceHistory = res;
        this.listPriceHistory = this.originalListPriceHistory; // Copia la lista original a listPriceHistory
        this.filter();
        this.sortTable();
      }
    })
  }


  filter() {
    debugger
    const startDateStr = this.filterForm.get('startDate')?.value;
    const endDateStr = this.filterForm.get('endDate')?.value;
    const nameStr = this.filterForm.get('name')?.value.toLowerCase();
    this.listPriceHistory = this.originalListPriceHistory.filter(item => {
      const date = item.date;
      const name = item.documentNumber.toLowerCase();

      return date >= startDateStr && date <= endDateStr && name.includes(nameStr);
    });
  }

  formatDateWithTime(fecha: Date): string {
    if (fecha && !isNaN(fecha.getTime())) {
      return this.datePipe.transform(fecha, 'dd/MM/yyyy') || '';
    } else {
      return ''; // O cualquier otro valor predeterminado si la fecha no es válida
    }
  }
  

  clean() {
    this.filterForm.patchValue({
      startDate: '',
      endDate: '',
      name: ''
    });
    this.getPointsHistory();
  }

  sortTable() {
    this.sortOrder = !this.sortOrder;
    // this.listPriceHistory.sort((a, b) => {
    //   const nameA = a.documentNumber.toUpperCase();
    //   const nameB = b.documentNumber.toUpperCase();
    //   if (nameA < nameB) {
    //     return this.sortOrder ? -1 : 1;
    //   }
    //   if (nameA > nameB) {
    //     return this.sortOrder ? 1 : -1;
    //   }

    //   // If names are equal, sort by start price
    //   if (a.points < b.points) {
    //     return this.sortOrder ? 1 : -1;
    //   }
    //   if (a.points > b.points) {
    //     return this.sortOrder ? -1 : 1;
    //   }

    //   return 0;
    // });
    // Update the list used for the PDF
    this.dataForPDF = [...this.listPriceHistory];
  }

  downloadPDF() {
    const data = this.dataForPDF

    const pdf = new jsPDF() as any;

    const headers = ['Nombre', 'puntos', 'Fecha'];

    const rows = data.map((item) => {
      return [
        item.documentNumber,
        item.points,
        item.date
      ];
    });

    const filters = [];
    if (this.filterForm.value.name) {
      filters.push(['Nombre', this.filterForm.value.name]);
    }
    if (this.filterForm.value.startDate) {
      filters.push(['Fecha', this.filterForm.value.startDate]);
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

    pdf.text('Reporte Puntos Históricos', 10, startY + 10);
    pdf.autoTable({
      startY: startY + 15,
      head: [headers],
      body: rows,
    });
    pdf.save('report.pdf');
  }
}
