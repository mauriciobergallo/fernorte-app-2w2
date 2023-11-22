import { Component, OnInit } from '@angular/core';
import { Section } from '../../models/section';
import { Zone } from '../../models/zone';
import { LocationService } from '../../services/location.service';
import { ActivatedRoute, ActivatedRouteSnapshot, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Space } from '../../models/space';
import { NgModel } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'fn-space',
  templateUrl: './space.component.html',
  styleUrls: ['./space.component.css']
})
export class SpaceComponent implements OnInit {
  spaces: Space[] = [];
  selectedProduct =new  Product('','');


  onSelectProduct(event: any) {
    const selectedIndex = event.target.selectedIndex;
    this.selectedProduct = this.productMock[selectedIndex];
    console.log(this.selectedProduct);
    
  }

  productMock: Product[] = [
    new Product('', ''),
    new Product('Taladro', 'Unidad'),
    new Product('Destornillador', 'Unidad'),
    new Product('Martillo', 'Unidad'),
    new Product('Sierra', 'Unidad'),
    new Product('Destornillador eléctrico', 'Unidad'),
    new Product('Llave ajustable', 'Unidad'),
    new Product('Cinta métrica', 'Unidad'),
    new Product('Pintura en spray', 'Lata'),
    new Product('Pincel', 'Unidad'),
    new Product('Brocas para taladro', 'Paquete'),
    new Product('Clavos', 'Paquete'),
    new Product('Destornillador de precisión', 'Unidad'),
    new Product('Nivel', 'Unidad'),
    new Product('Caja de herramientas', 'Unidad'),
    new Product('Lámpara de trabajo LED', 'Unidad'),
  ]; 
  space : Space = 
  {
    Id: 0,
    name: '',
    quantity: 0,
    measureUnit: '',
    maxCapacity: 0,
    productId: 0,
    productName: '',
    remarks: ''
  }
   zone: Zone = 
  {
    Id: 0,
    name: '',
    maxCapacity: 0,
    mts2: 0,
    sections :[]
  };  nuevaZona: any = {};
  sectionName = "";
  sectioCapacity: number = 0;
  sectionCategory : string = '';
  totalCapacity : number = 0;
  section: Section = 
  {
    Id: 0,
    name: '',
    categoryName: '',
    maxCapacity: 0,
    spaces :[]
  };
  constructor(private service: LocationService,private router: Router, private route: ActivatedRoute,private modalService: NgbModal){}

  ngOnInit(): void {
    const id = this.getZoneIdFromRouteSnapshot(this.route.snapshot);
    const sectionId = this.getSectionIdFromRouteSnapshot(this.route.snapshot);
    this.getZone(Number(id),Number(sectionId));
  }

  getZone(id: number, sectionId: number)
  {

    this.section = this.service.getSectionById(id,sectionId);
    this.spaces = this.section.spaces;
    this.zone = this.service.getZoneById(id);
    this.totalCapacity = this.section.maxCapacity;
    console.log(this.zone);

  }
  private getZoneIdFromRouteSnapshot(routeSnapshot: ActivatedRouteSnapshot): string | null {
    return routeSnapshot.paramMap.get('id');
  }

  private getSectionIdFromRouteSnapshot(routeSnapshot: ActivatedRouteSnapshot): string | null {
    return routeSnapshot.paramMap.get('sectionId');
  }

  excedeCapacidadMaxima(): boolean {
   
    console.log(this.sectioCapacity);
    return (this.getOcupacionTotal() + this.sectioCapacity) >= this.totalCapacity;
  }
  
  getOcupacionTotal(): number {
    if (!this.spaces || this.spaces.length === 0) {
      return 0;
    }
  
    const ocupacionTotal = this.spaces.reduce((total, zona) => total + zona.maxCapacity, 0);
  
    return ocupacionTotal;
  }
  updateZoneCapacity(event: Event): void {
    if (event.target instanceof HTMLInputElement) {
      this.sectioCapacity = parseInt(event.target.value, 10);
    }
  }

  updateZoneCategory(event: Event): void {
    if (event.target instanceof HTMLInputElement) {
      this.sectionCategory = event.target.value;
    }
  }

  updateZoneName(event: Event): void {
    if (event.target instanceof HTMLInputElement) {
      this.sectionName =event.target.value;
    }
  }

  cargarZona(section : Section): void {
      this.section =section;
  }

  spaceToEdit : Space = 
  {
    Id: 0,
    name: '',
    quantity: 0,
    measureUnit: '',
    maxCapacity: 0,
    productId: 0,
    productName: '',
    remarks: ''
  }

  openEditarModal() {
    this.modalService.open('editarModal', { centered: true, size: 'lg' });
  }
  cargarEspacio(space: Space)
  {
    this.spaceToEdit = space;
  }
  eliminarZona(space: Space): void {

    setTimeout(() => {

        Swal.fire({
          title: "Desea eliminar el espacio?",
          text: "",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Sí"
        }).then((result) => {
          if (result.isConfirmed) {
            this.service.removeSpace(this.zone.Id,this.section.Id,space);
            Swal.fire({
              title: "Espacio Eliminado!",
              text: "",
              icon: "success"
            });
          }
        });
      
  }, 100);
  }

  insertZone()
  {
    this.space = 
    {
      Id: 0,
      name : this.sectionName,
      productId:29,
      quantity:10,
      productName: this.selectedProduct.name,
      measureUnit: this.selectedProduct.measureUnit,
      maxCapacity: this.sectioCapacity,
      remarks: '',
    };
    console.log(this.zone.Id);
    console.log(this.section.Id);
    this.service.insertSpace(this.zone.Id, this.section.Id,this.space);
    setTimeout(() => {

      Swal.fire({
        
          icon: 'success',
          title: '!Espacio creado con éxito!',
          text: '',
      });
  }, 100);

  }

}


export class Product {
  name: string = '';
  measureUnit: string = '';

  constructor(name: string, measureunit: string)
  {
    this.name = name;
    this.measureUnit = measureunit;
  }
}
