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
  areas: string[] = [];
  selectedArea: string = '';
  showOptions: boolean = false;

  // Utiliza FormGroup y FormBuilder
  searchForm: FormGroup = new FormGroup({
    selectedArea: new FormControl([''])
  });

  constructor(private roleService: RoleService, private formBuilder: FormBuilder) {}

  ngOnInit() {
    // Observa los cambios en el campo de área
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
    });
  }

  onOptionClick(action: string, role: any) {
    // Implementa la lógica según la acción
  }

  toggleOptions(isHovered: boolean) {
    this.showOptions = isHovered;
  }

  filterRoles() {
    // Obtén el valor del campo selectedArea
    const selectedArea = this.searchForm.get('selectedArea')?.value;

    // Filtra por área
    if (selectedArea === '') {
      this.filteredRoles = this.roles;
    } else {
      this.filteredRoles = this.roles.filter(role => role.area === selectedArea);
    }
  }
  

  filterByArea(area: string) {
    // Actualiza el valor del formulario reactivo
    this.searchForm.patchValue({ selectedArea: area });
    this.filterRoles();
  }
}