import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { tap } from 'rxjs/operators';
import { Chart } from 'chart.js';

@Component({
  selector: 'fn-grafics',
  templateUrl: './grafics.component.html',
  styleUrls: ['./grafics.component.css']
})
export class GraficsComponent {
  chartBar: any;
  chartPolarArea: any;
  urlJson: string = 'https://my-json-server.typicode.com/AlvaroMarraro/112951-MarraroAlvaro';

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.getProducts();
    this.getPurchase();
  }

  processProductResponse(resp: any[]) {
    const nameProduct: string[] = [];
    const account: number[] = [];

    resp.forEach((element: any) => {
      nameProduct.push(element.name);
      account.push(element.stock_quantity);
    });

    // Polar Area chart
    this.chartPolarArea = new Chart('canvas-polarArea', {
      type: 'polarArea',
      data: {
        labels: nameProduct,
        datasets: [{
          label: 'Productos', data: account
        }]
      }
    });
  }

  processPurchaseResponse(resp: any) {
    const date: string[] = [];
    const account: number[] = [];

    if (resp.metadata[0].code === '00') {
      const listPurchase = resp.purchaseResponse.purchase;

      listPurchase.forEach((element: any) => {
        date.push(element.date);
        account.push(element.account);
      });

      // Bar chart
      this.chartBar = new Chart('canvas-bar', {
        type: 'bar',
        data: {
          labels: date,
          datasets: [{
            label: 'Compras', data: account
          }]
        }
      });
    }
  }

  getProducts(): void {
    this.http
      .get<any[]>(`${this.urlJson}/products`)
      .pipe(
        tap((products: any[]) => {
          console.log(products);
          this.processProductResponse(products);
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
          this.processPurchaseResponse(purchase);
        })
      )
      .subscribe();
  }
}
