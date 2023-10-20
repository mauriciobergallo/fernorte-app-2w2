import {ILocationDto} from "./ILocationDto";

export interface ILocationInfoProduct {
    categoryName: string;
    productName: string;
    quantity: number;
    measureUnit: string;
    maxCapacity: number;
    location: ILocationDto;

}