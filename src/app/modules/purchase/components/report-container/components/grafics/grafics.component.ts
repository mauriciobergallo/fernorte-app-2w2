import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { tap } from 'rxjs/operators';
import { Chart  } from 'chart.js';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ChartOptions } from 'chart.js/auto';


@Component({
  selector: 'fn-grafics',
  templateUrl: './grafics.component.html',
  styleUrls: ['./grafics.component.css']
})
export class GraficsComponent {
  chartBar?: Chart;
  chartPolarArea?: Chart<'polarArea', any[], any>;
  urlJson: string = 'https://my-json-server.typicode.com/AlvaroMarraro/112951-MarraroAlvaro';
  lstProduct: any[] = [];
  lstPurchase: any[] = [];
  filterForm: FormGroup = new FormGroup({});
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


  constructor(private http: HttpClient, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.getProducts();
    this.getPurchase();
    this.filterForm = this.fb.group({
      chartType: ['']


    });

  }





  processProductResponse(): void {
    const data = this.lstProduct.map((product) => product.stock_quantity);
    const labels = this.lstProduct.map((product) => product.name);
    setTimeout(() => {
      this.chartBar = new Chart('canvas-bar', {
      type: 'bar',
      data: {
        labels,
        datasets: [
          {
            label: 'Productos',
            data: data,
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 1)',
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
            ],
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });

  },1500);
  }

  processPurchaseResponse(): void {
    const cx = document.getElementById('canvas-polarArea') as HTMLCanvasElement;
    const data = this.lstPurchase.map((purchase) => purchase.price);
    const labels = this.lstPurchase.map((purchase) => purchase.month);

    if(!cx) return console.log('No se pudo obtener el canvas');
    setTimeout(() => {
      this.chartPolarArea = new Chart(cx, {
      type: 'polarArea',
      data: {
        labels,
        datasets: [
          {
            label: 'Compras',
            data: data,
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 1)',
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
            ],
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  },1500);
  }




  getProducts(): void {
    this.http
      .get<any[]>(`${this.urlJson}/products`)
      .pipe(
        tap((products: any[]) => {
          console.log(products);
          this.lstProduct = products;
        })
      )
      .subscribe();
  }

  getPurchase(): void {
    this.http
      .get<any[]>(`${this.urlJson}/purchase`)
      .pipe(
        tap((purchase: any[]) => {
          console.log(purchase);
          this.lstPurchase = purchase;
        })
      )
      .subscribe();
  }

  async showGraphs() {
    const chartType = this.filterForm.get('chartType')?.value;
    const ctx = document.getElementById('myChart') as HTMLCanvasElement;
    if (!ctx) {
      return;
    }

    const dataset = this.lstProduct.map((purchase) => purchase.price);
    const labels = this.lstProduct.map((purchase) => purchase.month);


    if (this.chartBar) {
      this.chartBar.destroy();
    }

    this.chartBar = new Chart(ctx, {
      type: chartType,
      data: {

        datasets: [{
          label: 'Productos',
          data: dataset,
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1
        }]
      },
      options: {
        title: {
          display: true,
          text: `Productos`,
        },
        scales: {
          y: {
            beginAtZero: true
          }
        }
      } as ChartOptions<'bar'>
    });
}
}


