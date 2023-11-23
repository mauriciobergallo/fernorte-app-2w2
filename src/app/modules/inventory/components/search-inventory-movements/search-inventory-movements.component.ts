import { Component, OnInit, OnDestroy, ElementRef, HostListener } from '@angular/core';
import { Subscription, timer } from 'rxjs';
import { IMovementDto } from '../../models/IMovementDto';
import { MovementType } from '../../models/IMovementTypeEnum';
import { MovementsService } from '../../services/movements-service/movements.service';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { Pagination } from '../../models/pagination';
import jsPDF from 'jspdf';
import { Chart } from 'chart.js/auto';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'fn-search-inventory-movements',
  templateUrl: './search-inventory-movements.component.html',
  styleUrls: ['./search-inventory-movements.component.css'],
})
export class SearchInventoryMovementsComponent implements OnInit, OnDestroy {
  movimientosOriginales: IMovementDto[] = [];
  movimientos: IMovementDto[] = [];
  isLoading: boolean = false;;
  movCargados:boolean=false;
  private subscripciones = new Subscription();
  loading = false;
  actualRole: string = '';
  currentPage = 1;
  totalPages = 1;

  mostrarDetalleMovimiento: number | null = null;
  mostrarDetalle: boolean = false;


  showDetail(i: number) {
    if (i === this.mostrarDetalleMovimiento) {
      this.mostrarDetalle = false;
      this.mostrarDetalleMovimiento = null;
      return;
    }
    this.mostrarDetalle = true;
    this.mostrarDetalleMovimiento = i;
  }

  getMovementTypeTranslate(mov: MovementType | null): string {
    if (mov == null) return '-'
    if (mov == MovementType.INBOUND) return 'Entrada'
    if (mov == MovementType.OUTBOUND) return 'Salida'
    return '-'
  }

  reload(){
    this.isLoading=true;
    this.getMovementsPage(this.currentPage);
    this.isLoading=false;
  }

  removeMov(idx: number){
    Swal.fire({
      title: '¿Estás seguro de borrar el movimiento?',
      text: "¡No podrás revertir esta acción!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, borrar!',
      cancelButtonText: 'No, cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.movimientos.splice(idx,1)
        Swal.fire(
          '¡Eliminado!',
          'Tu archivo ha sido eliminado.',
          'success'
        )
      }
    });
  }


  editMov(mov: IMovementDto){
    this.movementService.seleccionarMovimiento(mov);
   // this.router.navigate(['/inventory/edit-movement']);
   this.router.navigate(['../edit-movement'], { relativeTo: this.route });
  }

  orderDetail(idx: number) {
    //this.movimientos[idx].movement_details.
  }

  ngOnDestroy(): void {
    this.subscripciones.unsubscribe();
  }

  constructor(private movementService: MovementsService, private router: Router,  private route: ActivatedRoute,
    private eRef: ElementRef) {
    this.loading=true;
    this.isLoading=true;
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.getMovementsPage(this.currentPage);
    }
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.getMovementsPage(this.currentPage);

    }
  }
  changePage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  ngOnInit() {
    this.isLoading=true;
    this.loading=true;
    let credential = JSON.parse(localStorage.getItem('credentials') || 'N/N');
    this.actualRole = credential.role[1];

    this.getMovementsPage(this.currentPage);
    this.isLoading=false;
    this.loading=false;
    //this.fillTable();

  }

  filterByDate(event: { from: NgbDate | null; to: NgbDate | null }) {

    if (event.from && event.to) {

      let fromDate = new Date(event.from.year, event.from.month - 1, event.from.day);
      let toDate = new Date(event.to.year, event.to.month - 1, event.to.day);

      this.movimientos = this.movimientosOriginales;
      this.movimientos = this.movimientos.filter((movement) => {

        let dateP = movement.date.split("-");

        let day = parseInt(dateP[0], 10);
        let month = parseInt(dateP[1], 10);
        let year = parseInt(dateP[2], 10);
        console.log(month)
        let movementDate = new Date(year, month - 1, day);

        return movementDate >= fromDate && movementDate <= toDate;
      });
      console.log(this.movimientos.toString() + "mov")
      console.log(this.movimientosOriginales.toString() + "movv Origins")
    } else {

    }
  }

  clearFilters() {
    this.movimientos = this.movimientosOriginales;
  }


  getMovementsPage(page: number) {
    this.isLoading = true;
    this.loading=true;
    this.subscripciones.add(
      this.movementService.getPaginationMovements(page-1).subscribe({
        next: (response: Pagination) => {
          if (response != null) {
            console.log(response)
            this.totalPages = response.totalPages;
            this.movimientosOriginales=[]
            response.items.forEach(movement => {
              this.movimientosOriginales.push(new IMovementDto(movement))
            })
            this.movimientos = [];
            this.movimientos = this.movimientosOriginales;
            this.isLoading = false;
          } else {
            console.log("No content")
          }
          this.isLoading = false;
        },
        error: (error: any) => {
          console.log(error)
        }
      })
    )
    this.loading=false;
  this.isLoading = false;
  }

  generateChart() {
    const labels = ['Productos Salientes', 'Productos Ingresantes'];
  
    const canvas = document.getElementById('myChart') as HTMLCanvasElement;
    const ctx = canvas.getContext('2d');
    Chart.getChart(canvas)?.destroy();
  
    const outboundMovements = this.movimientos.filter(movement => movement.movement_type === MovementType.OUTBOUND);
    const productsSalientes = outboundMovements.reduce((total, movement) => {
      movement.movement_details.forEach(detail => {
        total += detail.quantity;
      });
      return total;
    }, 0);
  
    const inboundMovements = this.movimientos.filter(movement => movement.movement_type === MovementType.INBOUND);
    const productsIngresantes = inboundMovements.reduce((total, movement) => {
      // Iterar sobre los detalles del movimiento y sumar las cantidades
      movement.movement_details.forEach(detail => {
        total += detail.quantity;
      });
      return total;
    }, 0);
  
    const backgroundColors = [
      'rgba(255, 99, 132, 0.2)', // Color para productos salientes
      'rgba(54, 162, 235, 0.2)', // Color para productos ingresantes
    ];
  
    const borderColors = [
      'rgba(255, 99, 132, 1)', // Borde para productos salientes
      'rgba(54, 162, 235, 1)', // Borde para productos ingresantes
    ];
  
    const chartData = {
      labels,
      datasets: [{
        data: [productsSalientes, productsIngresantes],
        backgroundColor: backgroundColors,
        borderColor: borderColors,
        borderWidth: 1,
      }],
    };
  
    if (ctx) {
      // Crear el gráfico
      new Chart(ctx, {
        type: 'bar',
        data: chartData,
        options: {
          animation: {
            duration: 0,
          },
          scales: {
            y: {
              beginAtZero: true,
              title: {
                display: true,
                text: 'Cantidad de Productos',
              },
            },
            x: {
              title: {
                display: true,
                text: 'Tipo de Producto',
              },
            },
          },
          plugins:{
            legend: {
              display: false,
            }
          }
        },
      });
  
      return new Promise<string>((resolve) => {
        setTimeout(() => {
          const chartImage = canvas.toDataURL('image/png');
          resolve(chartImage);
        }, 1000);
      });
    }
    return Promise.resolve('');
  }

  async downloadPDF() {
    const dataTable = this.movimientos;
    const pdf = new jsPDF('landscape', 'px', 'a4') as any;

    const logoUrl = '/assets/logo.png'; 

    const logoImage = await this.getImageData(logoUrl);
  
    pdf.addImage(logoImage, 'PNG', 550, 0, 70, 30);

    pdf.text('Reporte de movimientos del inventario', 10, 10);

    // Renderizar el gráfico en el PDF
    const chartImage = await this.generateChart();
    if (chartImage) {
      const imageWidth = pdf.internal.pageSize.getWidth() - 20; // Ancho del gráfico igual al ancho del PDF
      const imageHeight = pdf.internal.pageSize.getHeight() - 100; // Alto del gráfico menor que el alto del PDF
  
      pdf.addImage(chartImage, 'PNG', 10, 80, imageWidth, imageHeight);
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
}

