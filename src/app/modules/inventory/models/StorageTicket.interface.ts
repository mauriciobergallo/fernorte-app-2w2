import { ILocationDto } from "./ILocationDto";
import { StorageTicketState } from './StorageTicketState.enum';

export interface StorageTicket {
    ticket_id: number;
    created_at: string;
    product_name: string;
    location: ILocationDto;
    quantity: number;
    measure_unit: string;
    created_by: string;
    operator_name: string;
    remarks: string;

    state: StorageTicketState;
  }
  