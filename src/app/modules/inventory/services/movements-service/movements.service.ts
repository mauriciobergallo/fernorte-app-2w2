import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, map, of, throwError } from 'rxjs';
import { IMovementDto } from '../../models/IMovementDto';
import { Pagination } from '../../models/pagination';
import { MovementType } from '../../models/IMovementTypeEnum';

export interface ReqNewMovementDto {
  operator_name: string; // Long in Java is typically represented as a number in TypeScript
  movement_type:MovementType | null; // Assuming MovementType is defined elsewhere
  //operator_id: number; // Long in Java is typically represented as a number in TypeScript
  
  is_internal: boolean;
  movement_details: NewDetailMovementDto[];
  remarks: string;
}

export interface NewDetailMovementDto {
  location_origin_id?: number;
  location_destination_id?: number;
  quantity: number; // Assuming BigDecimal is represented as a number
  product_id: number;
}

@Injectable({
  providedIn: 'root',
})
export class MovementsService {

  private movimientoSeleccionado: IMovementDto|undefined;

  seleccionarMovimiento(movimiento: IMovementDto) {
    this.movimientoSeleccionado = movimiento;
  }

  obtenerMovimientoSeleccionado(): IMovementDto | undefined {
    return this.movimientoSeleccionado;
  }

  constructor(private http: HttpClient) {}
  private baseUrl = 'http://localhost:8083/movements';

  getAllMovements(): Observable<IMovementDto[]> {
    return this.http.get<IMovementDto[]>(this.baseUrl);
  }

  getPaginationMovements(currentPage: number): Observable<Pagination> {
    return this.http.get<Pagination>(this.baseUrl + '/page/' + currentPage);
  }

  newMovement(mov: ReqNewMovementDto): Observable<Boolean> {
    return this.http.post<ReqNewMovementDto>(this.baseUrl, mov).pipe(
      map((res) => {
        return true;
      }),
      catchError((error) => {
        if (error.status === 400) {
          console.log('error', error);
          return of(false);
        }
        return throwError(
          () => new Error('Algo salió mal al crear el movimiento')
        );
      })
    );
  }

  updateMovement(mov:ReqNewMovementDto,id:number): Observable<Boolean>{
    return this.http.put<ReqNewMovementDto>(this.baseUrl+'/'+id, mov).pipe(
      map(res => {
        return true;
      }),
      catchError(error => {
        if (error.status === 400) {
          console.log('error',error)
          return of(false);
        }
        return throwError(() => new Error('Algo salió mal al crear el movimiento'));
      })
    );
  }
}
