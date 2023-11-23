interface Location {
    zone: string;
    section: string;
    space: string;
  }
  
  export interface LocationInfoDto {
    location: Location;
    product_id:number|undefined;
    location_id: number;
    category_name: string;
    product_name: string;
    quantity: number;
    measure_unit: number;
    max_capacity: number;
  }