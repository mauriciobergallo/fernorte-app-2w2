import { ILocationDto } from "./ILocationDto";

export interface IDetailMovementDto{
  
  location_origin: ILocationDto;
  location_destination: ILocationDto;
  quantity: number;
  product: string;
}
