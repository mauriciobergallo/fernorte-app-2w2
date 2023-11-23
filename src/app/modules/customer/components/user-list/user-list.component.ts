import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';
import { ModifyUserRolComponent } from '../modify-user-rol/modify-user-rol.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserFormComponent } from '../user-form/user-form.component';
import Swal from 'sweetalert2';
import { jsPDF } from "jspdf";
import 'jspdf-autotable';
import { InfoUserComponent } from '../info-user/info-user.component';

@Component({
  selector: 'fn-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent  implements OnInit {

  @ViewChild('userRolForm') updateUserModal: TemplateRef<any> | undefined;
  @ViewChild('newUserForm') newUserModal: TemplateRef<any> | undefined;

  userList: User[] = [];
  localUserList: User[] = [];

  currentPage: number = 1;
  itemsPerPage: number = 15;
  contentEmployee: any;
  pagedUser: User[] = [];

  constructor(private userService: UserService, private modalService: NgbModal) {}

  ngOnInit(): void {
    this.loadUser();
    this.userService.getUserUpdatedObservable().subscribe(() => {
      this.loadUser();
    });
  }


  userListMock: User[] = [
    {
      id_user: 1,
      first_login: true,
      password_reset: false,
      document_number: '123456789',
      email: 'usuario1@example.com',
      username: 'usuario1',
      user_password: 'contrasena1',
      roles: [],
      is_active: true,
    },
    {
      first_login: false,
      password_reset: true,
      document_number: '987654321',
      email: 'usuario2@example.com',
      username: 'usuario2',
      user_password: 'contrasena2',
      roles: [],
      is_active: false,
    },
    // Agrega más usuarios según sea necesario
  ];


  downloadPDF() {
    let data = this.userListMock //REMPLAZAR ACÁ POR this.userList
    const pdf = new jsPDF() as any;
  
    let containsCompany = false;
    let containsPerson = false;
    let headers = [""];
    let dataForPDF: any
    

  
  
  
  
    headers = ["Nombre de usuario", "Documento", "Email" ];
  
  dataForPDF = data.map((item) => {
  
  
    return [item.username, item.document_number, item.email, ]; // Devuelve un array con los valores deseados
  });
  
  console.log("dataforpdf", dataForPDF);
  data = dataForPDF;
  
  
  this.generatePdf(data, headers, "Listado de usuarios");
  
  }

  onFiltrarDocumento(event: any) {
    this.userList = this.localUserList;
    let filtro = event.target.value;    
    let filtroDocumento: User[] = this.buscarDocumento(filtro);

    let listaFiltrada: User[] = filtroDocumento      
      .filter((item, index, array) => array.indexOf(item) === index);
    this.userList = listaFiltrada;    
    this.pageChanged(1)
  }

  buscarDocumento(palabraIncompleta: string): User[] {
    palabraIncompleta = palabraIncompleta.toLowerCase(); // Convierte a minúsculas para hacer la búsqueda no sensible a mayúsculas

    return this.userList.filter(palabra => {
      const palabraEnMinusculas = palabra.document_number.toLowerCase();
      return palabraEnMinusculas.startsWith(palabraIncompleta);
    });
  }
  
  
    generatePdf(data: any[], columns: any[], title: string): void {
      const doc = new jsPDF() as any;
  
      // Configurar título
      doc.text(title, 10, 10);
  
      
  
      // Configurar la tabla
      doc.autoTable({
        startY: 20,
        head: [columns],
        body: data,
        autoSize: true,
        theme: 'grid', // Otra opción de tema que puede ser útil
        columnStyles: { 0: { cellWidth: 'auto' }, 1: { cellWidth: 'auto' } }, // Ajusta según tus necesidades
        styles: { overflow: 'linebreak' }, // Permite saltos de línea
        bodyStyles: { minCellHeight: 10 },
        cellStyles: { text: { fontSize: 7, fontStyle: 'normal' } },
      });
  
      // Guardar o mostrar el PDF
      doc.save('table.pdf');
    }
  


    downloadCSV() {
      let data = this.userList;
    
      let socialReason:string | undefined;
    
      let csvContent = 'Nombre de usuario;Documento;Email\n';
        
    
      data.forEach((item) => {
    
    
        // const formattedDate = `${item.birth_date.getDate()}/${item.birth_date.getMonth() + 1}/${item.birth_date.getFullYear()}`;
    
        csvContent += `"${item.username}";"${item.document_number}";"${item.email}"\n`;
      });
    
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.setAttribute('href', url);
      link.setAttribute('download', 'ReporteUsuarios.csv');
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }






    openModifyUserRolesForm(readonly: boolean, user: User) {
      const modalRef = this.modalService.open(InfoUserComponent, { size: 'lg' });
      modalRef.componentInstance.userToUpdate = user;
      modalRef.componentInstance.readonly = readonly;
    }


  loadUser() {
    this.userService.getAllUser().subscribe((data: User[]) => {
      this.userList = data;
      this.localUserList = data;
      this.pageChanged(1);
    });
    console.log(this.userList);
  }

  onOptionClick(selectedOption: string) {
    // Acción a realizar cuando se selecciona una opción
    console.log('Opción seleccionada:', selectedOption);
  }

  onActive(user: User) {
    this.userService.active(user).subscribe(
      (response) => {
        this.showInfoActivedResult();
        this.loadUser()
      },
      (error) => (
        this.showErrorInServer()
      )
    )
  }

  onDelete(user: User) {
    this.userService.delete(user).subscribe(
      (response) => {
        this.showInfoDesactivedResult();
        this.loadUser()
      },
      (error) => (
        this.showErrorInServer()
      )
    )
  }

  onUpdate(user: User){
    const modalRef = this.modalService.open(ModifyUserRolComponent, { ariaLabelledBy: 'modal-basic-title', backdrop: 'static' });
    modalRef.componentInstance.userToUpdate = user;

    modalRef.componentInstance.updateClicked.subscribe(() => {
      // Abrir el modal del formulario de actualización
      this.modalService.open(this.updateUserModal); 
      console.log('se abrio el modal del usuario y sus roles');
    });
  }

  openNewUserModal(){
    const modalRef = this.modalService.open(UserFormComponent, { ariaLabelledBy: 'modal-basic-title', backdrop: 'static' });
     
    modalRef.componentInstance.updateClicked.subscribe(() => {
      this.modalService.open(this.newUserModal);
      console.log('se abrio el modal del usuario');

    });
  }

  showConfirmationReactivate(user: User) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: '¿Quieres reactivar el usuario?',
      icon: 'question',
      confirmButtonText: 'Sí, reactivar',
      showCancelButton: true,
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.onActive(user);
      }
    });
  }

  showConfirmationDelete(user: User) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: '¿Quieres eliminar el usuario?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.onDelete(user);
      }
    });
  }

  showInfoActivedResult() {
    Swal.fire({
      title: 'Resultado',
      text: 'Se dio de alta el usuario',
      icon: 'success',
      showConfirmButton: true,
      confirmButtonText: 'ok',
    });
  }

  showInfoDesactivedResult() {
    Swal.fire({
      title: 'Resultado',
      text: 'Se dio de baja el usuario',
      icon: 'success',
      showConfirmButton: true,
      confirmButtonText: 'ok',
    });
  }

  showErrorInServer() {
    Swal.fire({
      title: '¡Error!',
      text: 'Servicio no disponible',
      icon: 'error',
    });
  }

  get totalPages(): number {
    return Math.ceil(this.userList.length / this.itemsPerPage);
  }

  pageChanged(page: number) {
    if ((page >= 1 && page <= this.totalPages) || page == 1) {
      const startIndex = (page - 1) * this.itemsPerPage;
      this.currentPage = page;
      this.pagedUser = this.userList.slice(startIndex, startIndex + this.itemsPerPage);
    }
  }

  get pages(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }
}