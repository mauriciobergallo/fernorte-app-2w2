import { Component} from '@angular/core';
import { RoleService } from '../../services/role.service';
import { Role } from '../../models/role';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';



@Component({
  selector: 'fn-role-list',
  templateUrl: './role-list.component.html',
  styleUrls: ['./role-list.component.css']
})
export class RoleListComponent {

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

  constructor(private roleService: RoleService, private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.searchForm.get('selectedArea')?.valueChanges.subscribe(() => {
      this.filterRoles();
    });

    this.getRoles();
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
}