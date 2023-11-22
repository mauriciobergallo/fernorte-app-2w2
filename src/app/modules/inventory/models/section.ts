import { Space } from "./space";

export interface Section {
    Id: number;
    name : string;
    categoryName: string;
    maxCapacity: number;
    spaces: Space[];
}
