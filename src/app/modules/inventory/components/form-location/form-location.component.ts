import { Component, OnInit } from '@angular/core';
import { LocationService } from '../../services/location.service'

@Component({
  selector: 'fn-form-location',
  templateUrl: './form-location.component.html',
  styleUrls: ['./form-location.component.css']
})
export class FormLocationComponent implements OnInit {

  unidades: string[] = [];
  productos: string[] = [];
  zonas: string[] = [];
  ubicaciones: { zona: string, seccion: string, posicion: string }[] = [];

  seccionesFiltradas: string[] = [];
  posicionesFiltradas: string[] = [];
  

  zonaSeleccionada: string = '';
  posicionSeleccionada: string = '';
  seccionSeleccionada: string = '';

  seccionesHabilitadas = {
    zona: true,
    secciones: false,
    posiciones: false,
    codigo: false
  };

  constructor(public locationService: LocationService) {
    this.unidades = this.locationService.unidades;
    this.productos = this.locationService.productos;
    this.ubicaciones = this.locationService.ubicaciones;
    console.log('Ubicaciones:', locationService.ubicaciones);
    console.log('Unidades:', locationService.unidades);
    console.log('Productos:', locationService.productos);
  }

  toggleSeccionZona() {
    this.seccionesHabilitadas.zona = false;
    this.seccionesHabilitadas.secciones = true;
    this.seccionesFiltradas = this.locationService.getSeccionesPorZona(this.zonaSeleccionada);
  }

  toggleSeccionSecciones() {
    this.seccionesHabilitadas.secciones = false;
    this.seccionesHabilitadas.posiciones = true;
  }

  toggleSeccionPosiciones() {
    this.seccionesHabilitadas.posiciones = false;
    this.seccionesHabilitadas.codigo = true;
  }

  toggleSeccionCodigo() {
    this.seccionesHabilitadas.codigo = false;
  }

  seleccionarZona(zona: string) {
    this.zonaSeleccionada = zona;
    this.zonas = this.locationService.getSeccionesPorZona(this.zonaSeleccionada);
    this.seccionesHabilitadas = {
      zona: false,
      secciones: true,
      posiciones: false,
      codigo: false
    };
    this.seccionesFiltradas = this.locationService.getSeccionesPorZona(this.zonaSeleccionada);
  }

  seleccionarSeccion(seccion: string) {
    this.seccionSeleccionada = seccion;
    this.posicionesFiltradas = this.locationService.getPosicionesPorSeccion(this.seccionSeleccionada);
    this.seccionesHabilitadas = {
      zona: false,
      secciones: false,
      posiciones: true,
      codigo: false
    };
  }

  seleccionarPosicion(posicion: string) {
    this.posicionSeleccionada = posicion; 
  }

  volverAtras(seccionActual: string) {
    switch (seccionActual) {
      case 'secciones':
        this.seccionesHabilitadas.zona = true;
        this.seccionesHabilitadas.secciones = false;
        break;
      case 'posiciones':
        this.seccionesHabilitadas.secciones = true;
        this.seccionesHabilitadas.posiciones = false;
        break;
      case 'codigo':
        this.seccionesHabilitadas.posiciones = true;
        this.seccionesHabilitadas.codigo = false;
        break;
      default:
        // Si se hace clic en el botón en la sección Zonas, no hay sección anterior
        break;
    }
  }

  ngOnInit(): void {
  }

}

