import { ILocationDto } from "./ilocation-dto";
export class ILocationInfoProduct {
    product_id : number = 0;
    category_name: string ='';
    product_name: string ='';
    quantity: number =0;
    measure_unit: string ='';
    max_capacity: number =0;
    location: ILocationDto= {
        id: 0,
        zone: '',
        section: '',
        space: ''
    };
}
