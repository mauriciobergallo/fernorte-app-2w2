import { Component, OnInit } from '@angular/core';
import {Chart} from 'chart.js';
import {valueOrDefault} from "chart.js/helpers";

@Component({
  selector: 'fn-report-tab',
  templateUrl: './report-tab.component.html',
  styleUrls: ['./report-tab.component.css']
})
export class ReportTabComponent implements OnInit{
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
  ngOnInit(): void {
    const data = {
      labels: this.months,
      datasets: [
        {
          label: 'Ventas mensuales',
          data: [546,897,756,1292,1124,948,1153,1247,972,1376,1527],
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
  }
  seed = Date.now();

  rand(min:number, max:number) {
    min = valueOrDefault(min, 0);
    max = valueOrDefault(max, 0);
    this.seed = (this.seed * 9301 + 49297) % 233280;
    return min + (this.seed / 233280) * (max - min);
  }
}
