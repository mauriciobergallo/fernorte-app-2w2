import { Injectable } from '@angular/core';
import { Section } from '../models/locations/section';
import { Zone } from '../models/locations/zone';
import { Space } from '../models/locations/space';

@Injectable({
  providedIn: 'root',
})
export class LocationService {
  unidades: string[] = ['Unidad', 'Kg', 'Metros Cuadrados', 'Litros'];
  mockZones: Zone[] = [
    {
      Id: 1,
      name: 'Zona A',
      maxCapacity: 100,
      mts2: 500,
      sections: [
        {
          Id: 101,
          name: 'AC',
          categoryName: 'Sección 1',
          maxCapacity: 30,
          spaces: [
            {
              Id: 1001,
              name: 'Espacio 1-1',
              quantity: 10,
              measureUnit: 'metros cuadrados',
              maxCapacity: 15,
              productId: 201,
              productName: 'Producto X',
              remarks: 'Este espacio es para eventos pequeños',
            },
            // Agrega más espacios según sea necesario
          ],
        },
        // Agrega más secciones según sea necesario
      ],
    },
    {
      Id: 2,
      name: 'Zona B',
      maxCapacity: 150,
      mts2: 300,
      sections: [
        {
          Id: 102,
          name: 'AB',
          categoryName: 'Sección 2',
          maxCapacity: 50,
          spaces: [
            {
              Id: 1002,
              name: 'Espacio 2-1',
              quantity: 20,
              measureUnit: 'metros cuadrados',
              maxCapacity: 25,
              productId: 202,
              productName: 'Producto Y',
              remarks: 'Este espacio es para conferencias',
            },
            // Agrega más espacios según sea necesario
          ],
        },
        // Agrega más secciones según sea necesario
      ],
    },
    {
      Id: 1,
      name: 'Zona A',
      maxCapacity: 100,
      mts2: 500,
      sections: [
        {
          Id: 101,
          name: 'AG',
          categoryName: 'Sección 1',
          maxCapacity: 30,
          spaces: [
            {
              Id: 1001,
              name: 'Espacio 1-1',
              quantity: 10,
              measureUnit: 'metros cuadrados',
              maxCapacity: 15,
              productId: 201,
              productName: 'Producto X',
              remarks: 'Este espacio es para eventos pequeños',
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
