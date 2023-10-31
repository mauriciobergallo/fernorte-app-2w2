import { Role } from "./role";

export interface UserResponseDTO{
    user_name:string,  
    document_number:string,  
    roles:Role[]
}

