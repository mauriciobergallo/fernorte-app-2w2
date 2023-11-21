import { Injectable } from '@angular/core';
import { Role } from '../models/role';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  constructor() { }

  //Post
  createRole(role : Role){
    console.log("Role", role);
                                    //aca va el post de rol
  }
  
  clearFields(role: any){
    for (const prop in role) {
      if (role.hasOwnProperty(prop)) {
        delete role[prop];
      }
    }
  
  }


}