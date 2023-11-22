import { Injectable } from '@angular/core';
import { Section } from '../models/locations/section';
import { Zone } from '../models/locations/zone';
import { Space } from '../models/locations/space';
import { LocationInfoDto } from '../models/location-info.interface';

@Injectable({
  providedIn: 'root',
})
export class LocationService {
  unidades: string[] = ['Unidad', 'Kg', 'Metros Cuadrados', 'Litros'];
  mockZones: Zone[] = [
    {
      Id: 1,
      name: 'SALÓN',
      maxCapacity: 20000,
      mts2: 5000,
      sections: [
        {
          Id: 4,
          name: 'SALON-C',
          categoryName: 'Construcción',
          maxCapacity: 60,
          spaces: [],
        },
        {
          Id: 5,
          name: 'SALON-PA',
          categoryName: 'Pintura y Acabados',
          maxCapacity: 40,
          spaces: [],
        },
        {
          Id: 6,
          name: 'SALON-P',
          categoryName: 'Plomería',
          maxCapacity: 35,
          spaces: [],
        },
        {
          Id: 2,
          name: 'SALON-HM',
          categoryName: 'Herramientas Manuales',
          maxCapacity: 3000,
          spaces: [
            {
              Id: 1,
              name: 'SALON-HM-00001',
              quantity: 10,
              measureUnit: 'Unidades',
              maxCapacity: 500,
              productId: 101,
              productName: 'Destornillador',
              remarks: 'Herramienta manual básica',
            },
            {
              Id: 2,
              name: 'SALON-HM-00002',
              quantity: 15,
              measureUnit: 'Unidades',
              maxCapacity: 25,
              productId: 102,
              productName: 'Martillo',
              remarks: 'Herramienta para golpear',
            },
            {
              Id: 3,
              name: 'SALON-HM-00003',
              quantity: 8,
              measureUnit: 'Unidades',
              maxCapacity: 15,
              productId: 103,
              productName: 'Llave Inglesa',
              remarks: 'Herramienta para apretar tuercas',
            },
            {
              Id: 4,
              name: 'SALON-HM-00004',
              quantity: 5,
              measureUnit: 'Unidades',
              maxCapacity: 10,
              productId: 104,
              productName: 'Sierra Manual',
              remarks: 'Herramienta para cortar',
            },
            {
              Id: 5,
              name: 'SALON-HM-00005',
              quantity: 12,
              measureUnit: 'Unidades',
              maxCapacity: 18,
              productId: 105,
              productName: 'Pinzas',
              remarks: 'Herramienta para sujetar',
            },
          ],
        },
        {
          Id: 3,
          name: 'SALON-HE',
          categoryName: 'Herramientas Eléctricas',
          maxCapacity: 30,
          spaces: [],
        },
        {
          Id: 7,
          name: 'SALON-E',
          categoryName: 'Electricidad',
          maxCapacity: 25,
          spaces: [],
        },
        {
          Id: 8,
          name: 'SALON-J',
          categoryName: 'Jardinería',
          maxCapacity: 30,
          spaces: [],
        },
        {
          Id: 9,
          name: 'SALON-A',
          categoryName: 'Automóviles',
          maxCapacity: 20,
          spaces: [],
        },
        {
          Id: 10,
          name: 'SALON-SC',
          categoryName: 'Seguridad y Cerrajería',
          maxCapacity: 25,
          spaces: [],
        },
        {
          Id: 11,
          name: 'SALON-AO',
          categoryName: 'Almacenamiento y Organización',
          maxCapacity: 30,
          spaces: [],
        },
        // {
        //   Id: 101,
        //   name: 'AC',
        //   categoryName: 'Sección 1',
        //   maxCapacity: 30,
        //   spaces: [
        //     {
        //       Id: 1001,
        //       name: 'Espacio 1-1',
        //       quantity: 10,
        //       measureUnit: 'metros cuadrados',
        //       maxCapacity: 15,
        //       productId: 201,
        //       productName: 'Producto X',
        //       remarks: 'Este espacio es para eventos pequeños',
        //     },
        //     // Agrega más espacios según sea necesario
        //   ],
        // },
        // Agrega más secciones según sea necesario
      ],
    },
    // {
    //   Id: 2,
    //   name: 'Zona B',
    //   maxCapacity: 150,
    //   mts2: 300,
    //   sections: [
    //     {
    //       Id: 102,
    //       name: 'AB',
    //       categoryName: 'Sección 2',
    //       maxCapacity: 50,
    //       spaces: [
    //         {
    //           Id: 1002,
    //           name: 'Espacio 2-1',
    //           quantity: 20,
    //           measureUnit: 'metros cuadrados',
    //           maxCapacity: 25,
    //           productId: 202,
    //           productName: 'Producto Y',
    //           remarks: 'Este espacio es para conferencias',
    //         },
    //         // Agrega más espacios según sea necesario
    //       ],
    //     },
    //     // Agrega más secciones según sea necesario
    //   ],
    // },
    // {
    //   Id: 1,
    //   name: 'Zona A',
    //   maxCapacity: 100,
    //   mts2: 500,
    //   sections: [
    //     {
    //       Id: 101,
    //       name: 'AG',
    //       categoryName: 'Sección 1',
    //       maxCapacity: 30,
    //       spaces: [
    //         {
    //           Id: 1001,
    //           name: 'Espacio 1-1',
    //           quantity: 10,
    //           measureUnit: 'metros cuadrados',
    //           maxCapacity: 15,
    //           productId: 201,
    //           productName: 'Producto X',
    //           remarks: 'Este espacio es para eventos pequeños',
    //         },
    //         // Agrega más espacios según sea necesario
    //       ],
    //     },
    //     // Agrega más secciones según sea necesario
    //   ],
    // },
    // Agrega más zonas según sea necesario
  ];

  locationInfoListMock: LocationInfoDto[] = [
    {
      location: {
        zone: 'Salón',
        section: '1',
        space: '101',
      },
      location_id: 1,
      category_name: 'Herramientas manuales',
      product_name: 'Calibre Digital 1150d',
      quantity: 3,
      measure_unit: 1,
      max_capacity: 5,
    },
    {
      location: {
        zone: 'Nave',
        section: '4',
        space: '202',
      },
      location_id: 2,
      category_name: 'Herramientas eléctricas',
      product_name: 'Amoladora angular 820w',
      quantity: 5,
      measure_unit: 2,
      max_capacity: 50,
    },
    {
      location: {
        zone: 'Patio',
        section: '2',
        space: '201',
      },
      location_id: 3,
      category_name: 'Pavimentación',
      product_name: 'Trompito hormiguero',
      quantity: 8,
      measure_unit: 3,
      max_capacity: 10,
    },
    {
      location: {
        zone: 'Salón',
        section: '3',
        space: '102',
      },
      location_id: 4,
      category_name: 'Ferretería general',
      product_name: 'Escalera telescópica Philco 13 escalones',
      quantity: 15,
      measure_unit: 1,
      max_capacity: 150,
    },
    {
      location: {
        zone: 'Patio',
        section: '1',
        space: '201',
      },
      location_id: 5,
      category_name: 'Pavimentación',
      product_name: 'Mezclador pintura/cemento Einhell Tc-mx 1200',
      quantity: 20,
      measure_unit: 2,
      max_capacity: 200,
    },
    {
      location: {
        zone: 'Patio',
        section: '2',
        space: '202',
      },
      location_id: 6,
      category_name: 'Accesorioes vehiculares',
      product_name: 'Tuercas bulones antirrobo McGard Onix Prisma Spin',
      quantity: 7,
      measure_unit: 3,
      max_capacity: 70,
    },
  ];
  
  getZones() {
    return this.mockZones;
  }

  insertZone(zona: Zone) {
    this.mockZones.push(zona);
  }

  insertSection(idZona: number, section: Section) {
    var zona = this.mockZones.find((p) => p.Id == idZona);
    if (zona != undefined) {
      zona.sections.push(section);
    }
  }

  insertSpace(idZona: number, idSection: number, space: Space) {
    var zona = this.mockZones.find((p) => p.Id == idZona);
    if (zona != undefined) {
      var section = zona.sections.find((p) => p.Id == idSection);
      if (section != undefined) {
        section.spaces.push(space);
      }
    }
  }

  update(idZona: number, idSection: number, space: Space) {
    const zona = this.mockZones.find((p) => p.Id === idZona);

    if (zona) {
      const section = zona.sections.find((p) => p.Id === idSection);

      if (section) {
        const index = section.spaces.findIndex((s) => s.Id === space.Id);

        if (index !== -1) {
          // Update the existing space
          section.spaces[index] = space;
        } else {
          // Space not found, you may want to handle this case based on your requirements
          console.error(`Space with ID ${space.Id} not found.`);
        }
      }
    }
  }

  removeZone(zona: Zone) {
    var myIndex = this.mockZones.indexOf(zona);

    this.mockZones.splice(myIndex, 1);
  }

  removeSection(idZona: number, section: Section) {
    var zona = this.getZoneById(idZona);

    var myIndex = zona.sections.indexOf(section);

    zona.sections.splice(myIndex, 1);
  }

  removeSpace(idZona: number, sectionId: number, space: Space) {
    var zona = this.getZoneById(idZona);
    if (zona != undefined) {
      var section = this.getSectionById(idZona, sectionId);
      if (section != undefined) {
        var myIndex = section.spaces.indexOf(space);
        section.spaces.splice(myIndex, 1);
      }
    }
  }

  getZoneById(id: number): Zone {
    var zonas = this.mockZones.find((p) => p.Id == id);
    if (zonas != undefined) {
      return zonas;
    } else {
      var zone: Zone = {
        Id: 0,
        name: '',
        maxCapacity: 0,
        mts2: 0,
        sections: [],
      };
      return zone;
    }
  }

  getSectionById(idZone: number, idSpace: number): Section {
    var section = this.mockZones
      .find((p) => p.Id === idZone)
      ?.sections.find((p) => p.Id === idSpace);
    if (section != undefined) {
      return section;
    } else {
      var zone: Section = {
        Id: 0,
        name: '',
        categoryName: '',
        maxCapacity: 0,
        spaces: [],
      };
      return zone;
    }
  }
  constructor() {}
}
