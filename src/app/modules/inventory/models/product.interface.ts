import { ILocation } from './location.interface';

export interface IProduct {
  location: ILocation;
  categoryName: String;
  productName: String;
  quantity: number;
  measureUnit: String;
  maxCapacity: number;
}
