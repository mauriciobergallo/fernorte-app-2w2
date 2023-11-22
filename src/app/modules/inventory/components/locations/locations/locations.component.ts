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
  totalCapacity: number = 100000;
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
    if (!this.zonas || this.zonas.length === 0) {
      return 0;
    }

    const ocupacionTotal = this.zonas.reduce(
      (total, zona) => total + zona.maxCapacity,
      0
    );

    return ocupacionTotal;
  }
  updateZoneCapacity(event: Event): void {
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

    document.body.classList.remove('modal-open');
  }

  updateZoneName(event: Event): void {
    if (event.target instanceof HTMLInputElement) {
      this.zoneName = event.target.value;
    }
  }

  cargarZona(zona: Zone): void {
    this.zone = zona;
    console.log(this.zone);
  }

  eliminarZona(zona: Zone): void {
    setTimeout(() => {
      if (zona.sections.length > 0) {
        Swal.fire({
          title: `¿Está seguro que desea eliminar ${zona.name}?`,
          text: '¡No podrás revertir esto!',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#dc3545',
          cancelButtonColor: '#6c757d',
          confirmButtonText: '¡Sí, bórrar!',
          cancelButtonText: 'Cancelar',
        }).then((result) => {
          if (result.isConfirmed) {
            this.service.removeZone(zona);
            Swal.fire({
              title: '¡Éxito!',
              text: 'Operación ejecutada con éxito.',
              icon: 'success',
            });
          }
        });
      } else {
        Swal.fire({
          title: `¿Está seguro que desea eliminar ${zona.name}?`,
          text: '¡No podrás revertir esto!',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#dc3545',
          cancelButtonColor: '#6c757d',
          confirmButtonText: '¡Sí, bórrar!',
          cancelButtonText: 'Cancelar',
        }).then((result) => {
          if (result.isConfirmed) {
            this.service.removeZone(zona);
            Swal.fire({
              title: '¡Éxito!',
              text: 'Operación ejecutada con éxito.',
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
