import { IUpdatedDetailDto } from './updatedDetailDto.interface';

export interface IUpdatedOrderDto {
  id_reception_order: number;
  details: IUpdatedDetailDto[];
}
