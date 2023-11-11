import { IUpdateDetailDto } from './UpdateDetailDto.interface';

export interface IUpdateReceptionOrder {
  id_reception_order: number;
  received_by: string;
  details: IUpdateDetailDto[];
}
