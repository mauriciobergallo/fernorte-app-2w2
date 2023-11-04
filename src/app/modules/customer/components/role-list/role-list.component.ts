import { Component } from '@angular/core';
import { RoleService } from '../../services/role.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CreateRolComponent } from '../create-rol/create-rol.component';

@Component({
  selector: 'fn-role-list',
  templateUrl: './role-list.component.html',
  styleUrls: ['./role-list.component.css']
})
export class RoleListComponent {
  show:boolean=false;
  constructor(private modalService: NgbModal){}
  openAdd(){
    const modalRef = this.modalService.open(CreateRolComponent);
  }
    
}
