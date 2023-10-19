import { IProduct } from "../../models/IProduct";

export const PRODUCT_LIST: IProduct[] = [
    {
      id: 1,
      name: 'Martillo',
      description: 'Herramienta de mano para golpear clavos u otros objetos.',
      unitPrice: 12.99,
      stockQuantity: 30,
      unitOfMeasure: 'unidad',
      category: {
        idCategory: 1,
        name: 'Construcción',
        description: 'Categoría de herramientas de construcción.'
      },
      urlImage: 'https://t4.ftcdn.net/jpg/04/72/65/73/360_F_472657366_6kV9ztFQ3OkIuBCkjjL8qPmqnuagktXU.jpg',
    },
    {
      id: 2,
      name: 'Destornillador',
      description: 'Herramienta de mano para apretar y aflojar tornillos.',
      unitPrice: 9.99,
      stockQuantity: 50,
      unitOfMeasure: 'unidad',
      category: {
        idCategory: 2,
        name: 'Electricidad',
        description: 'Categoría de herramientas eléctricas.'
      },
      urlImage: 'https://t4.ftcdn.net/jpg/04/72/65/73/360_F_472657366_6kV9ztFQ3OkIuBCkjjL8qPmqnuagktXU.jpg',
    },
    {
      id: 3,
      name: 'Sierra Circular',
      description: 'Herramienta eléctrica para cortar materiales de construcción.',
      unitPrice: 69.99,
      stockQuantity: 20,
      unitOfMeasure: 'unidad',
      category: {
        idCategory: 1,
        name: 'Construcción',
        description: 'Categoría de herramientas de construcción.'
      },
      urlImage: 'https://t4.ftcdn.net/jpg/04/72/65/73/360_F_472657366_6kV9ztFQ3OkIuBCkjjL8qPmqnuagktXU.jpg',
    },
    {
      id: 4,
      name: 'Taladro Eléctrico',
      description: 'Herramienta para perforar agujeros en diferentes superficies.',
      unitPrice: 49.99,
      stockQuantity: 25,
      unitOfMeasure: 'unidad',
      category: {
        idCategory: 2,
        name: 'Electricidad',
        description: 'Categoría de herramientas eléctricas.'
      },
      urlImage: 'https://t4.ftcdn.net/jpg/04/72/65/73/360_F_472657366_6kV9ztFQ3OkIuBCkjjL8qPmqnuagktXU.jpg',
    },
    {
      id: 5,
      name: 'Caja de Herramientas',
      description: 'Caja para almacenar y transportar herramientas.',
      unitPrice: 39.99,
      stockQuantity: 15,
      unitOfMeasure: 'unidad',
      category: {
        idCategory: 1,
        name: 'Construcción',
        description: 'Categoría de herramientas de construcción.'
      },
      urlImage: 'https://t4.ftcdn.net/jpg/04/72/65/73/360_F_472657366_6kV9ztFQ3OkIuBCkjjL8qPmqnuagktXU.jpg',
    },
    {
      id: 6,
      name: 'Alicate',
      description: 'Herramienta para sujetar, doblar y cortar objetos.',
      unitPrice: 7.99,
      stockQuantity: 40,
      unitOfMeasure: 'unidad',
      category: {
        idCategory: 3,
        name: 'Herramientas Manuales',
        description: 'Categoría de herramientas manuales.'
      },
      urlImage: 'https://t4.ftcdn.net/jpg/04/72/65/73/360_F_472657366_6kV9ztFQ3OkIuBCkjjL8qPmqnuagktXU.jpg',
    },
    {
      id: 7,
      name: 'Cinta Métrica',
      description: 'Herramienta de medición para medir distancias y longitudes.',
      unitPrice: 5.99,
      stockQuantity: 100,
      unitOfMeasure: 'unidad',
      category: {
        idCategory: 3,
        name: 'Herramientas Manuales',
        description: 'Categoría de herramientas manuales.'
      },
      urlImage: 'https://t4.ftcdn.net/jpg/04/72/65/73/360_F_472657366_6kV9ztFQ3OkIuBCkjjL8qPmqnuagktXU.jpg',
    },
    {
      id: 8,
      name: 'Llave Inglesa',
      description: 'Herramienta para apretar y aflojar tuercas y pernos.',
      unitPrice: 8.99,
      stockQuantity: 60,
      unitOfMeasure: 'unidad',
      category: {
        idCategory: 3,
        name: 'Herramientas Manuales',
        description: 'Categoría de herramientas manuales.'
      },
      urlImage: 'https://t4.ftcdn.net/jpg/04/72/65/73/360_F_472657366_6kV9ztFQ3OkIuBCkjjL8qPmqnuagktXU.jpg',
    },
    {
      id: 9,
      name: 'Broca de Madera',
      description: 'Herramienta de corte para perforar agujeros en madera.',
      unitPrice: 3.99,
      stockQuantity: 80,
      unitOfMeasure: 'unidad',
      category: {
        idCategory: 1,
        name: 'Construcción',
        description: 'Categoría de herramientas de construcción.'
      },
      urlImage: 'https://t4.ftcdn.net/jpg/04/72/65/73/360_F_472657366_6kV9ztFQ3OkIuBCkjjL8qPmqnuagktXU.jpg',
    },
    {
      id: 10,
      name: 'Destornillador Eléctrico',
      description: 'Herramienta eléctrica para apretar y aflojar tornillos.',
      unitPrice: 14.99,
      stockQuantity: 45,
      unitOfMeasure: 'unidad',
      category: {
        idCategory: 2,
        name: 'Electricidad',
        description: 'Categoría de herramientas eléctricas.'
      },
      urlImage: 'https://t4.ftcdn.net/jpg/04/72/65/73/360_F_472657366_6kV9ztFQ3OkIuBCkjjL8qPmqnuagktXU.jpg',
    },
    {
      id: 11,
      name: 'Multímetro Digital',
      description: 'Herramienta de medición para medir voltaje y corriente eléctrica.',
      unitPrice: 19.99,
      stockQuantity: 35,
      unitOfMeasure: 'unidad',
      category: {
        idCategory: 2,
        name: 'Electricidad',
        description: 'Categoría de herramientas eléctricas.'
      },
      urlImage: 'https://t4.ftcdn.net/jpg/04/72/65/73/360_F_472657366_6kV9ztFQ3OkIuBCkjjL8qPmqnuagktXU.jpg',
    },
    {
      id: 12,
      name: 'Nivel de Burbuja',
      description: 'Herramienta para nivelar superficies horizontales y verticales.',
      unitPrice: 6.99,
      stockQuantity: 70,
      unitOfMeasure: 'unidad',
      category: {
        idCategory: 1,
        name: 'Construcción',
        description: 'Categoría de herramientas de construcción.'
      },
      urlImage: 'https://t4.ftcdn.net/jpg/04/72/65/73/360_F_472657366_6kV9ztFQ3OkIuBCkjjL8qPmqnuagktXU.jpg',
    },
    {
      id: 13,
      name: 'Cautín Eléctrico',
      description: 'Herramienta para soldar componentes electrónicos.',
      unitPrice: 11.99,
      stockQuantity: 40,
      unitOfMeasure: 'unidad',
      category: {
        idCategory: 2,
        name: 'Electricidad',
        description: 'Categoría de herramientas eléctricas.'
      },
      urlImage: 'https://t4.ftcdn.net/jpg/04/72/65/73/360_F_472657366_6kV9ztFQ3OkIuBCkjjL8qPmqnuagktXU.jpg',
    },
    {
      id: 14,
      name: 'Lijadora Eléctrica',
      description: 'Herramienta para lijar superficies de madera y metal.',
      unitPrice: 24.99,
      stockQuantity: 25,
      unitOfMeasure: 'unidad',
      category: {
        idCategory: 1,
        name: 'Construcción',
        description: 'Categoría de herramientas de construcción.'
      },
      urlImage: 'https://t4.ftcdn.net/jpg/04/72/65/73/360_F_472657366_6kV9ztFQ3OkIuBCkjjL8qPmqnuagktXU.jpg',
    },
    {
      id: 15,
      name: 'Destornillador de Precisión',
      description: 'Herramienta para trabajos de precisión con tornillos pequeños.',
      unitPrice: 8.99,
      stockQuantity: 30,
      unitOfMeasure: 'unidad',
      category: {
        idCategory: 3,
        name: 'Herramientas Manuales',
        description: 'Categoría de herramientas manuales.'
      },
      urlImage: 'https://t4.ftcdn.net/jpg/04/72/65/73/360_F_472657366_6kV9ztFQ3OkIuBCkjjL8qPmqnuagktXU.jpg',
    },
  ];
  