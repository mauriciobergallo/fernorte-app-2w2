import { Component, OnInit, TemplateRef, ViewChild, OnChanges, SimpleChanges } from '@angular/core';
import { RoleService } from '../../services/role.service';
import { Role } from '../../models/role';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CreateRolComponent } from '../create-rol/create-rol.component';
import { NewRole } from '../../models/new-role';


@Component({
  selector: 'fn-role-list',
  templateUrl: './role-list.component.html',
  styleUrls: ['./role-list.component.css']
})
export class RoleListComponent implements OnInit {

  @ViewChild('roleForm') newRoleModal: TemplateRef<any> | undefined;

  createRole: NewRole = {
    id_role: 0,
    name: "",
    area: "",
  };

  isCreateRoleModalOpen = false;
  roles: Role[] = [];
  filteredRoles: Role[] = [];
  pagedRoles: Role[] = [];
  areas: string[] = [];
  selectedArea: string = '';
  showOptions: boolean = false;

  searchForm: FormGroup = this.formBuilder.group({
    selectedArea: ['']
  });

  currentPage: number = 1;
  itemsPerPage: number = 10;
  contentRole: any;

  constructor(private roleService: RoleService,
    private formBuilder: FormBuilder,
    private modalService: NgbModal) { }




  ngOnInit() {
    this.searchForm.get('selectedArea')?.valueChanges.subscribe(() => {
      this.filterRoles();
    });

    this.getRoles();
    this.roleService.getRolesUpdatedObservable().subscribe(() => {
      this.getRoles();
    });

  }

  getRoles() {
    this.roleService.getAllRoles().subscribe(data => {
      this.roles = data;
      this.filteredRoles = data;
      this.areas = Array.from(new Set(data.map(role => role.area)));
      this.pageChanged(1);
    });
  }

  filterRoles() {
    const selectedArea = this.searchForm.get('selectedArea')?.value;

    if (selectedArea === '') {
      this.filteredRoles = this.roles;
    } else {
      this.filteredRoles = this.roles.filter(role => role.area === selectedArea);
    }

    this.pageChanged(1);
  }

  get selectedAreaControl() {
    return this.searchForm.get('selectedArea');
  }

  filterByArea(area: string) {
    this.searchForm.patchValue({ selectedArea: area });
    this.filterRoles();
  }

  get totalPages(): number {
    return Math.ceil(this.filteredRoles.length / this.itemsPerPage);
  }

  get pages(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  pageChanged(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      const startIndex = (page - 1) * this.itemsPerPage;
      this.currentPage = page;
      this.pagedRoles = this.filteredRoles.slice(startIndex, startIndex + this.itemsPerPage);
    }
  }

  openNewRoleModal() {
    const modalRef = this.modalService.open(CreateRolComponent, { ariaLabelledBy: 'modal-basic-title' ,backdrop: 'static'});
    modalRef.componentInstance.createRole = this.createRole;

    modalRef.result.then(
      (newRole: Role) => {
        if (newRole) {
          this.roles.push(newRole);
          console.log('Roles después de agregar:', this.roles);
          this.filteredRoles = [...this.roles];
          this.pageChanged(this.currentPage);
          this.isCreateRoleModalOpen = false;
        }
      },
      (reason) => {
      }
    );
  }
}