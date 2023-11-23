import { Component} from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Role } from '../../models/role';
import { NgForm, FormsModule } from '@angular/forms';
import { RoleService } from '../../services/role.service';

@Component({
  selector: 'fn-create-rol',
  templateUrl: './create-rol.component.html',
  styleUrls: ['./create-rol.component.css']
})
export class CreateRolComponent {
  role: Role = {
    name: "",
    area: 1
  }

  roleForm!: NgForm;

  constructor(private modalService: NgbModal, private roleService: RoleService) {}

  open(content: any) {
		this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
			(result) => {

				console.log("CONTENT", content);
				console.log("RESULT", result);
				console.log("ROLE FORM",this.roleService);


				this.roleService.createRole(this.role);
				this.roleService.clearFields(this.role);
				

			},
			(reason) => {

			},
		);
	}
}
