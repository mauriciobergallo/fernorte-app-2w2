import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../../services/customer.service';
import { Chart } from 'chart.js/auto';
import { Customer } from '../../models/customer';

@Component({
  selector: 'fn-customer-reports',
  templateUrl: './customer-reports.component.html',
  styleUrls: ['./customer-reports.component.css']
})
export class CustomerReportsComponent implements OnInit {
  customerList: Customer[] = [];


  constructor(private customerService: CustomerService) {}


  ngOnInit(): void {
    console.log("Test")

    this.customerList = this.customers; //Reemplazar por getall de clientes
    this.customerService.getAllCustomer().subscribe(
      (response) => {
        this.customerList = response
        this.crearGraficoTarta();
      }
    )
    
  }

  


  // clientes = [
  //   { nombre: 'Cliente1', categoria: 'A' },
  //   { nombre: 'Cliente2', categoria: 'B' },
  //   // ... más clientes ...
  // ];
  customers: Customer[] = [
    {
      id_customer: 1,
      first_name: "John",
      last_name: "Doe",
      company_name: "ABC Inc",
      iva_condition: "IVA Registered",
      email: "john.doe@example.com",
      phone_number: "123-456-7890",
      birth_date: new Date("1990-01-01"),
      address: "123 Main St, City",
      document_number: "ABC123",
      document_type: "ID Card",
      customer_type: "Fisica",
      discount_factor: 0.1,
      customer_category: "ORO",
    },
    {
      id_customer: 2,
      first_name: "Jane",
      last_name: "Smith",
      company_name: "ABC Inc",
      email: "jane.smith@example.com",
      phone_number: "987-654-3210",
      birth_date: new Date("1985-05-15"),
      document_number: "XYZ789",
      document_type: "Passport",
      customer_type: "Juridica",
      customer_category: "PLATA",
    },

    {
      id_customer: 3,
      first_name: "",
      last_name: "",
      company_name: "Empresa Rodolfo",
      email: "jane.smith@example.com",
      phone_number: "987-654-3210",
      birth_date: new Date("1985-05-15"),
      document_number: "XYZ789",
      document_type: "Passport",
      customer_type: "Juridica",
      customer_category: "PLATA",
    },
    {
      id_customer: 4,
      first_name: "",
      last_name: "",
      company_name: "Empresa Rodolfo",
      email: "jane.smith@example.com",
      phone_number: "987-654-3210",
      birth_date: new Date("1985-05-15"),
      document_number: "XYZ789",
      document_type: "Passport",
      customer_type: "Juridica",
      customer_category: "BRONCE",
    },

    {
      id_customer: 1,
      first_name: "John",
      last_name: "Doe",
      company_name: "ABC Inc",
      iva_condition: "IVA Registered",
      email: "john.doe@example.com",
      phone_number: "123-456-7890",
      birth_date: new Date("1990-01-01"),
      address: "123 Main St, City",
      document_number: "ABC123",
      document_type: "ID Card",
      customer_type: "Fisica",
      discount_factor: 0.1,
      customer_category: "ORO",
    },
    // Add more customer objects as needed
  ];
  
  crearGraficoTarta() {
    debugger
    // Filtrar la lista de clientes para obtener la cantidad por categoría
    const categorias = this.customerList.map(customerList => customerList?.customer_category);
    const cantidadPorCategoria = this.contarElementos(categorias);

    const canvas: any = document.getElementById('miGraficoTarta');
    const ctx = canvas.getContext('2d');

    canvas.width = 300; // Ajusta el ancho según tus necesidades
    canvas.height = 300; // Ajusta la altura según tus necesidades


    const coloresPorCategoria = {
      'ORO': 'rgba(103,169,207)',  // Amarillo oro
      'PLATA': 'rgba(31,108,174)',  // Gris plata
      'BRONCE': 'rgba(8,46,104)',   // Marrón bronce
      'Ninguna': 'rgba(230, 169, 169, 0.7)',  // Gris por defecto
    };


    // Configurar el gráfico de tarta
    const myChart = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: Object.keys(cantidadPorCategoria),
        datasets: [{
          data: Object.values(cantidadPorCategoria),
          backgroundColor: [
           'rgba(103,169,207)',   // Amarillo oro
          'rgba(31,108,174)', // Gris plata
            'rgba(8,46,104)',  // Marrón bronce
            'rgba(169, 169, 169, 0.7)',  // Gris por defecto
           
          ],                   
          borderColor: [
            'rgba(255,255,255)',
            'rgba(255,255,255)',
            'rgba(255,255,255)',
            'rgba(255,255,255)',
            'rgba(255,255,255)',
          ],
          borderWidth: 1
        }]
      },
      options: {
        responsive: false,
        maintainAspectRatio: false,
        aspectRatio: 1,
      }
    });
  }

  contarElementos(arr: any) {
    return arr.reduce((contador: any, elem: any) => {
      contador[elem] = (contador[elem] || 0) + 1;
      return contador;
    }, {});
  }


}
