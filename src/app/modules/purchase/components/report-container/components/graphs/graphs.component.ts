import {  HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import Chart from 'chart.js/auto';
import { ChartOptions } from 'chart.js/auto';
@Component({
  selector: 'fn-graphs',
  templateUrl: './graphs.component.html',
  styleUrls: ['./graphs.component.css']
})
export class GraphsComponent {
  filterFom: FormGroup = new FormGroup({});
  isLoading: boolean = false;
  myChart?: Chart;
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
  url: string = 'https://my-json-server.typicode.com/AlvaroMarraro/112951-MarraroAlvaro/products';
  products: any;
  constructor(private fb: FormBuilder, private http: HttpClient) {}

  ngOnInit() {
    this.getProducts();
    this.filterFom = this.fb.group({
      chart: [0, Validators.required]
    });
  }

  getProducts() {
    this.http.get<any[]>(this.url).subscribe((data: any[]) => {
      console.log(data);
      this.products = data;
      console.log(this.products);
    }, (error: any) => {
      console.error('Error:', error);
    });
  }
  

  async showGraphs() {
    const chartType = this.filterFom.get('chart')?.value;
    const ctx = document.getElementById('myChart') as HTMLCanvasElement;
  
    if (!ctx) {
      return;
    }
  
    if (this.myChart) {
      this.myChart.destroy();
    }
  
    const labels = this.products.map((product:any) => product.name);
    const dataset = this.products.map((product:any)=> product.stock_quantity);
  
    try {
      this.myChart = new Chart(ctx, {
        type: chartType,
        data: {
          labels: labels,
          datasets: [{
            data: dataset,
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1
          }]
        },
        options: {
          title: {
            display: true,
            text: `Productos`
          },
          scales: {
            y: {
              beginAtZero: true
            }
          }
        } as ChartOptions<'bar'>
      });
  
      this.isLoading = false;
    } catch (error) {
      console.error('Error creating chart:', error);
    }
  }
  
}


