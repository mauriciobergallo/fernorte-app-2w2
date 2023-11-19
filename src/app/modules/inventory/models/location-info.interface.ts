interface Location {
    zone: string;
    section: string;
    space: string;
  }
  
  export interface LocationInfoDto {
    location: Location;
    location_id: number;
    category_name: string;
    product_name: string;
    quantity: number;
    measure_unit: number;
    max_capacity: number;
  }