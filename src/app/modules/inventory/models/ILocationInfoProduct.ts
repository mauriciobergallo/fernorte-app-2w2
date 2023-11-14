import {ILocationDto} from "./ILocationDto";

export interface ILocationInfoProduct {
    code: number;
    categoryName: string;
    productName: string;
    capacityRemaining?: number;
    measure_unit: string;
    max_capacity?: number;
    location: ILocationDto;
    quantity?: number;
}