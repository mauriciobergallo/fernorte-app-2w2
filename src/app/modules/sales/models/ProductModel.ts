export class ProductModel {
  idProduct: number = 0;
  name: string = "";
  description: string = "";
  unitPrice: number = 0;
  stockQuantity: number = 0;
  unitOfMeasure: string = "";
  category = {
    idCategory: 0,
    name: "",
    description: ""
  };
  urlImage: string = ""
  priceProduct: number = 0;
  discount: number = 0;
  cantidadSeleccionado?: number
}
