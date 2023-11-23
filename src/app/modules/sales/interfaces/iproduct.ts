export interface IProduct {
    
        idProduct: 0,
        name: string,
        description: string,
        unitPrice: 0,
        stockQuantity: 0,
        unitOfMeasure: string,
        category: {
          idCategory: 0,
          name: string,
          description: string
        },
        urlImage: string
        cantidadSeleccionado?: number
      


}
