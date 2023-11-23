import { Component, OnDestroy, OnInit } from '@angular/core';
import { WarehouseService } from '../../services/warehouse-service/warehouse.service';
import { LocationInfoDto } from '../../models/location-info.interface';
import { Subscription } from 'rxjs';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { Chart } from 'chart.js';
import { Pagination } from '../../models/pagination';
import { LocationService } from '../../services/location.service';

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
  constructor(private warehouseService: WarehouseService, private locationService: LocationService) { }
  ngOnDestroy(): void {
    this.subscripciones.unsubscribe();
  }
  uniqueZones: string[] = []
  uniqueSections: string[] = []
  uniqueSpaces: string[] = []
  uniqueCategories: string[] = []
  ngOnInit(): void {
    this.uniqueZones = Array.from(new Set(this.locationInfoListMock.map(item => item.location.zone)));
    this.uniqueSections = Array.from(new Set(this.locationInfoListMock.map(item => item.location.section)));
    this.uniqueSpaces = Array.from(new Set(this.locationInfoListMock.map(item => item.location.space)));
    this.uniqueCategories = Array.from(new Set(this.locationInfoListMock.map(item => item.category_name)));

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
        this.locationInfoList = this.locationService.locationInfoListMock;
        this.originalList = [...this.locationInfoList];
        this.filteredList = [...this.locationService.locationInfoListMock];
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
  filterSpace: string = '';
  filterCategory: string = '';

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
                  size: 50
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



  currentSort: { column: keyof LocationInfoDto, order: 'asc' | 'desc' } = { column: 'product_name', order: 'asc' };

  sortData(column: keyof LocationInfoDto | string): void {
    if (this.currentSort.column === column) {
      this.currentSort.order = this.currentSort.order === 'asc' ? 'desc' : 'asc';
    } else {
      this.currentSort.column = column as keyof LocationInfoDto;
      this.currentSort.order = 'asc';
    }

    this.filteredList = this.locationInfoList.sort((a, b) => {
      const valueA = this.getPropertyValue(a, this.currentSort.column);
      const valueB = this.getPropertyValue(b, this.currentSort.column);

      if (typeof valueA === 'string' && typeof valueB === 'string') {
        return this.currentSort.order === 'asc' ? valueA.localeCompare(valueB) : valueB.localeCompare(valueA);
      } else if (typeof valueA === 'number' && typeof valueB === 'number') {
        return this.currentSort.order === 'asc' ? valueA - valueB : valueB - valueA;
      } else {

        if (valueA instanceof Date && valueB instanceof Date) {
          return this.currentSort.order === 'asc' ? valueA.getTime() - valueB.getTime() : valueB.getTime() - valueA.getTime();
        } else {
          return 0;
        }
      }
    });
  }

  getPropertyValue(obj: any, propPath: string): any {
    const props = propPath.split('.');
    let value = obj;

    for (const prop of props) {
      value = value[prop];
    }

    return value;
  }
  quantityFilter: number = 0;
  quantityOperator: string = 'gte';

  productNameFilter: string = '';
  sectionFilter: string = '';

  updateFilteredList() {
    this.filteredList = this.locationInfoListMock.filter(item =>
      item.product_name.toLowerCase().includes(this.productNameFilter.toLowerCase()) &&
      (this.filterZone === '' || item.location.zone === this.filterZone) &&
      (this.filterSection === '' || item.location.section === this.filterSection) &&
      (this.filterSpace === '' || item.location.space === this.filterSpace) &&
      (this.filterCategory === '' || item.category_name === this.filterCategory) &&
      ((this.quantityFilter == null || this.quantityFilter === 0) || (
        (this.quantityOperator === 'gte' && item.quantity >= this.quantityFilter) ||
        (this.quantityOperator === 'lte' && item.quantity <= this.quantityFilter)
      ))
    );
  }


  previousPage() { }
  nextPage() { }
  locationInfoListMock: LocationInfoDto[] = [
    {
      location: {
        zone: 'Salón',
        section: '1',
        space: '101',
      },
      location_id: 1,
      category_name: 'Herramientas manuales',
      product_name: 'Calibre Digital 1150d',
      quantity: 3,
      measure_unit: 1,
      max_capacity: 5,
    },
    {
      location: {
        zone: 'Nave',
        section: '4',
        space: '202',
      },
      location_id: 2,
      category_name: 'Herramientas eléctricas',
      product_name: 'Amoladora angular 820w',
      quantity: 5,
      measure_unit: 2,
      max_capacity: 50,
    },
    {
      location: {
        zone: 'Patio',
        section: '2',
        space: '201',
      },
      location_id: 3,
      category_name: 'Pavimentación',
      product_name: 'Trompito hormiguero',
      quantity: 8,
      measure_unit: 3,
      max_capacity: 10,
    },
    {
      location: {
        zone: 'Salón',
        section: '3',
        space: '102',
      },
      location_id: 4,
      category_name: 'Ferretería general',
      product_name: 'Escalera telescópica Philco 13 escalones',
      quantity: 15,
      measure_unit: 1,
      max_capacity: 150,
    },
    {
      location: {
        zone: 'Patio',
        section: '1',
        space: '201',
      },
      location_id: 5,
      category_name: 'Pavimentación',
      product_name: 'Mezclador pintura/cemento Einhell Tc-mx 1200',
      quantity: 20,
      measure_unit: 2,
      max_capacity: 200,
    },
    {
      location: {
        zone: 'Patio',
        section: '2',
        space: '202',
      },
      location_id: 6,
      category_name: 'Accesorioes vehiculares',
      product_name: 'Tuercas bulones antirrobo McGard Onix Prisma Spin',
      quantity: 7,
      measure_unit: 3,
      max_capacity: 70,
    },
  ];
}
