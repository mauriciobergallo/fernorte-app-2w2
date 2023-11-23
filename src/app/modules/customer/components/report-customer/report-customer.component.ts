import { DatePipe } from '@angular/common';
import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Chart } from 'chart.js';
import { CustomerService } from 'src/app/modules/customer/services/customer.service';
import { ChartOptions } from 'chart.js/auto';
import Swal from 'sweetalert2';
import { Customer } from '../../models/customer';


@Component({
  selector: 'fn-report-customer',
  templateUrl: './report-customer.component.html',
  styleUrls: ['./report-customer.component.css']
})
export class ReportCustomerComponent {
  listPointsHistory: any[] = [];
  allCustomers: Customer[] = []
  filterFom: FormGroup = new FormGroup({});
  myChart?: Chart;
  isLoading: boolean = false;

  constructor(private datePipe: DatePipe, private service: CustomerService, private fb: FormBuilder){}


  ngOnInit() {
    this.service.getPoints().subscribe({
      next: (res) => {
        this.listPointsHistory = res;
      }
    })

    this.service.getAllCustomer().subscribe(
      (response) => {
        this.allCustomers = response;
      }
    );

    this.filterFom = this.fb.group({
      name: ['', []],
      startDate: ['', [Validators.required]],
      endDate: ['', [Validators.required]]
    });

  }


  async showGraphs() {
    if (this.filterFom.valid) {
      const { value: chartType } = await Swal.fire({
        title: 'Selecciona el tipo de gráfico',
        input: 'select',
        inputOptions: {
          line: 'Línea',
          bar: 'Barra',
          radar: 'Radar',
          pie: 'Pastel',
          doughnut: 'Rosquilla',
          polarArea: 'Área Polar',
        },
        inputPlaceholder: 'Selecciona un tipo de gráfico',
        showCancelButton: true,
        confirmButtonColor: "#007bff",
        cancelButtonColor: "#6c757d",
        confirmButtonText: "Generar",
        cancelButtonText: "Cancelar",
      });
      

      if (!chartType) {
        return;
      }

      this.isLoading = true;
      debugger
      setTimeout(async () => {
        const name = this.filterFom.get('name')?.value;
        let startDate = this.filterFom.get('startDate')?.value;
        startDate = this.datePipe.transform(startDate, 'dd/MM/yyyy');
        let endDate = this.filterFom.get('endDate')?.value;
        endDate = this.datePipe.transform(endDate, 'dd/MM/yyyy');

        const partesFecha = startDate.split('/');
        const fecha = new Date(parseInt(partesFecha[2], 10), parseInt(partesFecha[1], 10) - 1, parseInt(partesFecha[0], 10));

        const partesFecha2 = endDate.split('/');
        const fecha2 = new Date(parseInt(partesFecha2[2], 10), parseInt(partesFecha2[1], 10) - 1, parseInt(partesFecha2[0], 10));

        console.log(fecha)
        console.log(fecha2)

        const data = this.listPointsHistory.filter(item => {
          const partesFecha3 = item.date.split('-');
          const fecha3 = new Date(parseInt(partesFecha3[2], 10), parseInt(partesFecha3[1], 10) - 1, parseInt(partesFecha3[0], 10));
          return fecha3 >= fecha && fecha3 <= fecha2
        });


        if (data.length === 0) {
          return;
        }

        const ctx = document.getElementById('myChart') as HTMLCanvasElement;
        if (!ctx) {
          return;
        }


        let nombres: string[] = [];
        let puntos: number[] = [];
        
        
        this.allCustomers.forEach(customer => {
          const customerData = data.find(element => element.documentNumber === customer.document_number);
        
          if (customerData) {
            const nombreCompleto = `${customer.first_name} ${customer.last_name} ${customer.company_name}`;
            const totalPuntos = data.reduce((accum, x) => (x.documentNumber === customer.document_number ? accum + x.points : accum), 0);
        
            nombres.push(nombreCompleto);
            puntos.push(totalPuntos);
          }
        });
        

        const labels = nombres;
        const dataset = puntos;
        const datasetLabel = `${nombres} (Puntos: ${puntos})`;

        if (this.myChart) {
          this.myChart.destroy();
        }
        this.myChart = new Chart(ctx, {
          type: chartType, // Change this line
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
              text: `Clientes: ${name}`
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
      startDate: ''
    });
    if (this.myChart) {
      this.myChart.destroy();
    }
  }
}
