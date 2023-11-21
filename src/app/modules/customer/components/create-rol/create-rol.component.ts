import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Role } from '../../models/role';
import { NgForm, FormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RoleService } from '../../services/role.service';
import Swal from 'sweetalert2';

@Component({
	selector: 'fn-create-rol',
	templateUrl: './create-rol.component.html',
	styleUrls: ['./create-rol.component.css']
})
export class CreateRolComponent implements OnInit {
	role: Role = {
		name: "",
		area: "",
	}

	roleForm!: FormGroup;
	contentRole: any;

	constructor(private modalService: NgbModal,
		private roleService: RoleService,
		private formBuilder:FormBuilder) { 
			this.roleForm = this.formBuilder.group({
				name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
				area: ['', Validators.required]
			  });
		}

	ngOnInit() {

	}

	closeForm() {
		this.modalService.dismissAll();
	  }

	  showConfirmation() {
		// Utiliza SweetAlert o el método que prefieras para mostrar una confirmación
		Swal.fire({
		  title: '¿Estás seguro?',
		  text: '¿Quieres agregar un nuevo rol?',
		  icon: 'question',
		  showCancelButton: true,
		  confirmButtonText: 'Sí, agregar',
		  cancelButtonText: 'Cancelar'
		}).then((result) => {
		  if (result.isConfirmed) {
			// Lógica para agregar el rol
			this.onSubmitForm();
		  }
		});
	  }
	
	  showCancelConfirmation() {
		Swal.fire({
		  title: '¿Está seguro que desea cancelar la operacion?',
		  text: 'Si cancela, perderá los datos ingresados.',
		  icon: 'warning',
		  showCancelButton: true,
		  confirmButtonText: 'Sí, cancelar',
		  cancelButtonText: 'No, continuar'
		}).then((result) => {
		  if (result.isConfirmed) {
			// Acción a realizar si el usuario confirma la cancelación
			this.closeForm();
		  }
		});
	  }


	open(content: any) {
		this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', backdrop: 'static' }).result.then(
			(result: Role) => {
				if (result) {
					this.modalService.dismissAll();
				}
			},
			(reason) => {
				this.modalService.dismissAll();
			}
		);
	}

	onSubmitForm() {
		if (this.roleForm.valid) {
			
		  this.roleService.createRole(this.roleForm.value).subscribe(
			(newRole: Role) => {
			  this.modalService.dismissAll(newRole);
			  console.log(this.roleForm.value);
			  Swal.fire('Éxito', 'Rol creado correctamente', 'success');
			  this.roleService.notifyRolesUpdated();
			},
			(error) => {
			  Swal.fire('Error', 'No se pudo crear el rol', 'error');
			}
		  );
		} else {
		  // El formulario no es válido, puedes mostrar un mensaje de error o hacer algo más
		  Swal.fire('Error', 'El formulario no es válido', 'error');
		  this.roleForm.markAllAsTouched();
		}
	  }
}
