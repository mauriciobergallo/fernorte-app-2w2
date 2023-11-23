import { Component, OnDestroy, OnInit } from '@angular/core';
import { WarehouseService } from '../../services/warehouse-service/warehouse.service';
import { LocationInfoDto } from '../../models/location-info.interface';
import { Subscription } from 'rxjs';
import jsPDF from 'jspdf';
//import 'jspdf-autotable';
import { Chart } from 'chart.js';
import { Pagination } from '../../models/pagination';

@Component({
  selector: 'fn-current-inventory',
  templateUrl: './current-inventory.component.html',
  styleUrls: ['./current-inventory.component.css'],
})
export class CurrentInventoryComponent implements OnInit, OnDestroy {
  locations: Pagination | undefined;
  locationInfoList: LocationInfoDto[] = [];
  originalList: LocationInfoDto[] = [];
  filteredList: LocationInfoDto[] = [];
  loading: boolean = false;
  private subscripciones = new Subscription();
  currentPage: number = 1;
  totalPages: number = 1;
  constructor(private warehouseService: WarehouseService) {}
  ngOnDestroy(): void {
    this.subscripciones.unsubscribe();
  }

  ngOnInit(): void {
    this.fillTable();
  }

  private fillTable() {
    this.loading = true;
    this.warehouseService.getLocationsInfoFiltered(0).subscribe({
      next: (resp: Pagination) => {
        this.locations = resp;
        this.locationInfoList = resp.items;
        this.filteredList = [...this.locations.items];
        this.originalList = [...this.locations.items];
        this.loading = false;
      },
      error: (error) => {
        this.loading = false;
        console.log(error);
        this.locationInfoList = this.locationInfoListMock;
        this.originalList = [...this.locationInfoList];
        this.filteredList = [...this.locationInfoListMock];
      },
    });
  }

  filterByZone(zone: string) {
    this.filteredList = this.locationInfoList.filter(
      (item) => item.location.zone === zone
    );
  }

  filterBySection(section: string) {
    this.filteredList = this.locationInfoList.filter(
      (item) => item.location.section === section
    );
  }

  filterZone: string = '';
  filterSection: string = '';

  applyFilters() {
    let filteredList = [...this.originalList]; // Filtra desde la lista original
    const lowercaseFilterZone = this.filterZone.toLowerCase();
    const lowercaseFilterSection = this.filterSection.toLowerCase();

    if (this.filterZone && this.filterSection) {
      filteredList = filteredList.filter(
        (item) =>
          item.location.zone.toLowerCase().includes(lowercaseFilterZone) &&
          item.location.section.toLowerCase().includes(lowercaseFilterSection)
      );
    } else if (this.filterZone) {
      filteredList = filteredList.filter((item) =>
        item.location.zone.toLowerCase().includes(lowercaseFilterZone)
      );
    } else if (this.filterSection) {
      filteredList = filteredList.filter((item) =>
        item.location.section.toLowerCase().includes(lowercaseFilterSection)
      );
    }

    this.filteredList = [...filteredList];
  }

  generateChart() {
    const totalCapacity = this.filteredList.reduce(
      (acc, item) => acc + item.max_capacity,
      0
    );
    const totalOccupied = this.filteredList.reduce(
      (acc, item) => acc + item.quantity,
      0
    );
    const totalFree = totalCapacity - totalOccupied;

    const data = [totalOccupied, totalFree]; // Cantidad ocupada y espacio libre
    const labels = [
      'Espacio Ocupado :' + totalOccupied,
      'Espacio Libre: ' + totalFree,
    ];

    const canvas = document.getElementById('myChart') as HTMLCanvasElement;
    const ctx = canvas.getContext('2d');
    Chart.getChart(canvas)?.destroy();

    const chartData = {
      labels,
      datasets: [
        {
          data,
          backgroundColor: [
            'rgba(255, 99, 132, 0.7)', // Color para el espacio ocupado
            'rgba(54, 162, 235, 0.7)', // Color para el espacio libre
          ],
        },
      ],
    };

    let chartImage = null;

    if (ctx) {
      // Create the chart
      new Chart(ctx, {
        type: 'pie',
        data: chartData,
        options: {
          animation: {
            duration: 0,
          },
          plugins: {
            legend: {
              display: true,
              labels: {
                font: {
                  size: 25
                }
              }
            }
          }
        },
      });

      return new Promise<string>((resolve) => {
        setTimeout(() => {
          chartImage = canvas.toDataURL('image/png');
          resolve(chartImage);
        }, 1000);
      });
    }
    return Promise.resolve('');
  }

  async downloadPDF() {
    const pdf = new jsPDF() as any;

    const logoUrl = '/assets/logo.png'; 
    const dataTable = this.filteredList;

    const logoImage = await this.getImageData(logoUrl);
  
    pdf.addImage(logoImage, 'PNG', 150, 0, 50, 15);
    const headers = [
      'Producto',
      'Zona',
      'Sección',
      'Espacio',
      'Cantidad actual',
      'Maxima capacidad',
    ];
    const rows = dataTable.map((item) => [
      item.product_name,
      item.location.zone,
      item.location.section,
      item.location.space,
      item.quantity,
      item.max_capacity,
    ]);

    pdf.text('Reporte de Inventario Actual', 10, 10);
    pdf.autoTable({
      startY: 20,
      head: [headers],
      body: rows,
    });

    const chartImage = await this.generateChart();

    if (chartImage) {
    const imageWidth = 120; 
    const imageHeight = 120; 
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();

    const x = (pdfWidth - imageWidth) / 2;
    const y = 100; 

    pdf.addImage(chartImage, 'PNG', x, y, imageWidth, imageHeight);

    }

    pdf.save('reporte_inventario.pdf');
  }

  async getImageData(url: string): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          reject('Could not create canvas context');
          return;
        }
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);
        resolve(canvas.toDataURL('image/png'));
      };
      img.onerror = (error) => reject(error);
      img.src = url;
    });
  }

  previousPage() {}
  nextPage() {}
  locationInfoListMock: LocationInfoDto[] = [
    {
      location: {
        zone: 'Zone A',
        section: 'Section 1',
        space: 'Space 101',
      },
      location_id: 1,
      category_name: 'Category X',
      product_name: 'Product Alpha',
      quantity: 3,
      measure_unit: 1,
      max_capacity: 5,
      product_id: undefined
    },
    {
      location: {
        zone: 'Zone B',
        section: 'Section 2',
        space: 'Space 202',
      },
      location_id: 2,
      category_name: 'Category Y',
      product_name: 'Product Beta',
      quantity: 5,
      measure_unit: 2,
      max_capacity: 50,
      product_id: undefined

    },
    {
      location: {
        zone: 'Zone A',
        section: 'Section 2',
        space: 'Space 201',
      },
      location_id: 3,
      category_name: 'Category Z',
      product_name: 'Product Gamma',
      quantity: 8,
      measure_unit: 3,
      max_capacity: 10,
      product_id: undefined

    },
    {
      location: {
        zone: 'Zone C',
        section: 'Section 1',
        space: 'Space 102',
      },
      location_id: 4,
      category_name: 'Category W',
      product_name: 'Product Delta',
      quantity: 15,
      measure_unit: 1,
      max_capacity: 150,
      product_id: undefined

    },
    {
      location: {
        zone: 'Zone B',
        section: 'Section 1',
        space: 'Space 201',
      },
      location_id: 5,
      category_name: 'Category A',
      product_name: 'Product Epsilon',
      quantity: 20,
      measure_unit: 2,
      max_capacity: 200,
      product_id: undefined

    },
    {
      location: {
        zone: 'Zone C',
        section: 'Section 2',
        space: 'Space 202',
      },
      location_id: 6,
      category_name: 'Category B',
      product_name: 'Product Zeta',
      quantity: 7,
      measure_unit: 3,
      max_capacity: 70,
      product_id: undefined

    },
  ];
}
