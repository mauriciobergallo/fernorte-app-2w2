
import {MovementType} from "./IMovementTypeEnum";
import {IDetailMovementDto} from "./IDetailMovementDto";
import { DatePipe } from "@angular/common";


export class IMovementDto {

    operator: String;
    movement_type: MovementType | null;
    is_internal: Boolean;
    movement_details: Array<IDetailMovementDto>;
    date: string 
    remarks: string

    constructor(data: any) {
        this.operator = data.operator;
        this.remarks = data.remarks; // Mapeando 'remarks' a 'descripcion'
        this.movement_type = data.movement_type;
        this.is_internal = data.is_internal;
        this.date = data.created_at;
        this.movement_details = data.movement_details;
    }
}






  