import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  unidades: string[] = ['Unidad', 'Kg', 'Metros Cuadrados', 'Litros'];

  ubicaciones: { zona: string, seccion: string, posicion: string }[] = [
    { zona: 'Patio', seccion: 'A-1 Herramientas eléctricas', posicion: 'Posición 1' },
    { zona: 'Patio', seccion: 'A-1 Herramientas eléctricas', posicion: 'Posición 2' },
    { zona: 'Patio', seccion: 'A-2 Bulonería', posicion: 'Posición 3' },
    { zona: 'Patio', seccion: 'A-2 Bulonería', posicion: 'Posición 4' },
    { zona: 'Nave', seccion: 'A-3 Cables', posicion: 'Posición 5' },
    { zona: 'Nave', seccion: 'A-3 Cables', posicion: 'Posición 6' },
    { zona: 'Salón', seccion: 'B-1 Alambres', posicion: 'Posición 7' },
    { zona: 'Salón', seccion: 'B-1 Alambres', posicion: 'Posición 8' }
  ];

  productos: string[] = ['Producto 1', 'Producto 2', 'Producto 3'];

  getSeccionesPorZona(zona: string): string[] {
    const secciones = this.ubicaciones
      .filter(ubicacion => ubicacion.zona === zona)
      .map(ubicacion => ubicacion.seccion);
    return [...new Set(secciones)]; // Eliminar duplicados
  }

  getPosicionesPorSeccion(seccion: string): string[] {
    const posiciones = this.ubicaciones
      .filter(ubicacion => ubicacion.seccion === seccion)
      .map(ubicacion => ubicacion.posicion);
    return [...new Set(posiciones)]; // Eliminar duplicados
  }

  constructor() { }
}
