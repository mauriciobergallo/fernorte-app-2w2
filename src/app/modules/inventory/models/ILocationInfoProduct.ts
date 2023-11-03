import {ILocationDto} from "./ILocationDto";

export interface ILocationInfoProduct {
    code: number;
    category_name: string;
    product_name: string;
    capacityRemaining?: number;
    measure_unit: string;
    max_capacity?: number;
    location: ILocationDto;
    quantity?: number;
}