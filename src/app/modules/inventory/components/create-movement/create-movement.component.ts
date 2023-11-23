import { Component, OnInit, OnDestroy ,ViewChild, ElementRef, AfterViewInit, TemplateRef, inject, EventEmitter, Output} from '@angular/core';
import { BehaviorSubject, Observable, Subject, combineLatest } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, startWith, switchAll, switchMap, takeUntil } from 'rxjs/operators';
import { LocationInfoDto } from '../../models/location-info.interface';
import { WarehouseService } from '../../services/warehouse-service/warehouse.service';
import { MovementType } from '../../models/IMovementTypeEnum';
import { AbstractControl, FormArray, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { ValidationError } from 'json-schema';
import { MovementsService, NewDetailMovementDto, ReqNewMovementDto } from '../../services/movements-service/movements.service';
import Swal from 'sweetalert2';
import { User } from 'src/app/modules/customer/models/user';
import { ActivatedRoute, Router } from '@angular/router';


export function destinationValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const origin = control.get('origin')?.value as LocationInfoDto;
    const destiny = control.get('destiny')?.value as LocationInfoDto;
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
    const origin = control.get('origin')?.value as LocationInfoDto;
  const quantity = control.get('quantity')?.value as number;
    

  return origin && origin.quantity >= quantity ? null : { 'quantityInsufficient': true };
  };
}
@Component({
  selector: 'fn-create-movement',
  templateUrl: './create-movement.component.html',
  styleUrls: ['./create-movement.component.css']
})
export class CreateMovementComponent implements OnInit, OnDestroy  {

  @Output() onSubmitMov = new EventEmitter<void>();
  private searchQuery = new BehaviorSubject<string>('..');
  locationsInfo$!: Observable<LocationInfoDto[]>;
  private selectedInfoSubject = new BehaviorSubject<LocationInfoDto | null>(null);
  filteredLocationsInfo$!: Observable<LocationInfoDto[]>;
  filteredLocationsInfoDestinity$!: Observable<LocationInfoDto[]>;
  private destroy$ = new Subject<void>(); 
  
  selectedOriginInfo: LocationInfoDto | null = null;
  selectedDestinityInfo: LocationInfoDto | null = null;

  movementForm: FormGroup = new FormGroup({});
  detailForm: FormGroup = new FormGroup({});
  MovementType = MovementType

  serviceMovement = inject(MovementsService);
  isLoadingS:boolean = false;
  showRemark: boolean = false;

  get isInternalControl() {
    return this.movementForm.get('isInternal');
  }

  get remarksControl() {
    return this.movementForm.get('remarks')
  }

  get movementTypeControl() {
    return this.movementForm.get('movementType');
  }

  get movementDetailsArray(): FormArray {
    return this.movementForm.get('movementDetailsArray') as FormArray;
  }
  constructor(private service: WarehouseService, private fb: FormBuilder, private router: Router, private route: ActivatedRoute) {
    this.initFormMovement();
    this.locationsInfo$ = this.service.getLocationsInfo();
  }
  

  ngOnInit(): void {

   // Crear un Observable filtrado que combine los datos de la API con la búsqueda
   this.filteredLocationsInfo$ = combineLatest([
    this.locationsInfo$,
    this.searchQuery.pipe(debounceTime(300), distinctUntilChanged(), map(query => query.toLowerCase()))
  ]).pipe(
    map(([locations, query]) => locations.filter(location => location.product_name.toLowerCase().includes(query))),
    takeUntil(this.destroy$)
  );



  // Filtrar locationsInfo$ en base a la selección actual (selectedInfo)
  this.filteredLocationsInfoDestinity$ = combineLatest([
    this.locationsInfo$,
    this.selectedInfoSubject.asObservable()
  ]).pipe(
    map(([locations, selectedInfo]) => 
      locations.filter(location => 
        location.product_name === selectedInfo?.product_name && location.location_id !== selectedInfo?.location_id
      )
    ),
    takeUntil(this.destroy$)
  );
  }

  ngOnDestroy(): void {
    this.destroy$.next(); // Emite un valor para desencadenar la desuscripción
    this.destroy$.complete(); // Cierra el Subject
  }



  prepareMovement(): ReqNewMovementDto{
    let dets = this.movementForm.value.movementDetailsArray.map((det:any)=> {

      let d: NewDetailMovementDto = {
        location_origin_id : det.origin.location_id,
        location_destination_id : det.destiny.location_id,
        quantity : det.quantity,
        product_id : det.origin.product_id
      }
      return d;
    })
    let username: User|null = JSON.parse(localStorage.getItem('role') ?? '' )
    console.log(username)
    let mov : ReqNewMovementDto = {
      remarks: this.remarksControl?.value,
      operator_name :username?.username || 'Default',
      movement_type: null,
      is_internal : true,
      movement_details : dets
    }
    return mov;
  }


  submitForm() {
    this.isLoadingS = true;
      // Aquí manejarías la lógica para enviar los datos a tu API
    let mov = this.prepareMovement()
    console.log('mov prepr',mov)
    this.serviceMovement.newMovement(mov).subscribe({
      next: (result) => {
    this.isLoadingS = false;
        if (result) {
          this.onSubmitMov.emit()
          Swal.fire(
            '¡Creado!',
            'El movimiento ha sido creado con éxito.',
            'success'
          );
        } else {
         // alert('error')

          Swal.fire(
            'Error',
            'No se pudo crear el movimiento.',
            'error'
          );
        }
      },
      error: (error: any) => {
       // alert('error')

         Swal.fire(
           'Error',
           'Ocurrió un error al crear el movimiento: ' + error.message,
           'error'
         );
      }
    });    
    this.isLoadingS = false;
    this.router.navigate(['inventory/search-movements']);


  }
  setUpValueChanges(){
      // Habilitar o deshabilitar el control de movementType basado en la selección de isInternal
      this.movementForm.get('motivo')?.valueChanges.subscribe((value) =>{
        if (value === 'Otros') {
          this.showRemark = true;
          this.movementForm.get('remarks')?.setValue('')
        } else {
          this.showRemark = false;
          this.movementForm.get('remarks')?.setValue(value)
        }
      } )
      this.detailForm.get('origin')?.valueChanges.subscribe((value) => {

      })
      
  }

  initFormMovement() {
    this.movementForm = this.fb.group({
      motivo: ['', [Validators.required]],
      remarks: ['', [Validators.required, Validators.minLength(10)]],
      movementDetailsArray: this.fb.array([],[Validators.required])
    })

    this.detailForm = this.initFormDetail(null,null,1)
    this.setUpValueChanges()

  }


  initFormDetail(origin: LocationInfoDto | null, destiny: LocationInfoDto | null, quantity: number): FormGroup { 
    const group = this.fb.group({
      origin: [origin, Validators.required],
      destiny: [destiny, Validators.required],
      quantity: [quantity, [Validators.required, Validators.min(1)]],
      nombreDelProducto:['']
    });
    
    group.setValidators([destinationValidator(), quantityValidator(),this.duplicateMovementValidator(this.movementDetailsArray)]);
    return group;
  };

addDetail(detailForm: FormGroup){
  const origin = detailForm.get('origin')?.value as LocationInfoDto;
  const destiny = detailForm.get('destiny')?.value as LocationInfoDto;
  const quantity = detailForm.get('quantity')?.value as number;
  this.movementDetailsArray.push(this.initFormDetail(origin,destiny,quantity))

    // Imprimir los valores de los controles en la consola
    this.movementDetailsArray.controls.forEach(control => {
      console.log(control.value);
      
    });

  this.resetDetailForm()
}

 removeDetail(i: number){
  (this.movementDetailsArray.removeAt(i))

 }


  onSearch(event: Event): void {
    // Actualizar la cadena de búsqueda cada vez que cambie el input
    const query = (event.target as HTMLInputElement).value;
    if(query.length <= 3){
    this.searchQuery.next(".."); // Emitir el nuevo valor de búsqueda

    } else {

      this.searchQuery.next(query); // Emitir el nuevo valor de búsqueda
    }
  }
  get formErrors() {
    return JSON.stringify(this.detailForm.errors, null, 2);
  }

  onProductSelect(product: LocationInfoDto): void {
    // Establecer el producto seleccionado cuando se hace clic en una fila
    this.selectedOriginInfo = product;
    this.selectedInfoSubject.next(product); 
    this.detailForm.patchValue({'origin': product});

  }

  onDestinySelect(location : LocationInfoDto){
    this.selectedDestinityInfo = location;
    this.detailForm.patchValue({'destiny': location});
  }

  resetForms(){
    this.movementForm.setValue({

      remarks: '',
      movementDetailsArray: []
    })
    this.resetDetailForm()
  }

  resetDetailForm(): void {
    // Establece los valores iniciales para el formulario detailForm
    this.detailForm.setValue({
      origin: null,
      destiny: null,
      quantity: 1,
      nombreDelProducto: ''
    });
    this.movementDetailsArray.controls.forEach(ctrl => {
      
      ctrl.updateValueAndValidity();
    })

    this.selectedOriginInfo = null;
    this.selectedDestinityInfo = null;
    this.searchQuery.next('..')
  }


  duplicateMovementValidator(movementDetailsArray: FormArray): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      console.log(movementDetailsArray)
      const origin = control.get('origin')?.value;
      const destiny = control.get('destiny')?.value;
      console.log(origin)
      console.log(destiny)
        // Utilizar 'some' para comprobar si algún detalle ya tiene el mismo origen o destino
    const duplicate = movementDetailsArray.controls.some(ctrl => {
      const ctrlOrigin = ctrl.get('origin')?.value;
      const ctrlDestiny = ctrl.get('destiny')?.value;
      console.log(ctrlOrigin)
      console.log(ctrlDestiny)

      return (ctrlOrigin === origin || ctrlOrigin === destiny) || 
             (ctrlDestiny === origin || ctrlDestiny === destiny);
    });
    // Si se encuentra un duplicado, retornar el objeto de error, de lo contrario retornar null
    return duplicate ? { 'duplicateMovement': true } : null;
    };
  }

}
