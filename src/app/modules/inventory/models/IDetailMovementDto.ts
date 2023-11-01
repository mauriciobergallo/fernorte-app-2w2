import { ILocationDto } from "./ILocationDto";

export interface IDetailMovementDto{
  
  location_origin: ILocationDto | null;
  location_destination: ILocationDto | null;
  quantity: number;
  product: string;
}
