import { Component } from '@angular/core';
import Swal from 'sweetalert2';
import { Section } from '../../../models/locations/section';
import { Zone } from '../../../models/locations/zone';
import { LocationService } from '../../../services/location.service';
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  Router,
} from '@angular/router';
@Component({
  selector: 'fn-sections',
  templateUrl: './sections.component.html',
  styleUrls: ['./sections.component.css'],
})
export class SectionsComponent {
  sections: Section[] = [];
  zone: Zone = {
    Id: 0,
    name: '',
    maxCapacity: 0,
    mts2: 0,
    sections: [],
  };
  nuevaZona: any = {};
  sectionName = '';
  sectioCapacity: number = 0;
  sectionCategory: string = '';
  totalCapacity: number = 0;
  section: Section = {
    Id: 0,
    name: '',
    categoryName: '',
    maxCapacity: 0,
    spaces: [],
  };
  constructor(
    private service: LocationService,
    private router: Router,
    private route: ActivatedRoute
  ) {}
  ngOnInit(): void {
    const id = this.getIdFromRouteSnapshot(this.route.snapshot);
    this.getZone(Number(id));
  }

  getZone(id: number) {
    console.log(id);

    this.zone = this.service.getZoneById(id);
    this.sections = this.zone.sections;
    this.totalCapacity = this.zone.maxCapacity;
    console.log(this.zone);
  }
  private getIdFromRouteSnapshot(
    routeSnapshot: ActivatedRouteSnapshot
  ): string | null {
    return routeSnapshot.paramMap.get('id');
  }

  excedeCapacidadMaxima(): boolean {
    console.log(this.sectioCapacity);
    return this.getOcupacionTotal() + this.sectioCapacity >= this.totalCapacity;
  }

  getOcupacionTotal(): number {
    if (!this.sections || this.sections.length === 0) {
      return 0;
    }

    const ocupacionTotal = this.sections.reduce(
      (total, zona) => total + zona.maxCapacity,
      0
    );

    return ocupacionTotal;
  }
  updateZoneCapacity(event: Event): void {
    if (event.target instanceof HTMLInputElement) {
      this.sectioCapacity = parseInt(event.target.value, 10);
    }
  }
  navigateToSpace(section: Section) {
    this.router.navigate([
      'inventory',
      'locations',
      this.zone.Id,
      'section',
      section.Id,
      'spaces',
    ]);
  }

  updateZoneCategory(event: any): void {
    console.log('SECCION', event.target?.value);
    this.sectionCategory = event.target.value;
    // if (event.target instanceof HTMLInputElement) {
    //   this.sectionCategory = event.target.value;
    //   console.log('SECCION', this.sectionCategory);
    // }
  }

  updateZoneName(event: Event): void {
    if (event.target instanceof HTMLInputElement) {
      this.sectionName = event.target.value;
    }
  }

  cargarZona(section: Section): void {
    this.section = section;
  }

  eliminarZona(section: Section): void {
    setTimeout(() => {
      if (section.spaces.length > 0) {
        Swal.fire({
          title: `¿Está seguro que desea eliminar ${section.name}?`,
          text: '¡No podrás revertir esto!',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#dc3545',
          cancelButtonColor: '#6c757d',
          confirmButtonText: '¡Sí, bórrar!',
          cancelButtonText: 'Cancelar',
        }).then((result) => {
          if (result.isConfirmed) {
            this.service.removeSection(this.zone.Id, section);

            Swal.fire({
              title: '¡Éxito!',
              text: 'Operación ejecutada con éxito.',
              icon: 'success',
            });
          }
        });
      } else {
        Swal.fire({
          title: `¿Está seguro que desea eliminar ${section.name}?`,
          text: '¡No podrás revertir esto!',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#dc3545',
          cancelButtonColor: '#6c757d',
          confirmButtonText: '¡Sí, bórrar!',
          cancelButtonText: 'Cancelar',
        }).then((result) => {
          if (result.isConfirmed) {
            this.service.removeSection(this.zone.Id, section);

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
  insertZone() {
    this.section = {
      Id: Math.floor(Math.random() * 30),
      name: this.sectionName,
      categoryName: this.sectionCategory,
      maxCapacity: this.sectioCapacity,
      spaces: [],
    };
    this.service.insertSection(this.zone.Id, this.section);
    this.closeInsertEspacioModal();
    setTimeout(() => {
      Swal.fire({
        icon: 'success',
        title: '!Sección creada con éxito!',
        text: '',
      });
    }, 100);
  }
  backToSections() {
    this.router.navigate(['inventory', 'locations']);
  }
}
