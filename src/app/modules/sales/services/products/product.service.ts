import { Injectable } from '@angular/core';
import { ProductModel } from '../../models/ProductModel';
import { ProductProvider } from './productProvider';


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private productProvider: ProductProvider) { }
  private listProduct: ProductModel[] = [];

  private listProductMocks: ProductModel[] = [
    {
      idProduct: 1,
      name: "Martillo de carpintero",
      description: "Martillo con mango de madera ideal para trabajos de carpintería.",
      unitPrice: 15.99,
      stockQuantity: 100,
      unitOfMeasure: "unidad",
      category: {
        idCategory: 101,
        name: "Herramientas manuales",
        description: "Herramientas que funcionan con energía humana.",
        isDeleted: false
      },
      urlImage: "https://example.com/martillo.jpg",
      priceProduct: 15.99,
      discount: 0,
      isDeleted: false,
      cantidadSeleccionado: 0
    },
    {
      idProduct: 2,
      name: "Destornillador de precisión",
      description: "Destornillador pequeño y preciso para trabajos delicados.",
      unitPrice: 8.49,
      stockQuantity: 50,
      unitOfMeasure: "unidad",
      category: {
        idCategory: 102,
        name: "Herramientas manuales",
        description: "Herramientas que funcionan con energía humana.",
        isDeleted: false
      },
      urlImage: "https://example.com/destornillador.jpg",
      priceProduct: 8.49,
      discount: 0,
      isDeleted: false,
      cantidadSeleccionado: 0
    },
    {
      idProduct: 3,
      name: "Sierra eléctrica",
      description: "Sierra eléctrica para cortes precisos en madera y otros materiales.",
      unitPrice: 129.99,
      stockQuantity: 20,
      unitOfMeasure: "unidad",
      category: {
        idCategory: 103,
        name: "Herramientas eléctricas",
        description: "Herramientas que funcionan con energía eléctrica.",
        isDeleted: false
      },
      urlImage: "https://example.com/sierra.jpg",
      priceProduct: 129.99,
      discount: 0,
      isDeleted: false,
      cantidadSeleccionado: 0
    },
    {
      idProduct: 4,
      name: "Taladro inalámbrico",
      description: "Taladro potente y portátil para perforaciones precisas.",
      unitPrice: 89.99,
      stockQuantity: 30,
      unitOfMeasure: "unidad",
      category: {
        idCategory: 104,
        name: "Herramientas eléctricas",
        description: "Herramientas que funcionan con energía eléctrica.",
        isDeleted: false
      },
      urlImage: "https://example.com/taladro.jpg",
      priceProduct: 89.99,
      discount: 0,
      isDeleted: false,
      cantidadSeleccionado: 0
    },
    {
      idProduct: 5,
      name: "Llave ajustable",
      description: "Llave versátil con mandíbula ajustable para varios tamaños.",
      unitPrice: 12.99,
      stockQuantity: 40,
      unitOfMeasure: "unidad",
      category: {
        idCategory: 105,
        name: "Herramientas manuales",
        description: "Herramientas que funcionan con energía humana.",
        isDeleted: false
      },
      urlImage: "https://example.com/llave.jpg",
      priceProduct: 12.99,
      discount: 0,
      isDeleted: false,
      cantidadSeleccionado: 0
    },
    {
      idProduct: 6,
      name: "Cinta métrica",
      description: "Cinta métrica flexible y precisa para medir longitudes.",
      unitPrice: 5.49,
      stockQuantity: 60,
      unitOfMeasure: "unidad",
      category: {
        idCategory: 106,
        name: "Instrumentos de medición",
        description: "Instrumentos para medir diversas magnitudes.",
        isDeleted: false
      },
      urlImage: "https://example.com/cinta.jpg",
      priceProduct: 5.49,
      discount: 0,
      isDeleted: false,
      cantidadSeleccionado: 0
    },
    {
      idProduct: 7,
      name: "Destornillador Phillips",
      description: "Destornillador con punta Phillips para tornillos cruzados.",
      unitPrice: 6.99,
      stockQuantity: 25,
      unitOfMeasure: "unidad",
      category: {
        idCategory: 107,
        name: "Herramientas manuales",
        description: "Herramientas que funcionan con energía humana.",
        isDeleted: false
      },
      urlImage: "https://example.com/destornillador_phillips.jpg",
      priceProduct: 6.99,
      discount: 0,
      isDeleted: false,
      cantidadSeleccionado: 0
    },
    {
      idProduct: 8,
      name: "Nivel de burbuja",
      description: "Instrumento para verificar la horizontalidad y verticalidad.",
      unitPrice: 8.75,
      stockQuantity: 35,
      unitOfMeasure: "unidad",
      category: {
        idCategory: 108,
        name: "Instrumentos de medición",
        description: "Instrumentos para medir diversas magnitudes.",
        isDeleted: false
      },
      urlImage: "https://example.com/nivel_burbuja.jpg",
      priceProduct: 8.75,
      discount: 0,
      isDeleted: false,
      cantidadSeleccionado: 0
    },
    {
      idProduct: 9,
      name: "Llave de tubo",
      description: "Llave de tubo ajustable para trabajos en fontanería.",
      unitPrice: 15.25,
      stockQuantity: 20,
      unitOfMeasure: "unidad",
      category: {
        idCategory: 109,
        name: "Herramientas manuales",
        description: "Herramientas que funcionan con energía humana.",
        isDeleted: false
      },
      urlImage: "https://example.com/llave_tubo.jpg",
      priceProduct: 15.25,
      discount: 0,
      isDeleted: false,
      cantidadSeleccionado: 0
    },
    {
      idProduct: 10,
      name: "Amoladora Angular Versa Pro 2400 W 230 Mm Ferreteria Express",
      description: "Amoladora Angular Versa Pro 2400 W 230 Mm Ferreteria Express",
      unitPrice: 13550,
      stockQuantity: 20,
      unitOfMeasure: "unidad",
      category: {
        idCategory: 109,
        name: "Herramientas eléctricas",
        description: "",
        isDeleted: false
      },
      urlImage: "",
      priceProduct: 13550,
      discount: 0,
      isDeleted: false,
      cantidadSeleccionado: 0
    }

  ];

  getlistProductMocks(): ProductModel[] {
    this.listProduct = this.listProductMocks;
    return this.listProductMocks;
  }

  getlistProduct(): ProductModel[] {
    this.productProvider.getListProduct().subscribe((res) => {
      this.listProduct = res
      return this.listProduct;

    });
    return this.listProduct;
  }


  restarCantidad(productoSeleccionado: ProductModel) {
    this.listProduct = this.listProduct.map(x => {
      if (x.idProduct == productoSeleccionado.idProduct)
        x.stockQuantity = x.stockQuantity - productoSeleccionado.cantidadSeleccionado!

      return x;
    })
    return this.listProduct;
  }
  filtrarProductos(texto: any) {
    if (texto.target && texto.target.value && texto.target.value.trim() !== '') {
      return this.listProduct.filter(producto => producto.name.toLowerCase().includes(texto.target.value.toLowerCase()));
    } else {
      return [];
    }
  }
  cleanProduct(): ProductModel {
    let productoSeleccionado = {
      idProduct: 0,
      name: "",
      description: "",
      unitPrice: 0,
      stockQuantity: 0,
      unitOfMeasure: "",
      category: {
        idCategory: 0,
        name: "",
        description: "",
        isDeleted:false
      },
      urlImage: "",
      priceProduct: 0,
      isDeleted:false,
      discount: 0,
      cantidadSeleccionado: 1
    }

    return productoSeleccionado;
  }

}
