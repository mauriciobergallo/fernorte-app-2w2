
import {MovementType} from "./IMovementTypeEnum";
import {IDetailMovementDto} from "./IDetailMovementDto";
import { DatePipe } from "@angular/common";


export interface IMovementDto {

    operator: String;
    movement_type: MovementType;
    is_internal: Boolean;
    movement_details: Array<IDetailMovementDto>;
    date: string 
}






  