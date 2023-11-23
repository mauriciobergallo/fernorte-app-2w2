import { Component, OnInit } from '@angular/core';
import {Chart} from 'chart.js';
import {valueOrDefault} from "chart.js/helpers";
import Swal from "sweetalert2";
import {BillServiceService} from "../../services/billing/bill-service.service";
import {PaymentMethodService} from "../../services/payment-method.service";
import {SaleOrderServiceService} from "../../services/salesOrder/sale-order-service.service";
import {MockSalesService} from "../../services/salesOrder/mock-sales.service";
import {MockService} from "../../services/mocks/mock.service";

@Component({
  selector: 'fn-report-tab',
  templateUrl: './report-tab.component.html',
  styleUrls: ['./report-tab.component.css']
})
export class ReportTabComponent implements OnInit{
  bestSeller: string = "Cargando..."
  bestProduct: string = "Cargando..."
  totalProducts: Number| null = null;
  totalBills: Number| null = null;
  months = ['Enero',
    'Febrero',
    'Marzo',
    'Abril',
    'Mayo',
    'Junio',
    'Julio',
    'Augosto',
    'Septiembre',
    'Octubre',
    'Noviembre'];
  yearData: number[] = []
  constructor(private billService: BillServiceService) {
  }
  ngOnInit(): void {
    Swal.fire('Cargando...')
    Swal.showLoading()
    this.billService.getReport().subscribe((report)=>{
      console.log(report);
      this.yearData = report.yearBills;
      this.bestProduct = report.productMostSold;
      this.totalProducts = report.productsSold;
      this.bestSeller = report.monthEmployee;
      this.totalBills = report.monthBills;
      const data = {
        labels: this.months,
        datasets: [
          {
            label: 'Ventas mensuales',
            data: this.yearData,
            borderColor: 'rgb(54, 162, 235)',
          }
        ]
      };
      const config = {
        type: 'line',
        data: data,
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: 'top',
            }
          }
        },
      };
      // @ts-ignore
      new Chart('ventas',config)
    })
    Swal.close();
  }
}
