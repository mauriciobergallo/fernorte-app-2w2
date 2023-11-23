
import { Component, OnInit, OnDestroy, ViewChild, ElementRef, AfterViewInit, TemplateRef, inject, EventEmitter, Output, Input } from '@angular/core';
import { BehaviorSubject, Observable, Subject, Subscription, combineLatest } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, startWith, switchAll, switchMap, takeUntil } from 'rxjs/operators';
import { LocationInfoDto } from '../../models/location-info.interface';
import { WarehouseService } from '../../services/warehouse-service/warehouse.service';
import { MovementType } from '../../models/IMovementTypeEnum';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { ValidationError } from 'json-schema';
import { MovementsService, NewDetailMovementDto, ReqNewMovementDto } from '../../services/movements-service/movements.service';
import Swal from 'sweetalert2';
import { IMovementDto } from '../../models/IMovementDto';
import { ActivatedRoute, Router } from '@angular/router';
import { IDetailMovementDto } from '../../models/IDetailMovementDto';
import { ILocationInfoProduct } from '../../models/ILocationInfoProduct';
import { ILocationDto } from '../../models/ILocationDto';
import { User } from 'src/app/modules/customer/models/user';

export function destinationValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const origin = control.get('origen')?.value as LocationInfoDto;
    const destiny = control.get('destino')?.value as LocationInfoDto;
    const quantity = control.get('quantity')?.value as number;

    if (!origin || !destiny) {
      return null; // No puede validar sin ambos valores
    }

    const sameProduct = origin.product_name === destiny.product_name;
    const sufficientQuantity = destiny.max_capacity - destiny.quantity >= quantity;

    return sameProduct && sufficientQuantity ? null : { 'destinationInvalid': true };
  };
}
export function quantityValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const origin = control.get('origen')?.value as LocationInfoDto;
    const quantity = control.get('quantity')?.value as number;


    return origin && origin.quantity >= quantity ? null : { 'quantityInsufficient': true };
  };
}

@Component({
  selector: 'fn-edit-movimiento',
  templateUrl: './edit-movimiento.component.html',
  styleUrls: ['./edit-movimiento.component.css']
})
export class EditMovimientoComponent implements OnInit {

  movementEdit: IMovementDto | undefined;
  formMov!: FormGroup;
  locationOrigins: LocationInfoDto[] = []
  filteredOrigins: LocationInfoDto[] = []

  locationDestinis: LocationInfoDto[] = []
  selectedOriginInfo: LocationInfoDto | null = null;
  selectedDestinityInfo: LocationInfoDto | null = null;
  quantitySelect: number = 1;
  detailForm: FormGroup = new FormGroup({});
  addAviable = false;


  get detallesArray() {
    return this.formMov.get('details') as FormArray;
  }

  constructor(private fb: FormBuilder, private movementService: MovementsService,
    private warehouseService: WarehouseService, private router: Router, private route: ActivatedRoute) {
    this.movementEdit = this.movementService.obtenerMovimientoSeleccionado();
  }

  ngOnInit(): void {
    this.movementEdit = this.movementService.obtenerMovimientoSeleccionado();

    this.loadLocations()
    this.formMov = this.fb.group({
      remarks: [this.movementEdit?.remarks, [Validators.required, Validators.maxLength(20), Validators.minLength(10)]],
      details: this.fb.array([])
    });
    this.loadMovementDetails();
    this.detailForm = new FormGroup({
      quantity: new FormControl('', [Validators.required, Validators.min(1)]),
      destino: new FormControl(null, [Validators.required, Validators.min(1)]),
      origen: new FormControl(null, [Validators.required, Validators.min(1)]),
    })

    this.detailForm.setValidators([destinationValidator(), quantityValidator(), this.duplicateMovementValidator(this.detallesArray)]);

  }

  onSearchProduct(event: any) {
    const query = (event.target as HTMLInputElement).value;
    if (query.length <= 3) {
      this.filteredOrigins = []
      return
    } else {
      this.filteredOrigins = this.locationOrigins.filter(loc => loc.product_name.toLowerCase().includes(query.toLowerCase()))
    }
  }


  printDetail(detail: any, stri: string) {
    console.log(detail, stri)
  }

  loadLocations() {
    this.warehouseService.getLocationsInfo().subscribe({
      next: (locations) => {
        this.locationOrigins = locations;
      },
      error: (error) => {
        console.error('Error al obtener las ubicaciones', error);
      }
    });

  }

  loadMovementDetails() {
    if (this.movementEdit && this.movementEdit.movement_details) {
      for (const detail of this.movementEdit.movement_details) {
        this.addDetail(detail);
      }
    }


  }

  addDetail(detail: IDetailMovementDto) {
    console.log(detail)
    const detalleGroup = this.fb.group({
      origen: [detail.location_origin || ''],
      destino: [detail.location_destination || ''],
      quantity: [detail.quantity || 1, [Validators.required, Validators.min(1)]],
      product: [detail.product || '']
    });
    this.detallesArray.push(detalleGroup);
  }

  initFormDetail(origen: LocationInfoDto | null, destino: LocationInfoDto | null, quantity: number): FormGroup {
    const group = this.fb.group({
      origen: [origen || '', [Validators.required]],
      destino: [destino || '', [Validators.required]],
      quantity: [quantity || 1, [Validators.required, Validators.min(1)]]

    })
    group.setValidators([destinationValidator(), quantityValidator(), this.duplicateMovementValidator(this.detallesArray)]);
    return group;
  }

  insertDetail(detailForm: FormGroup) {
    const q = detailForm.get('quantity')?.value;

    const detail: IDetailMovementDto = {
      location_origin: {
        id: this.selectedOriginInfo?.location_id ?? 0,
        zone: this.selectedOriginInfo?.location.zone ?? '',
        section: this.selectedOriginInfo?.location.section ?? '',
        space: this.selectedOriginInfo?.location.space ?? ''
      },
      location_destination: {
        id: this.selectedDestinityInfo?.location_id ?? 0,
        zone: this.selectedDestinityInfo?.location.zone ?? '',
        section: this.selectedDestinityInfo?.location.section ?? '',
        space: this.selectedDestinityInfo?.location.space ?? ''
      },
      quantity: q,
      product: this.selectedOriginInfo?.product_name ?? ''
    }
    console.log(this.selectedOriginInfo)
    console.log(this.selectedDestinityInfo)
    console.log(q)

    this.addDetail(detail)

    this.resetDetailForm()
  }

  resetDetailForm(): void {
    // Establece los valores iniciales para el formulario detailForm
    this.detailForm.setValue({
      origen: null,
      destino: null,
      quantity: 1
    });
    this.detallesArray.controls.forEach(ctrl => {

      ctrl.updateValueAndValidity();
    })

    this.selectedOriginInfo = null;
    this.selectedDestinityInfo = null;
  }

  seleccionarOrigen(origen: LocationInfoDto, indice: number) {
    this.selectedOriginInfo = origen
    const detalle = this.detallesArray.at(indice);

    this.detailForm.get('origen')?.setValue(origen);
    // this.detailForm.get('product')?.setValue(this.locationOrigins[indice].product_name);
    this.locationDestinis = this.locationOrigins.filter(loc => {
      return loc.product_name == origen.product_name && loc.location_id != origen.location_id;
    })
    console.log(this.locationDestinis)
  }

  seleccionarDestino(destino: LocationInfoDto, indice: number) {
    this.selectedDestinityInfo = destino;
    const detalle = this.detallesArray.at(indice);

    this.detailForm.get('destino')?.setValue(destino);
    console.log(this.detailForm.get('destino')?.value)
  }

  removeDetail(i: number) {
    (this.detallesArray.removeAt(i))

  }

  cerrar() {
    this.router.navigate(['inventory/search-movements']);
  }

  submitForm() {
    Swal.fire({
      title: '¿Confirma la edición del movimiento?',
      showDenyButton: true,
      confirmButtonText: 'Modificar',
      denyButtonText: `No modificar`,
    }).then((result) => {
      if (result.isConfirmed) {
        let dets = this.formMov.value.details.map((det: any) => {
          let d: NewDetailMovementDto = {
            location_origin_id: det.origen.id,
            location_destination_id: det.destino.id,
            quantity: det.quantity,
            product_id: this.getProductIdByLocationId(det.origen.id)
          }
          return d;
        })
        let username: User | null = JSON.parse(localStorage.getItem('role') ?? '')
        let mov: ReqNewMovementDto = {
          remarks: this.formMov.value.remarks,
          operator_name: username?.username || 'Default',
          movement_type: null,
          is_internal: true,
          movement_details: dets
        }
        this.movementService.updateMovement(mov,this.movementEdit?.id??1).subscribe({
          next: (result) => {
            if (result) {
              Swal.fire(
                '¡Actualizado!',
                'El movimiento ha sido modificado con éxito.',
                'success'
              );
            } else {
              Swal.fire(
                'Error',
                'No se pudo actualizar el movimiento.',
                'error'
              );
            }
          },
          error: (error: any) => {
            Swal.fire(
              'Error',
              'Ocurrió un error al actualizar el movimiento: ' + error.message,
              'error'
            );
          }
        });
        this.router.navigate(['inventory/search-movements']);


      } else if (result.isDenied) {
        Swal.fire('Los cambios no fueron realizados', '', 'info');
        this.router.navigate(['inventory/search-movements']);


      }
    });




  }

  getProductIdByLocationId(locId: number): number {
    for (let loc of this.locationOrigins) {
      if (loc.location_id === locId) {
        return loc.product_id ?? 1;
      }
    }
    return 1;
  }

  getAviabilityQByLocation(id: number): number {
    const location = this.locationOrigins.find(loc => loc.location_id == id)
    if (location) {

      return location.max_capacity - location?.quantity
    }
    return 0
  }

  duplicateMovementValidator(movementDetailsArray: FormArray): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const origin = control.get('origen')?.value;
      const destiny = control.get('detino')?.value;
      console.log(origin, destiny)
      // Utilizar 'some' para comprobar si algún detalle ya tiene el mismo origen o destino
      const duplicate = movementDetailsArray.controls.some(ctrl => {
        const ctrlOrigin = ctrl.get('origen')?.value;
        const ctrlDestiny = ctrl.get('destino')?.value;
        console.log(ctrlOrigin, ctrlDestiny)
        return (ctrlOrigin === origin || ctrlOrigin === destiny) ||
          (ctrlDestiny === origin || ctrlDestiny === destiny);
      });
      console.log(duplicate)
      // Si se encuentra un duplicado, retornar el objeto de error, de lo contrario retornar null
      return duplicate ? { 'duplicateMovement': true } : null;
    };
  }

}