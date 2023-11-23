import { Injectable } from '@angular/core';
import { LocationInfoDto } from '../models/location-info.interface';
import { Zone } from '../models/locations/zone';
import { Section } from '../models/locations/section';
import { Space } from '../models/locations/space';
@Injectable({
  providedIn: 'root',
})
export class LocationService {
  locMockData: LocationInfoDto[] = [];
  getmockloc() {
    return this.locMockData;
  }
  unidades: string[] = ['Unidad', 'Kg', 'Metros Cuadrados', 'Litros'];
  mockZones: Zone[] = [
    {
      Id: 1,
      name: 'Salón Principal',
      maxCapacity: 200,
      mts2: 800,
      sections: [
        {
          Id: 101,
          name: 'Herramientas Manuales',
          categoryName: 'Herramientas manuales',
          maxCapacity: 40,
          spaces: [
            {
              Id: 1001,
              name: 'Banco de trabajo 1',
              quantity: 15,
              measureUnit: 'metros cuadrados',
              maxCapacity: 20,
              productId: 201,
              productName: 'Calibre Digital 1150d',
              remarks: 'Este espacio es para herramientas manuales pequeñas',
            },
            {
              Id: 1002,
              name: 'Área de Medición',
              quantity: 25,
              measureUnit: 'metros cuadrados',
              maxCapacity: 30,
              productId: 202,
              productName: 'Juego de llaves Allen',
              remarks: 'Este espacio es para herramientas de medición',
            },
            // Agrega más espacios según sea necesario
          ],
        },
        {
          Id: 102,
          name: 'Herramientas Eléctricas',
          categoryName: 'Herramientas eléctricas',
          maxCapacity: 50,
          spaces: [
            {
              Id: 1003,
              name: 'Estación de Soldadura',
              quantity: 30,
              measureUnit: 'metros cuadrados',
              maxCapacity: 35,
              productId: 203,
              productName: 'Soldadora MIG',
              remarks:
                'Este espacio es para herramientas eléctricas de soldadura',
            },
            {
              Id: 1004,
              name: 'Área de Taladros',
              quantity: 20,
              measureUnit: 'metros cuadrados',
              maxCapacity: 25,
              productId: 204,
              productName: 'Taladro Percutor',
              remarks:
                'Este espacio es para herramientas eléctricas de perforación',
            },
            // Agrega más espacios según sea necesario
          ],
        },
        // Agrega más secciones según sea necesario
      ],
    },
    {
      Id: 2,
      name: 'Almacén',
      maxCapacity: 300,
      mts2: 600,
      sections: [
        {
          Id: 103,
          name: 'Materiales de Construcción',
          categoryName: 'Materiales de construcción',
          maxCapacity: 70,
          spaces: [
            {
              Id: 1005,
              name: 'Área de Ladrillos',
              quantity: 50,
              measureUnit: 'metros cuadrados',
              maxCapacity: 60,
              productId: 205,
              productName: 'Ladrillo Cerámico',
              remarks: 'Este espacio es para almacenar ladrillos',
            },
            {
              Id: 1006,
              name: 'Estantería de Cemento',
              quantity: 20,
              measureUnit: 'metros cuadrados',
              maxCapacity: 30,
              productId: 206,
              productName: 'Cemento Portland',
              remarks: 'Este espacio es para almacenar bolsas de cemento',
            },
            // Agrega más espacios según sea necesario
          ],
        },
        // Agrega más secciones según sea necesario
      ],
    },
    {
      Id: 3,
      name: 'Patio de Herramientas',
      maxCapacity: 150,
      mts2: 400,
      sections: [
        {
          Id: 104,
          name: 'Herramientas de Jardín',
          categoryName: 'Herramientas de jardín',
          maxCapacity: 30,
          spaces: [
            {
              Id: 1007,
              name: 'Área de Podadoras',
              quantity: 15,
              measureUnit: 'metros cuadrados',
              maxCapacity: 20,
              productId: 207,
              productName: 'Podadora Eléctrica',
              remarks: 'Este espacio es para herramientas eléctricas de poda',
            },
            {
              Id: 1008,
              name: 'Estación de Riego',
              quantity: 15,
              measureUnit: 'metros cuadrados',
              maxCapacity: 20,
              productId: 208,
              productName: 'Manguera de Jardín',
              remarks: 'Este espacio es para herramientas de riego',
            },
            // Agrega más espacios según sea necesario
          ],
        },
        // Agrega más secciones según sea necesario
      ],
    },
    // Agrega más zonas según sea necesario
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

  insertDataMocked() {
    for (const zona of this.mockZones) {
      for (const section of zona.sections) {
        for (const space of section.spaces) {
          this.locMockData.push({
            location: {
              space: space.name,
              zone: zona.name,
              section: section.name,
            },
            location_id: Math.floor(Math.random() * 30),
            category_name: section.categoryName,
            product_name: space.productName,
            quantity: space.quantity,
            measure_unit: 1,
            max_capacity: space.maxCapacity,
          });
        }
      }
    }
  }

  insertSpace(idZona: number, idSection: number, space: Space) {
    var zona = this.mockZones.find((p) => p.Id == idZona);
    if (zona != undefined) {
      var section = zona.sections.find((p) => p.Id == idSection);
      if (section != undefined) {
        section.spaces.push(space);
        this.locMockData.push({
          location: {
            space: space.name,
            zone: zona.name,
            section: section.name,
          },
          location_id: Math.floor(Math.random() * 30),
          category_name: section.categoryName,
          product_name: space.productName,
          quantity: 0,
          measure_unit: 1,
          max_capacity: space.maxCapacity,
        });
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
  constructor() {
    this.insertDataMocked();
  }
}
