import { Injectable } from '@angular/core';
import { BillModel } from '../../models/BillingModelApi';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MockService {

  constructor() { }

  getMocks(): BillModel[] {
      return this.mockBills;
    };

  getFiltrada1(): BillModel[] {
    return this.billFiltro1;
  };

  getFiltrada2(): BillModel[] {
    return this.billFiltro2;
  };

  billFiltro2: BillModel[]=[
    {
      id_bill: 1,
      address: "Av. de Mayo 123",
      id_sale_order: 101,
      id_seller: 1,
      name_seller: "Prado Ignacio",
      id_client: 201,
      first_name: "María",
      las_name: "González",
      company_name: "Tienda XYZ",
      telephone: 3515605117,
      email: "maria.gonzalez@hotmail.com",
      vat_condition: "Responsable Inscripto",
      bill_type: "A",
      cae: "12345678901234",
      expiration_date_cae: [2023, 11, 30],
      created_date: [2023, 11, 15],
      total_price: 1500,
      detail_bill: [
        {
          id: 1,
          tax: { id: 1, tax_type: "IVA", tax_value: 21 },
          id_product: 301,
          name_product: "Martillo cabeza grande",
          quantity: 2,
          unit: "unidad",
          tax_value: 0,
          unitary_price: 500,
          discount_amount: 0,
        },
      ],
      payments: [
        {
          id: 1,
          payment: 1500,
          surcharge: 0,
          payment_method: { id_payment_method: 1, payment_method: "Efectivo", surcharge: 0 },
        },
      ],
    },
    //FACTURA 2
    {
      id_bill: 2,
      address: "Calle Corrientes 456",
      id_sale_order: 102,
      id_seller: 1,
      name_seller: "Prado Ignacio",
      id_client: 202,
      first_name: "Juan",
      las_name: "López",
      company_name: "",
      telephone: 3516709245,
      email: "juan.lopez@gmail.com",
      vat_condition: "Monotributista",
      bill_type: "B",
      cae: "98765432109876",
      expiration_date_cae: [2023, 12, 15],
      created_date: [2023, 11, 20],
      total_price: 2500,
      detail_bill: [
        {
          id: 2,
          tax: { id: 2, tax_type: "IVA", tax_value: 21 },
          id_product: 302,
          name_product: "Destornillador Phillips",
          quantity: 3,
          unit: "unidad",
          tax_value: 0,
          unitary_price: 400,
          discount_amount: 50
        },
        {
          id: 3,
          tax: { id: 3, tax_type: "IVA", tax_value: 21 },
          id_product: 303,
          name_product: "Llave inglesa ajustable",
          quantity: 1,
          unit: "unidad",
          tax_value: 0,
          unitary_price: 700,
          discount_amount: 25
        }
      ],
      payments: [
        {
          id: 2,
          payment: 2500,
          surcharge: 100,
          payment_method: { id_payment_method: 2, payment_method: "Tarjeta de Crédito", surcharge: 10 }
        },
        {
          id: 3,
          payment: 100,
          surcharge: 0,
          payment_method: { id_payment_method: 1, payment_method: "Efectivo", surcharge: 0 }
        }
      ]
    },
    //FACTURA 3
    {
      id_bill: 3,
      address: "Avenida Santa Fe 789",
      id_sale_order: 103,
      id_seller: 2,
      name_seller: "Macarena Caridad",
      id_client: 203,
      first_name: "Carlos",
      las_name: "Rodríguez",
      company_name: "",
      telephone: 3517803366,
      email: "carlos.rodriguez@outlook.com",
      vat_condition: "Monotributista",
      bill_type: "C",
      cae: "87654321098765",
      expiration_date_cae: [2023, 12, 31],
      created_date: [2023, 11, 25],
      total_price: 1800,
      detail_bill: [
        {
          id: 4,
          tax: { id: 4, tax_type: "IVA", tax_value: 21 },
          id_product: 304,
          name_product: "Sierra eléctrica",
          quantity: 1,
          unit: "unidad",
          tax_value: 0,
          unitary_price: 1200,
          discount_amount: 50
        },
        {
          id: 5,
          tax: { id: 5, tax_type: "IVA", tax_value: 21 },
          id_product: 305,
          name_product: "Destornillador plano",
          quantity: 2,
          unit: "unidad",
          tax_value: 0,
          unitary_price: 150,
          discount_amount: 0
        }
      ],
      payments: [
        {
          id: 4,
          payment: 1800,
          surcharge: 0,
          payment_method: { id_payment_method: 1, payment_method: "Efectivo", surcharge: 0 }
        },
        {
          id: 5,
          payment: 0,
          surcharge: 0,
          payment_method: { id_payment_method: 2, payment_method: "Tarjeta de Crédito", surcharge: 10 }
        }
      ]
    },
    //FACTURA 4
    {
      id_bill: 4,
      address: "Calle Entre Ríos 234",
      id_sale_order: 104,
      id_seller: 2,
      name_seller: "Macarena Caridad",
      id_client: 204,
      first_name: "Laura",
      las_name: "Martínez",
      company_name: "",
      telephone: 3519123456,
      email: "laura.martinez@gmail.com",
      vat_condition: "Responsable Inscripto",
      bill_type: "A",
      cae: "54321098765432",
      expiration_date_cae: [2023, 12, 20],
      created_date: [2023, 11, 28],
      total_price: 2200,
      detail_bill: [
        {
          id: 6,
          tax: { id: 6, tax_type: "IVA", tax_value: 21 },
          id_product: 306,
          name_product: "Cinta métrica",
          quantity: 2,
          unit: "unidad",
          tax_value: 0,
          unitary_price: 800,
          discount_amount: 30
        },
        {
          id: 7,
          tax: { id: 7, tax_type: "IVA", tax_value: 21 },
          id_product: 307,
          name_product: "Alicate de corte",
          quantity: 1,
          unit: "unidad",
          tax_value: 0,
          unitary_price: 350,
          discount_amount: 10
        }
      ],
      payments: [
        {
          id: 8,
          payment: 2200,
          surcharge: 0,
          payment_method: { id_payment_method: 1, payment_method: "Efectivo", surcharge: 0 }
        },
        {
          id: 9,
          payment: 0,
          surcharge: 0,
          payment_method: { id_payment_method: 2, payment_method: "Tarjeta de Crédito", surcharge: 10 }
        }
      ]
    }
  ]

  billFiltro1: BillModel[] = [
    {
      id_bill: 7,
      address: "Avenida Belgrano 456",
      id_sale_order: 107,
      id_seller: 1,
      name_seller: "Prado Ignacio",
      id_client: 207,
      first_name: "Ana",
      las_name: "Gómez",
      company_name: "",
      telephone: 3517777777,
      email: "ana.gomez@yahoo.com",
      vat_condition: "Monotributista",
      bill_type: "C",
      cae: "87654321012345",
      expiration_date_cae: [2023, 12, 15],
      created_date: [2023, 12, 6],
      total_price: 3200,
      detail_bill: [
        {
          id: 14,
          tax: { id: 12, tax_type: "IVA", tax_value: 21 },
          id_product: 312,
          name_product: "Destornillador eléctrico",
          quantity: 2,
          unit: "unidad",
          tax_value: 0,
          unitary_price: 1000,
          discount_amount: 40
        },
        {
          id: 15,
          tax: { id: 13, tax_type: "IVA", tax_value: 21 },
          id_product: 313,
          name_product: "Llave de impacto",
          quantity: 1,
          unit: "unidad",
          tax_value: 0,
          unitary_price: 1200,
          discount_amount: 0
        },
        {
          id: 16,
          tax: { id: 14, tax_type: "IVA", tax_value: 21 },
          id_product: 314,
          name_product: "Taladro inalámbrico",
          quantity: 1,
          unit: "unidad",
          tax_value: 0,
          unitary_price: 1500,
          discount_amount: 60
        }
      ],
      payments: [
        {
          id: 17,
          payment: 3200,
          surcharge: 0,
          payment_method: { id_payment_method: 1, payment_method: "Efectivo", surcharge: 0 }
        }
      ]
    }
  ]

    mockBills: BillModel[] = [
    {
      id_bill: 1,
      address: "Av. de Mayo 123",
      id_sale_order: 101,
      id_seller: 1,
      name_seller: "Prado Ignacio",
      id_client: 201,
      first_name: "María",
      las_name: "González",
      company_name: "Tienda XYZ",
      telephone: 3515605117,
      email: "maria.gonzalez@hotmail.com",
      vat_condition: "Responsable Inscripto",
      bill_type: "A",
      cae: "12345678901234",
      expiration_date_cae: [2023, 11, 30],
      created_date: [2023, 11, 15],
      total_price: 1000,
      detail_bill: [
        {
          id: 1,
          tax: { id: 1, tax_type: "IVA", tax_value: 21 },
          id_product: 301,
          name_product: "Martillo cabeza grande",
          quantity: 2,
          unit: "unidad",
          tax_value: 0,
          unitary_price: 500,
          discount_amount: 0,
        },
      ],
      payments: [
        {
          id: 1,
          payment: 1000,
          surcharge: 0,
          payment_method: { id_payment_method: 1, payment_method: "Efectivo", surcharge: 0 },
        },
      ],
    },
    //FACTURA 2
    {
      id_bill: 2,
      address: "Calle Corrientes 456",
      id_sale_order: 102,
      id_seller: 1,
      name_seller: "Prado Ignacio",
      id_client: 202,
      first_name: "Juan",
      las_name: "López",
      company_name: "",
      telephone: 3516709245,
      email: "juan.lopez@gmail.com",
      vat_condition: "Monotributista",
      bill_type: "B",
      cae: "98765432109876",
      expiration_date_cae: [2023, 12, 15],
      created_date: [2023, 11, 20],
      total_price: 1900,
      detail_bill: [
        {
          id: 2,
          tax: { id: 2, tax_type: "IVA", tax_value: 21 },
          id_product: 302,
          name_product: "Destornillador Phillips",
          quantity: 3,
          unit: "unidad",
          tax_value: 0,
          unitary_price: 400,
          discount_amount: 50
        },
        {
          id: 3,
          tax: { id: 3, tax_type: "IVA", tax_value: 21 },
          id_product: 303,
          name_product: "Llave inglesa ajustable",
          quantity: 1,
          unit: "unidad",
          tax_value: 0,
          unitary_price: 700,
          discount_amount: 25
        }
      ],
      payments: [
        {
          id: 2,
          payment: 2500,
          surcharge: 100,
          payment_method: { id_payment_method: 2, payment_method: "Tarjeta de Crédito", surcharge: 10 }
        },
        {
          id: 3,
          payment: 100,
          surcharge: 0,
          payment_method: { id_payment_method: 1, payment_method: "Efectivo", surcharge: 0 }
        }
      ]
    },
    //FACTURA 3
    {
      id_bill: 3,
      address: "Avenida Santa Fe 789",
      id_sale_order: 103,
      id_seller: 2,
      name_seller: "Macarena Caridad",
      id_client: 203,
      first_name: "Carlos",
      las_name: "Rodríguez",
      company_name: "",
      telephone: 3517803366,
      email: "carlos.rodriguez@outlook.com",
      vat_condition: "Monotributista",
      bill_type: "C",
      cae: "87654321098765",
      expiration_date_cae: [2023, 12, 31],
      created_date: [2023, 11, 25],
      total_price: 1500,
      detail_bill: [
        {
          id: 4,
          tax: { id: 4, tax_type: "IVA", tax_value: 21 },
          id_product: 304,
          name_product: "Sierra eléctrica",
          quantity: 1,
          unit: "unidad",
          tax_value: 0,
          unitary_price: 1200,
          discount_amount: 50
        },
        {
          id: 5,
          tax: { id: 5, tax_type: "IVA", tax_value: 21 },
          id_product: 305,
          name_product: "Destornillador plano",
          quantity: 2,
          unit: "unidad",
          tax_value: 0,
          unitary_price: 150,
          discount_amount: 0
        }
      ],
      payments: [
        {
          id: 4,
          payment: 1800,
          surcharge: 0,
          payment_method: { id_payment_method: 1, payment_method: "Efectivo", surcharge: 0 }
        },
        {
          id: 5,
          payment: 0,
          surcharge: 0,
          payment_method: { id_payment_method: 2, payment_method: "Tarjeta de Crédito", surcharge: 10 }
        }
      ]
    },
    //FACTURA 4
    {
      id_bill: 4,
      address: "Calle Entre Ríos 234",
      id_sale_order: 104,
      id_seller: 2,
      name_seller: "Macarena Caridad",
      id_client: 204,
      first_name: "Laura",
      las_name: "Martínez",
      company_name: "",
      telephone: 3519123456,
      email: "laura.martinez@gmail.com",
      vat_condition: "Responsable Inscripto",
      bill_type: "A",
      cae: "54321098765432",
      expiration_date_cae: [2023, 12, 20],
      created_date: [2023, 11, 28],
      total_price: 1950,
      detail_bill: [
        {
          id: 6,
          tax: { id: 6, tax_type: "IVA", tax_value: 21 },
          id_product: 306,
          name_product: "Cinta métrica",
          quantity: 2,
          unit: "unidad",
          tax_value: 0,
          unitary_price: 800,
          discount_amount: 30
        },
        {
          id: 7,
          tax: { id: 7, tax_type: "IVA", tax_value: 21 },
          id_product: 307,
          name_product: "Alicate de corte",
          quantity: 1,
          unit: "unidad",
          tax_value: 0,
          unitary_price: 350,
          discount_amount: 10
        }
      ],
      payments: [
        {
          id: 8,
          payment: 2200,
          surcharge: 0,
          payment_method: { id_payment_method: 1, payment_method: "Efectivo", surcharge: 0 }
        },
        {
          id: 9,
          payment: 0,
          surcharge: 0,
          payment_method: { id_payment_method: 2, payment_method: "Tarjeta de Crédito", surcharge: 10 }
        }
      ]
    },
    //FACTURA 5
    {
      id_bill: 5,
      address: "Avenida San Juan 567",
      id_sale_order: 105,
      id_seller: 3,
      name_seller: "Senestrari Nicolás",
      id_client: 205,
      first_name: "Martín",
      las_name: "Fernández",
      company_name: "",
      telephone: 3517654321,
      email: "martin.fernandez@yahoo.com",
      vat_condition: "Monotributista",
      bill_type: "C",
      cae: "98765432101234",
      expiration_date_cae: [2023, 12, 10],
      created_date: [2023, 12, 1],
      total_price: 1300,
      detail_bill: [
        {
          id: 10,
          tax: { id: 8, tax_type: "IVA", tax_value: 21 },
          id_product: 308,
          name_product: "Destornillador de estrella",
          quantity: 3,
          unit: "unidad",
          tax_value: 0,
          unitary_price: 300,
          discount_amount: 20
        },
        {
          id: 11,
          tax: { id: 9, tax_type: "IVA", tax_value: 21 },
          id_product: 309,
          name_product: "Llave de tubo",
          quantity: 1,
          unit: "unidad",
          tax_value: 0,
          unitary_price: 500,
          discount_amount: 0
        }
      ],
      payments: [
        {
          id: 10,
          payment: 1300,
          surcharge: 0,
          payment_method: { id_payment_method: 1, payment_method: "Efectivo", surcharge: 0 }
        },
        {
          id: 11,
          payment: 0,
          surcharge: 0,
          payment_method: { id_payment_method: 2, payment_method: "Tarjeta de Crédito", surcharge: 10 }
        }
      ]
    },
    //FACTURA 6
    {
      id_bill: 6,
      address: "Calle Salta 789",
      id_sale_order: 106,
      id_seller: 3,
      name_seller: "Senestrari Nicolás",
      id_client: 206,
      first_name: "Pedro",
      las_name: "López",
      company_name: "",
      telephone: 3518888888,
      email: "pedro.lopez@yahoo.com",
      vat_condition: "Responsable Inscripto",
      bill_type: "A",
      cae: "12345098765432",
      expiration_date_cae: [2023, 12, 5],
      created_date: [2023, 12, 3],
      total_price: 2800,
      detail_bill: [
        {
          id: 12,
          tax: { id: 10, tax_type: "IVA", tax_value: 21 },
          id_product: 310,
          name_product: "Martillo de carpintero",
          quantity: 2,
          unit: "unidad",
          tax_value: 0,
          unitary_price: 1200,
          discount_amount: 50
        },
        {
          id: 13,
          tax: { id: 11, tax_type: "IVA", tax_value: 21 },
          id_product: 311,
          name_product: "Sierra circular",
          quantity: 1,
          unit: "unidad",
          tax_value: 0,
          unitary_price: 1600,
          discount_amount: 0
        }
      ],
      payments: [
        {
          id: 14,
          payment: 2800,
          surcharge: 0,
          payment_method: { id_payment_method: 1, payment_method: "Efectivo", surcharge: 0 }
        }
      ]
    }, 
    //FACTURA 7
    {
      id_bill: 7,
      address: "Avenida Belgrano 456",
      id_sale_order: 107,
      id_seller: 1,
      name_seller: "Prado Ignacio",
      id_client: 207,
      first_name: "Ana",
      las_name: "Gómez",
      company_name: "",
      telephone: 3517777777,
      email: "ana.gomez@yahoo.com",
      vat_condition: "Monotributista",
      bill_type: "C",
      cae: "87654321012345",
      expiration_date_cae: [2023, 12, 15],
      created_date: [2023, 12, 6],
      total_price: 3200,
      detail_bill: [
        {
          id: 14,
          tax: { id: 12, tax_type: "IVA", tax_value: 21 },
          id_product: 312,
          name_product: "Destornillador eléctrico",
          quantity: 2,
          unit: "unidad",
          tax_value: 0,
          unitary_price: 1000,
          discount_amount: 40
        },
        {
          id: 15,
          tax: { id: 13, tax_type: "IVA", tax_value: 21 },
          id_product: 313,
          name_product: "Llave de impacto",
          quantity: 1,
          unit: "unidad",
          tax_value: 0,
          unitary_price: 1200,
          discount_amount: 0
        },
        {
          id: 16,
          tax: { id: 14, tax_type: "IVA", tax_value: 21 },
          id_product: 314,
          name_product: "Taladro inalámbrico",
          quantity: 1,
          unit: "unidad",
          tax_value: 0,
          unitary_price: 1500,
          discount_amount: 60
        }
      ],
      payments: [
        {
          id: 17,
          payment: 3200,
          surcharge: 0,
          payment_method: { id_payment_method: 1, payment_method: "Efectivo", surcharge: 0 }
        }
      ]
    },
    //FACTURA 8
    {
      id_bill: 8,
      address: "Calle Jujuy 567",
      id_sale_order: 108,
      id_seller: 2,
      name_seller: "Macarena Caridad",
      id_client: 208,
      first_name: "Luis",
      las_name: "García",
      company_name: "",
      telephone: 3516666666,
      email: "luis.garcia@outlook.com",
      vat_condition: "Responsable Inscripto",
      bill_type: "A",
      cae: "98765432101234",
      expiration_date_cae: [2023, 12, 10],
      created_date: [2023, 12, 8],
      total_price: 1500,
      detail_bill: [
        {
          id: 18,
          tax: { id: 15, tax_type: "IVA", tax_value: 21 },
          id_product: 315,
          name_product: "Destornillador de precisión",
          quantity: 3,
          unit: "unidad",
          tax_value: 0,
          unitary_price: 400,
          discount_amount: 0
        }
      ],
      payments: [
        {
          id: 19,
          payment: 1500,
          surcharge: 0,
          payment_method: { id_payment_method: 1, payment_method: "Efectivo", surcharge: 0 }
        }
      ]
    },
    //FACTURA 9
    {
      id_bill: 9,
      address: "Calle Jujuy 567",
      id_sale_order: 108,
      id_seller: 2,
      name_seller: "Macarena Caridad",
      id_client: 208,
      first_name: "Luis",
      las_name: "García",
      company_name: "",
      telephone: 3516666666,
      email: "luis.garcia@gmail.com",
      vat_condition: "Responsable Inscripto",
      bill_type: "A",
      cae: "98765432101234",
      expiration_date_cae: [2023, 12, 10],
      created_date: [2023, 12, 8],
      total_price: 1500,
      detail_bill: [
        {
          id: 18,
          tax: { id: 15, tax_type: "IVA", tax_value: 21 },
          id_product: 315,
          name_product: "Destornillador de precisión",
          quantity: 3,
          unit: "unidad",
          tax_value: 0,
          unitary_price: 400,
          discount_amount: 0
        }
      ],
      payments: [
        {
          id: 19,
          payment: 1500,
          surcharge: 0,
          payment_method: { id_payment_method: 1, payment_method: "Efectivo", surcharge: 0 }
        }
      ]
    },
    //FACTURA 10
    {
      id_bill: 10,
      address: "Avenida San Martín 789",
      id_sale_order: 109,
      id_seller: 3,
      name_seller: "Senestrari Nicolás",
      id_client: 209,
      first_name: "Carolina",
      las_name: "Rodríguez",
      company_name: "",
      telephone: 3515555555,
      email: "carolina.rodriguez@hotmail.com",
      vat_condition: "Monotributista",
      bill_type: "C",
      cae: "54321098765432",
      expiration_date_cae: [2023, 12, 25],
      created_date: [2023, 12, 12],
      total_price: 4200,
      detail_bill: [
        {
          id: 20,
          tax: { id: 16, tax_type: "IVA", tax_value: 21 },
          id_product: 316,
          name_product: "Sierra de mano",
          quantity: 2,
          unit: "unidad",
          tax_value: 0,
          unitary_price: 1200,
          discount_amount: 50
        },
        {
          id: 21,
          tax: { id: 17, tax_type: "IVA", tax_value: 21 },
          id_product: 317,
          name_product: "Martillo de goma",
          quantity: 1,
          unit: "unidad",
          tax_value: 0,
          unitary_price: 800,
          discount_amount: 20
        },
        {
          id: 22,
          tax: { id: 18, tax_type: "IVA", tax_value: 21 },
          id_product: 318,
          name_product: "Destornillador de punta plana",
          quantity: 3,
          unit: "unidad",
          tax_value: 0,
          unitary_price: 450,
          discount_amount: 15
        },
        {
          id: 23,
          tax: { id: 19, tax_type: "IVA", tax_value: 21 },
          id_product: 319,
          name_product: "Alicate de presión",
          quantity: 1,
          unit: "unidad",
          tax_value: 0,
          unitary_price: 1200,
          discount_amount: 0
        }
      ],
      payments: [
        {
          id: 24,
          payment: 4200,
          surcharge: 0,
          payment_method: { id_payment_method: 1, payment_method: "Efectivo", surcharge: 0 }
        }
      ]
    }
  ];
}
