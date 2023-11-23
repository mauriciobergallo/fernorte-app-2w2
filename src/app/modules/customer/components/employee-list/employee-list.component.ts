import { Component, OnChanges, OnInit, SimpleChanges, TemplateRef, ViewChild } from '@angular/core';

import { EmployeeService } from '../../services/employee.service';
import { CaseConversionPipe } from '../../pipes/case-conversion.pipe';
import { EmployeeResponseDTO } from '../../models/employeeResponseDTO';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UpdateEmployeeComponent } from '../update-employee/update-employee.component';
import Swal from 'sweetalert2';
import { EmployeeRegistrationComponent } from '../employee-registration/employee-registration.component';


@Component({
  selector: 'fn-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {

  @ViewChild('employeeForm') updateEmployeeModal: TemplateRef<any> | undefined;
  @ViewChild('newEmployeeForm') newEmployeeModal: TemplateRef<any> | undefined;

  employeeList: EmployeeResponseDTO[] = [];
  localEmployeeList: EmployeeResponseDTO[] = [];
  selectedEmployeeId: number | null = null;
  filtroInput: string = '';

  showInactivos: boolean = true;

  isCreateEmployeeModalOpen = false;



  constructor(private employeeService: EmployeeService, private conversion: CaseConversionPipe, private modalService: NgbModal) { }

  newEmployee: EmployeeResponseDTO =
    {
      idEmployee: 0,
      firstName: '',
      lastName: '',
      birthDate: '',
      documentType: 1, // Puedes cambiar esto según tus necesidades
      documentNumber: '',
      address: '',
      phoneNumber: '',
      personalEmail: '',
      isActive: true,
      createdAt: '01-01-2000'
    }




  ngOnInit(): void {
    this.onLoad()

    this.employeeService.getEmployeeUpdatedObservable().subscribe(() => {
      this.onLoad();
    });
  }

  onLoad() {
    this.employeeService.getEmployees().subscribe(
      (response) => {
        let toCamel: EmployeeResponseDTO[] = this.conversion.toCamelCase(response);
        this.employeeList = toCamel;
        this.localEmployeeList = toCamel;
      },
      (error) => {
        console.log(error)
      }
    );
  }

  openUpdateEmployeeModal(employee: EmployeeResponseDTO) {
    this.selectedEmployeeId = employee.idEmployee;
    const modalRef = this.modalService.open(UpdateEmployeeComponent, { ariaLabelledBy: 'modal-basic-title', backdrop: 'static' });
    modalRef.componentInstance.employeeToUpdate = employee; // Pasar el ID del empleado al componente de actualización

    modalRef.componentInstance.updateClicked.subscribe(() => {
      // Abrir el modal del formulario de actualización
      this.modalService.open(this.updateEmployeeModal);
      console.log('se abrio el modal del empleado');

    });
  }

  onClickInfo(employee: EmployeeResponseDTO) {

    const modalRef = this.modalService.open(UpdateEmployeeComponent, { ariaLabelledBy: 'modal-basic-title', backdrop: 'static' });
    modalRef.componentInstance.employeeToUpdate = employee; // Pasar el ID del empleado al componente de actualización
    modalRef.componentInstance.onlyForRead = true;

  }

  onDelete(employee: EmployeeResponseDTO) {

    this.employeeService.delete(employee).subscribe(
      (response) => {
        this.showInfoDesactivedResult();
        this.onLoad()

      },
      (error) => (
        console.log(error)

      )
    )
  }

  onActive(employee: EmployeeResponseDTO) {

    this.employeeService.active(employee).subscribe(
      (response) => {
        this.showInfoActivedResult();
        this.onLoad()
      },
      (error) => (
        console.log(error)
      )
    )
  }



  showInfoActivedResult() {
    Swal.fire({
      title: 'Resultado',
      text: 'Se dio de alta el empleado',
      icon: 'success',
      showConfirmButton: true,
      confirmButtonText: 'ok',
    });
  }


  showInfoDesactivedResult() {
    Swal.fire({
      title: 'Resultado',
      text: 'Se dio de baja el empleado',
      icon: 'success',
      showConfirmButton: true,
      confirmButtonText: 'ok',
    });
  }

  showConfirmationReactivate(employee: EmployeeResponseDTO) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: '¿Quieres reactivar el empleado?',
      icon: 'question',
      confirmButtonText: 'Sí, reactivar',
      showCancelButton: true,
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.onActive(employee);
        this.limpiarCampos()
      }
    });
  }

  showConfirmationDelete(employee: EmployeeResponseDTO) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: '¿Quieres eliminar el empleado?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.onDelete(employee);
        this.limpiarCampos()
      }
    });
  }

  onFiltrarInput(event: any) {
    this.onFiltrarNombre(event);
    this.employeeList = this.buscarActivo(this.showInactivos)
  }

  onFiltrarNombre(event: any) {
    this.employeeList = this.localEmployeeList;
    let filtro = this.filtroInput;
    let filtroNombre: EmployeeResponseDTO[] = this.buscarNombre(filtro);
    let filtroApellido: EmployeeResponseDTO[] = this.buscarApellido(filtro);
    let filtroDocumento: EmployeeResponseDTO[] = this.buscarDocumento(filtro);

    let listaFiltrada: EmployeeResponseDTO[] = filtroNombre
      .concat(filtroApellido, filtroDocumento)
      .filter((item, index, array) => array.indexOf(item) === index);
    this.employeeList = listaFiltrada;
    
  }

  buscarNombre(palabraIncompleta: string): EmployeeResponseDTO[] {
    palabraIncompleta = palabraIncompleta.toLowerCase(); // Convierte a minúsculas para hacer la búsqueda no sensible a mayúsculas

    return this.employeeList.filter(palabra => {
      const palabraEnMinusculas = palabra.firstName.toLowerCase();
      return palabraEnMinusculas.startsWith(palabraIncompleta);
    });
  }

  buscarApellido(palabraIncompleta: string): EmployeeResponseDTO[] {
    palabraIncompleta = palabraIncompleta.toLowerCase(); // Convierte a minúsculas para hacer la búsqueda no sensible a mayúsculas

    return this.employeeList.filter(palabra => {
      const palabraEnMinusculas = palabra.lastName.toLowerCase();
      return palabraEnMinusculas.startsWith(palabraIncompleta);
    });
  }

  buscarDocumento(palabraIncompleta: string): EmployeeResponseDTO[] {
    palabraIncompleta = palabraIncompleta.toLowerCase(); // Convierte a minúsculas para hacer la búsqueda no sensible a mayúsculas

    return this.employeeList.filter(palabra => {
      const palabraEnMinusculas = palabra.documentNumber.toLowerCase();
      return palabraEnMinusculas.startsWith(palabraIncompleta);
    });
  }

  filtrarActivo() {
    this.employeeList = this.localEmployeeList;
    if(this.filtroInput != ''){
      this.onFiltrarNombre(this.filtroInput)
    }
    this.employeeList = this.buscarActivo(!this.showInactivos)
  }

  buscarActivo(showInactivos: boolean) {
    debugger
    if (showInactivos) {
      return this.employeeList;
    }
    return this.employeeList.filter(empleado => empleado.isActive);
  }

  openNewEmployeeModal() {
   
    const modalRef = this.modalService.open(EmployeeRegistrationComponent, { ariaLabelledBy: 'modal-basic-title', backdrop: 'static' });
     
    modalRef.componentInstance.updateClicked.subscribe(() => {
      // Abrir el modal del formulario de actualización
      this.modalService.open(this.newEmployeeModal);
      console.log('se abrio el modal del empleado');

    });
  }

  limpiarCampos(){
    this.filtroInput = "";
    this.showInactivos = true;
  }


  // openNewEmployeeModal() {
  //   const modalRef = this.modalService.open(EmployeeRegistrationComponent, { ariaLabelledBy: 'modal-basic-title', backdrop: 'static' });
  //   modalRef.componentInstance.newEmployeeForm = this.newEmployee;

  //   modalRef.result.then(
  //     (newEmp: EmployeeResponseDTO) => {
  //       if (newEmp) {
  //         this.employeeList.push(newEmp);
  //         console.log('Empleados después de agregar:', this.employeeList);


  //         this.isCreateEmployeeModalOpen = false;
  //       }
  //     },
  //     (reason) => {
  //     }
  //   );
  // }

}
