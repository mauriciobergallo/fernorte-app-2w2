import { DeilveryOrder } from "./deilvery-order";

export class Pagination {
    items: any[] = [];
    totalPages: number = 0;
    page: number = 0;

    splitList(page: number): DeilveryOrder[] {
        const startIndex = (page - 1) * 15;
        const endIndex = startIndex + 15;
        return this.items.slice(startIndex, endIndex);
      }
}
