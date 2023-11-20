import { Injectable } from '@angular/core';
import { SaleOrderOk } from '../../models/SaleOrderOk';
import { SaleOrderApi } from '../../models/SaleModelApi';

@Injectable({
  providedIn: 'root'
})
export class MockSalesService {
  salesOrderList : SaleOrderOk[] = [
    {
      idSaleOrder: 1561549872,
      idSeller: 1,
      nameSeller: "Rodolfo Bustos",
      idClient: 5,
      nameClient: "Ariel Pampa",
      address: "Av. General Paz 158",
      telephone: "3517895623",
      companyName: "",
      email: "",
      dateOfIssue: new Date(2023,1,13,10,11),
      dateOfExpiration: new Date(2023,1,23,10,11),
      stateSaleOrder: "CREATED",
      details : [
        {
          idProduct : 12,
          name: "Martillo",
          idSaleOrderDetails:154561887,
          price : 1563,
          quantity : 1,
          stateSaleOrderDetail : "CREATED", //RESERVED, DELIVERED, CANCELLED, CREATED
        },
        {
          idProduct : 23,
          name: "Clavos para pared",
          idSaleOrderDetails:154561888,
          price : 20,
          quantity : 10,
          stateSaleOrderDetail : "CREATED", //RESERVED, DELIVERED, CANCELLED, CREATED
        }
      ]
    },
    {
      idSaleOrder: 1561549873,
      idSeller: 4,
      nameSeller: "Martín Pérez",
      idClient: 2,
      nameClient: "Tomás Aranda",
      address: "Av. General Paz 158",
      telephone: "3517895623",
      companyName: "",
      email: "",
      dateOfIssue: new Date(2023,1,17,16,31),
      dateOfExpiration: new Date(2023,1,23,16,31),
      stateSaleOrder: "PENDING_DELIVERY",
      details : [
        {
          idProduct : 25,
          name: "Mecha para chapa n°6",
          idSaleOrderDetails:154561889,
          price : 500,
          quantity : 1,
          stateSaleOrderDetail : "RESERVED",
        }
      ]
    },
    {
      idSaleOrder: 1561549874,
      idSeller: 4,
      nameSeller: "Martín Pérez",
      idClient: 7,
      nameClient: "Juan García",
      address: "Av. General Paz 158",
      telephone: "3517895623",
      companyName: "",
      email: "",
      dateOfIssue: new Date(2023,1,21,12,25),
      dateOfExpiration: new Date(2023,1,28,12,25),
      stateSaleOrder: "CREATED",
      details : [
        {
          idProduct : 25,
          name: "Mecha para chapa n°6",
          idSaleOrderDetails:154561890,
          price : 500,
          quantity : 1,
          stateSaleOrderDetail : "CREATED",
        }
      ]
    },
    {
      idSaleOrder: 1561549875,
      idSeller: 2,
      nameSeller: "Rodolfo Bustos",
      idClient: 3,
      nameClient: "Luisa Farías",
      address: "Av. General Paz 158",
      telephone: "3517895623",
      companyName: "",
      email: "",
      dateOfIssue: new Date(2023,1,28,15,28),
      dateOfExpiration: new Date(2023,2,5,15,28),
      stateSaleOrder: "PENDING_DELIVERY",
      details : [
        {
          idProduct : 18,
          name: "Amoladora XS28",
          idSaleOrderDetails:154561891,
          price : 58600,
          quantity : 1,
          stateSaleOrderDetail : "RESERVED",
        }
      ]
    },
    {
      idSaleOrder: 1561549876,
      idSeller: 3,
      nameSeller: "Liliana Aristimuño",
      idClient: 1,
      nameClient: "Constanza Carranza",
      address: "Av. General Paz 158",
      telephone: "3517895623",
      companyName: "",
      email: "",
      dateOfIssue: new Date(2023,2,15,13,52),
      dateOfExpiration: new Date(2023,2,25,13,52),
      stateSaleOrder: "DELIVERED",
      details : [
        {
          idProduct : 53,
          name: "Escalera aluminio 6 peldaños",
          idSaleOrderDetails:154561892,
          price : 27469,
          quantity : 1,
          stateSaleOrderDetail : "DELIVERED",
        }
      ]
    },
    {
      idSaleOrder: 1561549877,
      idSeller: 3,
      nameSeller: "María Alonso",
      idClient: 7,
      nameClient: "Juan García",
      address: "Av. General Paz 158",
      telephone: "3517895623",
      companyName: "",
      email: "",
      dateOfIssue: new Date(2023,2,1,11,11),
      dateOfExpiration: new Date(2023,2,8,11,11),
      stateSaleOrder: "UNBILLED",
      details : [
        {
          idProduct : 22,
          name: "Cemento premezcla",
          idSaleOrderDetails:154561893,
          price : 742,
          quantity : 7,
          stateSaleOrderDetail : "RESERVED",
        }
      ]
    },
    {
      idSaleOrder: 1561549878,
      idSeller: 5,
      nameSeller: "Esteban Gimenez",
      idClient: 6,
      nameClient: "Pamela López",
      address: "Av. General Paz 158",
      telephone: "3517895623",
      companyName: "",
      email: "",
      dateOfIssue: new Date(2023,2,24,15,22),
      dateOfExpiration: new Date(2023,2,28,15,22),
      stateSaleOrder: "UNBILLED",
      details : [
        {
          idProduct : 54,
          name: "Tanza para bordeadora 2mm",
          idSaleOrderDetails:154561894,
          price : 100,
          quantity : 3,
          stateSaleOrderDetail : "RESERVED",
        }
      ]
    },
    {
      idSaleOrder: 1561549879,
      idSeller: 2,
      nameSeller: "Martín Pérez",
      idClient: 8,
      nameClient: "Pablo Peña",
      address: "Av. General Paz 158",
      telephone: "3517895623",
      companyName: "",
      email: "",
      dateOfIssue: new Date(2023,3,2,9,17),
      dateOfExpiration: new Date(2023,3,8,9,17),
      stateSaleOrder: "PENDING_DELIVERY",
      details : [
        {
          idProduct : 20,
          name: "Mecha para chapa n°8",
          idSaleOrderDetails:154561895,
          price : 500,
          quantity : 1,
          stateSaleOrderDetail : "RESERVED",
        }
      ]
    },
    {
      idSaleOrder: 1561549880,
      idSeller: 4,
      nameSeller: "María Alonso",
      idClient: 2,
      nameClient: "Tomás Aranda",
      address: "Av. General Paz 158",
      telephone: "3517895623",
      companyName: "",
      email: "",
      dateOfIssue: new Date(2023,3,14,8,52),
      dateOfExpiration: new Date(2023,3,25,8,52),
      stateSaleOrder: "UNBILLED",
      details : [
        {
          idProduct : 3,
          name: "Arandelas 8mm",
          idSaleOrderDetails:154561896,
          price : 15,
          quantity : 20,
          stateSaleOrderDetail : "RESERVED",
        },
        {
          idProduct : 25,
          name: "Tornillos 8mm",
          idSaleOrderDetails:154561897,
          price : 30,
          quantity : 20,
          stateSaleOrderDetail : "RESERVED",
        },
        {
          idProduct : 87,
          name: "Enduido antihumedad",
          idSaleOrderDetails:154561898,
          price : 2314,
          quantity : 1,
          stateSaleOrderDetail : "RESERVED",
        }
      ]
    },
    {
      idSaleOrder: 1561549881,
      idSeller: 4,
      nameSeller: "María Alonso",
      idClient: 2,
      nameClient: "Tomás Aranda",
      address: "Av. General Paz 158",
      telephone: "3517895623",
      companyName: "",
      email: "",
      dateOfIssue: new Date(2023,3,30,15,1),
      dateOfExpiration: new Date(2023,4,8,15,1),
      stateSaleOrder: "DELIVERED",
      details : [
        {
          idProduct : 33,
          name: "Destornillador eléctrico Black&Decker",
          idSaleOrderDetails:154561899,
          price : 82000,
          quantity : 1,
          stateSaleOrderDetail : "DELIVERED",
        }
      ]
    },
    {
      idSaleOrder: 1561549882,
      idSeller: 5,
      nameSeller: "Patricio Rey",
      idClient: 8,
      nameClient: "Pablo Peña",
      address: "Av. General Paz 158",
      telephone: "3517895623",
      companyName: "",
      email: "",
      dateOfIssue: new Date(2023,4,10,14,13),
      dateOfExpiration: new Date(2023,4,16,14,13),
      stateSaleOrder: "DELIVERED",
      details : [
        {
          idProduct : 54,
          name: "Tanza para bordeadora 2mm",
          idSaleOrderDetails:154561900,
          price : 100,
          quantity : 5,
          stateSaleOrderDetail : "DELIVERED",
        }
      ]
    },
    {
      idSaleOrder: 1561549883,
      idSeller: 4,
      nameSeller: "María Alonoso",
      idClient: 7,
      nameClient: "Juan García",
      address: "Av. General Paz 158",
      telephone: "3517895623",
      companyName: "",
      email: "",
      dateOfIssue: new Date(2023,5,2,9,27),
      dateOfExpiration: new Date(2023,5,11,9,27),
      stateSaleOrder: "CREATED",
      details : [
        {
          idProduct : 20,
          name: "Mecha para chapa n°8",
          idSaleOrderDetails:154561901,
          price : 500,
          quantity : 1,
          stateSaleOrderDetail : "CREATED",
        }
      ]
    },
    {
      idSaleOrder: 1561549884,
      idSeller: 3,
      nameSeller: "Juan García",
      idClient: 6,
      nameClient: "Pamela López",
      address: "Av. General Paz 158",
      telephone: "3517895623",
      companyName: "",
      email: "",
      dateOfIssue: new Date(2023,5,12,10,27),
      dateOfExpiration: new Date(2023,5,21,10,27),
      stateSaleOrder: "PENDING_DELIVERY",
      details : [
        {
          idProduct : 20,
          name: "Arena fina",
          idSaleOrderDetails:154561902,
          price : 500,
          quantity : 20,
          stateSaleOrderDetail : "RESERVED",
        },
        {
          idProduct : 21,
          name: "Arena gruesa",
          idSaleOrderDetails:154561903,
          price : 600,
          quantity : 20,
          stateSaleOrderDetail : "RESERVED",
        },
        {
          idProduct : 22,
          name: "Cemento premezcla",
          idSaleOrderDetails:154561904,
          price : 742,
          quantity : 10,
          stateSaleOrderDetail : "RESERVED",
        }
      ]
    },
    {
      idSaleOrder: 1561549885,
      idSeller: 3,
      nameSeller: "Juan García",
      idClient: 1,
      nameClient: "Constanza Carranza",
      address: "Av. General Paz 158",
      telephone: "3517895623",
      companyName: "",
      email: "",
      dateOfIssue: new Date(2023,5,17,11,33),
      dateOfExpiration: new Date(2023,5,25,11,33),
      stateSaleOrder: "PENDING_DELIVERY",
      details : [
        {
          idProduct : 20,
          name: "Mecha para chapa n°8",
          idSaleOrderDetails:154561905,
          price : 500,
          quantity : 1,
          stateSaleOrderDetail : "RESERVED",
        }
      ]
    },
    {
      idSaleOrder: 1561549886,
      idSeller: 1,
      nameSeller: "Rodolfo Bustos",
      idClient: 2,
      nameClient: "Tomás Aranda",
      address: "Av. General Paz 158",
      telephone: "3517895623",
      companyName: "",
      email: "",
      dateOfIssue: new Date(2023,5,22,16,1),
      dateOfExpiration: new Date(2023,5,27,16,1),
      stateSaleOrder: "PENDING_DELIVERY",
      details : [
        {
          idProduct : 54,
          name: "Tanza para bordeadora 2mm",
          idSaleOrderDetails:154561900,
          price : 100,
          quantity : 4,
          stateSaleOrderDetail : "RESERVED",
        }
      ]
    },
    {
      idSaleOrder: 1561549887,
      idSeller: 4,
      nameSeller: "María Alonso",
      idClient: 6,
      nameClient: "Pamela López",
      address: "Av. General Paz 158",
      telephone: "3517895623",
      companyName: "",
      email: "",
      dateOfIssue: new Date(2023,6,2,16,1),
      dateOfExpiration: new Date(2023,6,9,16,1),
      stateSaleOrder: "PENDING_DELIVERY",
      details : [
        {
          idProduct : 33,
          name: "Destornillador eléctrico Black&Decker",
          idSaleOrderDetails:154561899,
          price : 82000,
          quantity : 1,
          stateSaleOrderDetail : "RESERVED",
        }
      ]
    },
    {
      idSaleOrder: 1561549888,
      idSeller: 1,
      nameSeller: "Rodolfo Bustos",
      idClient: 5,
      nameClient: "Ariel Pampa",
      address: "Av. General Paz 158",
      telephone: "3517895623",
      companyName: "",
      email: "",
      dateOfIssue: new Date(2023,1,13,10,11),
      dateOfExpiration: new Date(2023,1,23,10,11),
      stateSaleOrder: "CREATED",
      details : [
        {
          idProduct : 12,
          name: "Martillo",
          idSaleOrderDetails:154561887,
          price : 1563,
          quantity : 1,
          stateSaleOrderDetail : "CREATED", //RESERVED, DELIVERED, CANCELLED, CREATED
        },
        {
          idProduct : 23,
          name: "Clavos para pared",
          idSaleOrderDetails:154561888,
          price : 20,
          quantity : 10,
          stateSaleOrderDetail : "CREATED", //RESERVED, DELIVERED, CANCELLED, CREATED
        }
      ]
    },
    {
      idSaleOrder: 1561549889,
      idSeller: 4,
      nameSeller: "María Alonso",
      idClient: 2,
      nameClient: "Tomás Aranda",
      address: "Av. General Paz 158",
      telephone: "3517895623",
      companyName: "",
      email: "",
      dateOfIssue: new Date(2023,1,17,16,31),
      dateOfExpiration: new Date(2023,1,23,16,31),
      stateSaleOrder: "PENDING_DELIVERY",
      details : [
        {
          idProduct : 25,
          name: "Mecha para chapa n°6",
          idSaleOrderDetails:154561889,
          price : 500,
          quantity : 1,
          stateSaleOrderDetail : "RESERVED",
        }
      ]
    },
    {
      idSaleOrder: 1561549890,
      idSeller: 4,
      nameSeller: "María Alonso",
      idClient: 7,
      nameClient: "Juan García",
      address: "Av. General Paz 158",
      telephone: "3517895623",
      companyName: "",
      email: "",
      dateOfIssue: new Date(2023,1,21,12,25),
      dateOfExpiration: new Date(2023,1,28,12,25),
      stateSaleOrder: "CREATED",
      details : [
        {
          idProduct : 25,
          name: "Mecha para chapa n°6",
          idSaleOrderDetails:154561890,
          price : 500,
          quantity : 1,
          stateSaleOrderDetail : "CREATED",
        }
      ]
    },
    {
      idSaleOrder: 1561549891,
      idSeller: 2,
      nameSeller: "Martín Pérez",
      idClient: 3,
      nameClient: "Luisa Farías",
      address: "Av. General Paz 158",
      telephone: "3517895623",
      companyName: "",
      email: "",
      dateOfIssue: new Date(2023,1,28,15,28),
      dateOfExpiration: new Date(2023,2,5,15,28),
      stateSaleOrder: "PENDING_DELIVERY",
      details : [
        {
          idProduct : 18,
          name: "Amoladora XS28",
          idSaleOrderDetails:154561891,
          price : 58600,
          quantity : 1,
          stateSaleOrderDetail : "RESERVED",
        }
      ]
    },
    {
      idSaleOrder: 1561549892,
      idSeller: 3,
      nameSeller: "Juan Pérez",
      idClient: 1,
      nameClient: "Constanza Carranza",
      address: "Av. General Paz 158",
      telephone: "3517895623",
      companyName: "",
      email: "",
      dateOfIssue: new Date(2023,2,15,13,52),
      dateOfExpiration: new Date(2023,2,25,13,52),
      stateSaleOrder: "DELIVERED",
      details : [
        {
          idProduct : 53,
          name: "Escalera aluminio 6 peldaños",
          idSaleOrderDetails:154561892,
          price : 27469,
          quantity : 1,
          stateSaleOrderDetail : "DELIVERED",
        }
      ]
    },
    {
      idSaleOrder: 1561549893,
      idSeller: 3,
      nameSeller: "Juan Pérez",
      idClient: 7,
      nameClient: "Juan García",
      address: "Av. General Paz 158",
      telephone: "3517895623",
      companyName: "",
      email: "",
      dateOfIssue: new Date(2023,2,1,11,11),
      dateOfExpiration: new Date(2023,2,8,11,11),
      stateSaleOrder: "UNBILLED",
      details : [
        {
          idProduct : 22,
          name: "Cemento premezcla",
          idSaleOrderDetails:154561893,
          price : 742,
          quantity : 7,
          stateSaleOrderDetail : "RESERVED",
        }
      ]
    },
    {
      idSaleOrder: 1561549894,
      idSeller: 5,
      nameSeller: "Juan Pérez",
      idClient: 6,
      nameClient: "Pamela López",
      address: "Av. General Paz 158",
      telephone: "3517895623",
      companyName: "",
      email: "",
      dateOfIssue: new Date(2023,2,24,15,22),
      dateOfExpiration: new Date(2023,2,28,15,22),
      stateSaleOrder: "UNBILLED",
      details : [
        {
          idProduct : 54,
          name: "Tanza para bordeadora 2mm",
          idSaleOrderDetails:154561894,
          price : 100,
          quantity : 3,
          stateSaleOrderDetail : "RESERVED",
        }
      ]
    },
    {
      idSaleOrder: 1561549895,
      idSeller: 2,
      nameSeller: "Martín Pérez",
      idClient: 8,
      nameClient: "Pablo Peña",
      address: "Av. General Paz 158",
      telephone: "3517895623",
      companyName: "",
      email: "",
      dateOfIssue: new Date(2023,3,2,9,17),
      dateOfExpiration: new Date(2023,3,8,9,17),
      stateSaleOrder: "PENDING_DELIVERY",
      details : [
        {
          idProduct : 20,
          name: "Mecha para chapa n°8",
          idSaleOrderDetails:154561895,
          price : 500,
          quantity : 1,
          stateSaleOrderDetail : "RESERVED",
        }
      ]
    },
    {
      idSaleOrder: 1561549896,
      idSeller: 4,
      nameSeller: "María Alonso",
      idClient: 2,
      nameClient: "Tomás Aranda",
      address: "Av. General Paz 158",
      telephone: "3517895623",
      companyName: "",
      email: "",
      dateOfIssue: new Date(2023,3,14,8,52),
      dateOfExpiration: new Date(2023,3,25,8,52),
      stateSaleOrder: "UNBILLED",
      details : [
        {
          idProduct : 3,
          name: "Arandelas 8mm",
          idSaleOrderDetails:154561896,
          price : 15,
          quantity : 20,
          stateSaleOrderDetail : "RESERVED",
        },
        {
          idProduct : 25,
          name: "Tornillos 8mm",
          idSaleOrderDetails:154561897,
          price : 30,
          quantity : 20,
          stateSaleOrderDetail : "RESERVED",
        },
        {
          idProduct : 87,
          name: "Enduido antihumedad",
          idSaleOrderDetails:154561898,
          price : 2314,
          quantity : 1,
          stateSaleOrderDetail : "RESERVED",
        }
      ]
    },
    {
      idSaleOrder: 1561549897,
      idSeller: 4,
      nameSeller: "María Alonso",
      idClient: 2,
      nameClient: "Tomás Aranda",
      address: "Av. General Paz 158",
      telephone: "3517895623",
      companyName: "",
      email: "",
      dateOfIssue: new Date(2023,3,30,15,1),
      dateOfExpiration: new Date(2023,4,8,15,1),
      stateSaleOrder: "DELIVERED",
      details : [
        {
          idProduct : 33,
          name: "Destornillador eléctrico Black&Decker",
          idSaleOrderDetails:154561899,
          price : 82000,
          quantity : 1,
          stateSaleOrderDetail : "DELIVERED",
        }
      ]
    },
    {
      idSaleOrder: 1561549898,
      idSeller: 5,
      nameSeller: "Juan Pérez",
      idClient: 8,
      nameClient: "Pablo Peña",
      address: "Av. General Paz 158",
      telephone: "3517895623",
      companyName: "",
      email: "",
      dateOfIssue: new Date(2023,4,10,14,13),
      dateOfExpiration: new Date(2023,4,16,14,13),
      stateSaleOrder: "DELIVERED",
      details : [
        {
          idProduct : 54,
          name: "Tanza para bordeadora 2mm",
          idSaleOrderDetails:154561900,
          price : 100,
          quantity : 5,
          stateSaleOrderDetail : "DELIVERED",
        }
      ]
    },
    {
      idSaleOrder: 1561549899,
      idSeller: 4,
      nameSeller: "María Alonso",
      idClient: 7,
      nameClient: "Juan García",
      address: "Av. General Paz 158",
      telephone: "3517895623",
      companyName: "",
      email: "",
      dateOfIssue: new Date(2023,5,2,9,27),
      dateOfExpiration: new Date(2023,5,11,9,27),
      stateSaleOrder: "CREATED",
      details : [
        {
          idProduct : 20,
          name: "Mecha para chapa n°8",
          idSaleOrderDetails:154561901,
          price : 500,
          quantity : 1,
          stateSaleOrderDetail : "CREATED",
        }
      ]
    },
    {
      idSaleOrder: 1561549900,
      idSeller: 3,
      nameSeller: "Juan Pérez",
      idClient: 6,
      nameClient: "Pamela López",
      address: "Av. General Paz 158",
      telephone: "3517895623",
      companyName: "",
      email: "",
      dateOfIssue: new Date(2023,5,12,10,27),
      dateOfExpiration: new Date(2023,5,21,10,27),
      stateSaleOrder: "PENDING_DELIVERY",
      details : [
        {
          idProduct : 20,
          name: "Arena fina",
          idSaleOrderDetails:154561902,
          price : 500,
          quantity : 20,
          stateSaleOrderDetail : "RESERVED",
        },
        {
          idProduct : 21,
          name: "Arena gruesa",
          idSaleOrderDetails:154561903,
          price : 600,
          quantity : 20,
          stateSaleOrderDetail : "RESERVED",
        },
        {
          idProduct : 22,
          name: "Cemento premezcla",
          idSaleOrderDetails:154561904,
          price : 742,
          quantity : 10,
          stateSaleOrderDetail : "RESERVED",
        }
      ]
    },
    {
      idSaleOrder: 1561549901,
      idSeller: 3,
      nameSeller: "Juan Pérez",
      idClient: 1,
      nameClient: "Constanza Carranza",
      address: "Av. General Paz 158",
      telephone: "3517895623",
      companyName: "",
      email: "",
      dateOfIssue: new Date(2023,5,17,11,33),
      dateOfExpiration: new Date(2023,5,25,11,33),
      stateSaleOrder: "PENDING_DELIVERY",
      details : [
        {
          idProduct : 20,
          name: "Mecha para chapa n°8",
          idSaleOrderDetails:154561905,
          price : 500,
          quantity : 1,
          stateSaleOrderDetail : "RESERVED",
        }
      ]
    },
    {
      idSaleOrder: 1561549902,
      idSeller: 1,
      nameSeller: "Rodolfo Bustos",
      idClient: 2,
      nameClient: "Tomás Aranda",
      address: "Av. General Paz 158",
      telephone: "3517895623",
      companyName: "",
      email: "",
      dateOfIssue: new Date(2023,5,22,16,1),
      dateOfExpiration: new Date(2023,5,27,16,1),
      stateSaleOrder: "PENDING_DELIVERY",
      details : [
        {
          idProduct : 54,
          name: "Tanza para bordeadora 2mm",
          idSaleOrderDetails:154561900,
          price : 100,
          quantity : 4,
          stateSaleOrderDetail : "RESERVED",
        }
      ]
    },
    {
      idSaleOrder: 1561549903,
      idSeller: 4,
      nameSeller: "María ALonso",
      idClient: 6,
      nameClient: "Pamela López",
      address: "Av. General Paz 158",
      telephone: "3517895623",
      companyName: "",
      email: "",
      dateOfIssue: new Date(2023,6,2,16,1),
      dateOfExpiration: new Date(2023,6,9,16,1),
      stateSaleOrder: "PENDING_DELIVERY",
      details : [
        {
          idProduct : 33,
          name: "Destornillador eléctrico Black&Decker",
          idSaleOrderDetails:154561899,
          price : 82000,
          quantity : 1,
          stateSaleOrderDetail : "RESERVED",
        }
      ]
    },
  ];

  listByDoc : SaleOrderOk[] = [
    {
      idSaleOrder: 1561549873,
      idSeller: 4,
      nameSeller: "María Alonso",
      idClient: 2,
      nameClient: "Tomás Aranda",
      address: "Av. General Paz 158",
      telephone: "3517895623",
      companyName: "",
      email: "",
      dateOfIssue: new Date(2023,1,17,16,31),
      dateOfExpiration: new Date(2023,1,23,16,31),
      stateSaleOrder: "PENDING_DELIVERY",
      details : [
        {
          idProduct : 25,
          name: "Mecha para chapa n°6",
          idSaleOrderDetails:154561889,
          price : 500,
          quantity : 1,
          stateSaleOrderDetail : "RESERVED",
        }
      ]
    },
    {
      idSaleOrder: 1561549880,
      idSeller: 4,
      nameSeller: "María Alonso",
      idClient: 2,
      nameClient: "Tomás Aranda",
      address: "Av. General Paz 158",
      telephone: "3517895623",
      companyName: "",
      email: "",
      dateOfIssue: new Date(2023,3,14,8,52),
      dateOfExpiration: new Date(2023,3,25,8,52),
      stateSaleOrder: "UNBILLED",
      details : [
        {
          idProduct : 3,
          name: "Arandelas 8mm",
          idSaleOrderDetails:154561896,
          price : 15,
          quantity : 20,
          stateSaleOrderDetail : "RESERVED",
        },
        {
          idProduct : 25,
          name: "Tornillos 8mm",
          idSaleOrderDetails:154561897,
          price : 30,
          quantity : 20,
          stateSaleOrderDetail : "RESERVED",
        },
        {
          idProduct : 87,
          name: "Enduido antihumedad",
          idSaleOrderDetails:154561898,
          price : 2314,
          quantity : 1,
          stateSaleOrderDetail : "RESERVED",
        }
      ]
    },
    {
      idSaleOrder: 1561549881,
      idSeller: 4,
      nameSeller: "María Alonso",
      idClient: 2,
      nameClient: "Tomás Aranda",
      address: "Av. General Paz 158",
      telephone: "3517895623",
      companyName: "",
      email: "",
      dateOfIssue: new Date(2023,3,30,15,1),
      dateOfExpiration: new Date(2023,4,8,15,1),
      stateSaleOrder: "DELIVERED",
      details : [
        {
          idProduct : 33,
          name: "Destornillador eléctrico Black&Decker",
          idSaleOrderDetails:154561899,
          price : 82000,
          quantity : 1,
          stateSaleOrderDetail : "DELIVERED",
        }
      ]
    },
    {
      idSaleOrder: 1561549886,
      idSeller: 1,
      nameSeller: "Rodolfo Bustos",
      idClient: 2,
      nameClient: "Tomás Aranda",
      address: "Av. General Paz 158",
      telephone: "3517895623",
      companyName: "",
      email: "",
      dateOfIssue: new Date(2023,5,22,16,1),
      dateOfExpiration: new Date(2023,5,27,16,1),
      stateSaleOrder: "PENDING_DELIVERY",
      details : [
        {
          idProduct : 54,
          name: "Tanza para bordeadora 2mm",
          idSaleOrderDetails:154561900,
          price : 100,
          quantity : 4,
          stateSaleOrderDetail : "RESERVED",
        }
      ]
    },
  ];

  listByState : SaleOrderOk[] = [
    {
      idSaleOrder: 1561549875,
      idSeller: 2,
      nameSeller: "Rodolfo Bustos",
      idClient: 3,
      nameClient: "Luisa Farías",
      address: "Av. General Paz 158",
      telephone: "3517895623",
      companyName: "",
      email: "",
      dateOfIssue: new Date(2023,1,28,15,28),
      dateOfExpiration: new Date(2023,2,5,15,28),
      stateSaleOrder: "PENDING_DELIVERY",
      details : [
        {
          idProduct : 18,
          name: "Amoladora XS28",
          idSaleOrderDetails:154561891,
          price : 58600,
          quantity : 1,
          stateSaleOrderDetail : "RESERVED",
        }
      ]
    },
    {
      idSaleOrder: 1561549879,
      idSeller: 2,
      nameSeller: "Martín Pérez",
      idClient: 8,
      nameClient: "Pablo Peña",
      address: "Av. General Paz 158",
      telephone: "3517895623",
      companyName: "",
      email: "",
      dateOfIssue: new Date(2023,3,2,9,17),
      dateOfExpiration: new Date(2023,3,8,9,17),
      stateSaleOrder: "PENDING_DELIVERY",
      details : [
        {
          idProduct : 20,
          name: "Mecha para chapa n°8",
          idSaleOrderDetails:154561895,
          price : 500,
          quantity : 1,
          stateSaleOrderDetail : "RESERVED",
        }
      ]
    },
    {
      idSaleOrder: 1561549884,
      idSeller: 3,
      nameSeller: "Juan García",
      idClient: 6,
      nameClient: "Pamela López",
      address: "Av. General Paz 158",
      telephone: "3517895623",
      companyName: "",
      email: "",
      dateOfIssue: new Date(2023,5,12,10,27),
      dateOfExpiration: new Date(2023,5,21,10,27),
      stateSaleOrder: "PENDING_DELIVERY",
      details : [
        {
          idProduct : 20,
          name: "Arena fina",
          idSaleOrderDetails:154561902,
          price : 500,
          quantity : 20,
          stateSaleOrderDetail : "RESERVED",
        },
        {
          idProduct : 21,
          name: "Arena gruesa",
          idSaleOrderDetails:154561903,
          price : 600,
          quantity : 20,
          stateSaleOrderDetail : "RESERVED",
        },
        {
          idProduct : 22,
          name: "Cemento premezcla",
          idSaleOrderDetails:154561904,
          price : 742,
          quantity : 10,
          stateSaleOrderDetail : "RESERVED",
        }
      ]
    },
    {
      idSaleOrder: 1561549885,
      idSeller: 3,
      nameSeller: "Juan García",
      idClient: 1,
      nameClient: "Constanza Carranza",
      address: "Av. General Paz 158",
      telephone: "3517895623",
      companyName: "",
      email: "",
      dateOfIssue: new Date(2023,5,17,11,33),
      dateOfExpiration: new Date(2023,5,25,11,33),
      stateSaleOrder: "PENDING_DELIVERY",
      details : [
        {
          idProduct : 20,
          name: "Mecha para chapa n°8",
          idSaleOrderDetails:154561905,
          price : 500,
          quantity : 1,
          stateSaleOrderDetail : "RESERVED",
        }
      ]
    },
    {
      idSaleOrder: 1561549886,
      idSeller: 1,
      nameSeller: "Rodolfo Bustos",
      idClient: 2,
      nameClient: "Tomás Aranda",
      address: "Av. General Paz 158",
      telephone: "3517895623",
      companyName: "",
      email: "",
      dateOfIssue: new Date(2023,5,22,16,1),
      dateOfExpiration: new Date(2023,5,27,16,1),
      stateSaleOrder: "PENDING_DELIVERY",
      details : [
        {
          idProduct : 54,
          name: "Tanza para bordeadora 2mm",
          idSaleOrderDetails:154561900,
          price : 100,
          quantity : 4,
          stateSaleOrderDetail : "RESERVED",
        }
      ]
    },
    {
      idSaleOrder: 1561549887,
      idSeller: 4,
      nameSeller: "María Alonso",
      idClient: 6,
      nameClient: "Pamela López",
      address: "Av. General Paz 158",
      telephone: "3517895623",
      companyName: "",
      email: "",
      dateOfIssue: new Date(2023,6,2,16,1),
      dateOfExpiration: new Date(2023,6,9,16,1),
      stateSaleOrder: "PENDING_DELIVERY",
      details : [
        {
          idProduct : 33,
          name: "Destornillador eléctrico Black&Decker",
          idSaleOrderDetails:154561899,
          price : 82000,
          quantity : 1,
          stateSaleOrderDetail : "RESERVED",
        }
      ]
    }
  ];

  saleToBill : SaleOrderApi = {
    
    id_sale_order: 1561549904,
    id_seller: 4,
    id_client: 2,
    company_name : "",
    telephone:"3515605118",
    email:"tomiaranda@gmail.com",
    address:"Uritorco 4813",
    first_name_seller:"Ignacio",
    last_name_seller:"Prado",
    first_name_client: "Tomás",
    last_name_client:"Aranda",
    date_of_issue: [2023,11,20],
    date_of_expiration: [2023,11,20],
    state_sale_order: "CREATED",
    detail_sales_order : [
      {
        id_product : 47,
        name: "Amoladora Angular Versa Pro 2400 W 230 Mm Ferreteria Express",
        id_sale_order_details:154561900,
        price : 13550,
        quantity : 1,
        state_sale_order_detail : "RESERVED",
      }
    ]
  }
  

  constructor() { }

  onShowList() {
    return this.salesOrderList;
  }
  onShowByDoc() {
    return this.listByDoc;
  }

  onShowByState() {
    return this.listByState;
  }
  onSaleToBill() {
    return this.saleToBill;
  }
}
