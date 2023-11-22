import { Component, OnInit } from '@angular/core';
import { Zone } from '../../../models/locations/zone';
import { LocationService } from '../../../services/location.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
@Component({
  selector: 'fn-locations',
  templateUrl: './locations.component.html',
  styleUrls: ['./locations.component.css'],
})
export class LocationsComponent implements OnInit {
  zonas: Zone[] = [];
  nuevaZona: any = {};
  zoneName = '';
  zoneCapacity: number = 0;
  totalCapacity: number = 10000;
  zone: Zone = {
    Id: 0,
    name: '',
    maxCapacity: 0,
    mts2: 0,
    sections: [],
  };
  constructor(private service: LocationService, private router: Router) {}
  ngOnInit(): void {
    this.getZones();
  }
  getZones() {
    this.zonas = this.service.getZones();
  }

  excedeCapacidadMaxima(): boolean {
    console.log(this.zoneCapacity);
    return this.getOcupacionTotal() + this.zoneCapacity >= this.totalCapacity;
  }

  getOcupacionTotal(): number {
    // Asegúrate de que this.zonas esté definido
    if (!this.zonas || this.zonas.length === 0) {
      return 0; // Retorna 0 si no hay zonas definidas
    }

    // Calcula la ocupación total sumando los mts2 de cada zona
    const ocupacionTotal = this.zonas.reduce(
      (total, zona) => total + zona.maxCapacity,
      0
    );

    return ocupacionTotal;
  }
  updateZoneCapacity(event: Event): void {
    // Verificar si el objetivo del evento es un elemento de entrada
    if (event.target instanceof HTMLInputElement) {
      this.zoneCapacity = parseInt(event.target.value, 10);
    }
  }

  closeInsertEspacioModal() {
    const modalElement = document.getElementById('agregarUbicacionModal');
    const backdropElement = document.querySelector('.modal-backdrop');

    if (modalElement) {
      modalElement.classList.remove('show');
      modalElement.style.display = 'none';
    }

    if (backdropElement) {
      document.body.removeChild(backdropElement);
    }

    // Remove the modal-open class from the body
    document.body.classList.remove('modal-open');
  }

  updateZoneName(event: Event): void {
    // Verificar si el objetivo del evento es un elemento de entrada
    if (event.target instanceof HTMLInputElement) {
      this.zoneName = event.target.value;
    }
  }

  cargarZona(zona: Zone): void {
    // Verificar si el objetivo del evento es un elemento de entrada

    this.zone = zona;
    console.log(this.zone);
  }

  eliminarZona(zona: Zone): void {
    setTimeout(() => {
      if (zona.sections.length > 0) {
        Swal.fire({
          title: 'Desea eliminar la zona?',
          text: 'Está zona contiene secciones definidas, desea eliminarla igualmente?',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Sí',
        }).then((result) => {
          if (result.isConfirmed) {
            this.service.removeZone(zona);

            Swal.fire({
              title: 'Zona Eliminada!',
              text: '',
              icon: 'success',
            });
          }
        });
      } else {
        Swal.fire({
          title: 'Desea eliminar la zona?',
          text: '',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Sí',
        }).then((result) => {
          if (result.isConfirmed) {
            this.service.removeZone(zona);
            Swal.fire({
              title: 'Zona Eliminada!',
              text: '',
              icon: 'success',
            });
          }
        });
      }
    }, 100);
  }

  insertZone() {
    setTimeout(() => {
      this.zone.maxCapacity = this.zoneCapacity;
      this.zone.name = this.zoneName;
      this.service.insertZone(this.zone);
      this.closeInsertEspacioModal();
      Swal.fire({
        icon: 'success',
        title: '¡Zona creada con éxito!',
        text: '',
      });
    }, 100);
  }

  navigateToSections(zone: Zone) {
    this.router.navigate(['inventory', 'locations', zone.Id, 'section']);
  }
}
