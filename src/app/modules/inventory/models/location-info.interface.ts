interface Location {
    zone: string;
    section: string;
    space: string;
  }
  
  export interface LocationInfoDto {
    location: Location;
    categoryName: string;
    productName: string;
    quantity: number;
    measureUnit: number;
    maxCapacity: number;
  }