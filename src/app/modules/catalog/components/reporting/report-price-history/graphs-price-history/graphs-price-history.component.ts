import { DatePipe } from '@angular/common';
import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Chart, ChartType } from 'chart.js';
import { ProductService } from 'src/app/modules/catalog/services/product.service';
import { ChartOptions } from 'chart.js/auto';
import Swal from 'sweetalert2';
import { IProductCategory } from 'src/app/modules/catalog/models/IProductCategory';

@Component({
  selector: 'app-graphs-price-history',
  templateUrl: './graphs-price-history.component.html',
  styleUrls: ['./graphs-price-history.component.css']
})
export class GraphsPriceHistoryComponent implements OnInit {
  listPriceHistory: any[] = [];
  filterFom: FormGroup = new FormGroup({});
  isLoading: boolean = false;
  myChart?: Chart;
  listProduct: IProductCategory[] = [];
  listCharts: any[] = [{
    name: 'Línea',
    value: 'line'
  },
  {
    name: 'Barra',
    value: 'bar'
  },
  {
    name: 'Radar',
    value: 'radar'
  },
  {
    name: 'Pastel',
    value: 'pie'
  },
  {
    name: 'Rosquilla',
    value: 'doughnut'
  },
  {
    name: 'Área Polar',
    value: 'polarArea'
  }];

  constructor(private datePipe: DatePipe, private productService: ProductService, private fb: FormBuilder) {


  }
  ngOnInit() {
    this.getProducts();
    this.getPriceHistory();
    this.filterFom = this.fb.group({
      name: ['', [Validators.required]],
      startDate: ['', [Validators.required]],
      endDate: [''],
      chart: [this.myChart, Validators.required]
    });


  }

  getPriceHistory() {
    this.productService.getPriceHistory().subscribe({
      next: (res) => {
        this.listPriceHistory = res.priceHistory;
      }
    });
  }

  getProducts() {
    this.productService.get().subscribe({
      next: (res) => {
        this.listProduct = res.products;
        if (this.listProduct.length > 0) {
          this.filterFom.get('name')?.setValue(this.listProduct[0].name);
        }
      }
    });
  }

  async showGraphs() {
    if (this.filterFom.valid) {
      const chartType = this.filterFom.get('chart')?.value;


      this.isLoading = true;
      setTimeout(async () => {
        const productName = this.filterFom.get('name')?.value;
        const startDate = this.filterFom.get('startDate')?.value;
        const endDate = this.filterFom.get('endDate')?.value;

        const data = this.listPriceHistory.filter(item =>
          item.name === productName &&
          new Date(item.startDate) >= new Date(startDate) ||
          new Date(item.startDate) <= new Date(endDate)
        );


        if (data.length === 0) {
          return;
        }

        const ctx = document.getElementById('myChart') as HTMLCanvasElement;

        if (!ctx) {
          return;
        }

        data.sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime());

        const labels = data.map(item => this.datePipe.transform(item.startDate, 'dd/MM/yyyy'));
        const dataset = data.map(item => item.unitPrice);

        const minPrice = Math.min(...dataset);
        const maxPrice = Math.max(...dataset);
        const datasetLabel = `${productName} (Precio: ${minPrice} - ${maxPrice}, Fechas: ${labels[0]} - ${labels[labels.length - 1]})`;

        if (this.myChart) {
          this.myChart.destroy();
        }
        this.myChart = new Chart(ctx, {
          type: chartType,
          data: {
            labels: labels,
            datasets: [{
              label: datasetLabel,
              data: dataset,
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
              borderColor: 'rgba(75, 192, 192, 1)',
              borderWidth: 1
            }]
          },
          options: {
            title: {
              display: true,
              text: `Productos: ${productName}, Fechas: ${startDate} - ${endDate}`
            },
            scales: {
              y: {
                beginAtZero: true
              }
            }
          } as ChartOptions<'bar'>
        });
        this.isLoading = false;
      }, 1500);
    } else {
      this.filterFom.markAllAsTouched();
      for (let name in this.filterFom.controls) {
        if (this.filterFom.controls[name].invalid) {
          let inputElement = document.querySelector(`input[formControlName="${name}"]`);
          if (inputElement) {
            (inputElement as HTMLInputElement).focus();
          }
          break;
        }
      }
    }
  }

  clean() {
    this.filterFom.patchValue({
      name: '',
      startDate: '',
      endDate: ''
    });
    this.myChart?.destroy();
  }
}
