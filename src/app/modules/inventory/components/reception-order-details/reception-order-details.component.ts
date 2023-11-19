import { Component, OnDestroy, OnInit } from '@angular/core';
import { DeilveryOrder } from '../../models/deilvery-order';
import { BookingServiceService } from '../../services/booking-service/booking-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { IUpdatedDetailDto } from '../../models/receptions-orders/updatedDetailDto.interface';
import { GetReceptionOrderDto } from '../../models/get-reception-order';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  NgForm,
  Validators,
} from '@angular/forms';
import { IUpdateDetailDto } from '../../models/receptions-orders/UpdateDetailDto.interface';
import { IUpdateReceptionOrder } from '../../models/receptions-orders/UpdateReceptionOrderDto.interface';
import { IUpdatedOrderDto } from '../../models/receptions-orders/UpdatedOrderDto.interface';
import Swal from 'sweetalert2';
@Component({
  selector: 'fn-reception-order-details',
  templateUrl: './reception-order-details.component.html',
  styleUrls: ['./reception-order-details.component.css'],
})
export class ReceptionOrderDetailsComponent implements OnInit, OnDestroy {
  orderData: GetReceptionOrderDto | undefined;
  // details: IUpdatedDetailDto[] = [];
  subscriptions: Subscription = new Subscription();
  detailsForm: FormGroup = new FormGroup({});
  newComment: number = -1;
  comment: string = '';
  loading: boolean = false;
  constructor(
    private bookingService: BookingServiceService,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router
  ) {}
  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
  ngOnInit(): void {
    this.loading = true;
    const authData = {
      username: 'aabordon',
      roles: ['ENCARGADO'],
    };
    localStorage.setItem('auth-data', JSON.stringify(authData));
    this.subscriptions.add(
      this.activatedRoute.params.subscribe((params) => {
        this.bookingService.getReceptionOrderById(params['id']).subscribe({
          next: (response: GetReceptionOrderDto) => {
            this.orderData = response;
            let value: string = localStorage.getItem('auth-data') || '';
            const data = JSON.parse(value);
            this.detailsForm = this.fb.group({
              id_reception_order: [this.orderData.id_reception_order],
              received_by: [data.username],
              details: this.fb.array([]),
            });

            this.bookingService
              .getReceptionOrderDetailsById(params['id'])
              .subscribe({
                next: (response: IUpdatedDetailDto[]) => {
                  let detailsFormArray = this.detailsForm.get(
                    'details'
                  ) as FormArray;
                  response.forEach((d) => {
                    detailsFormArray.push(
                      this.fb.group({
                        id_reception_order_detail: [
                          d.id_reception_order_detail,
                        ],
                        agreed_quantity: [d.agreed_quantity],
                        product_name: [d.product_name],
                        received_quantity: [
                          d.agreed_quantity,
                          [
                            Validators.max(d.agreed_quantity),
                            Validators.min(0),
                            Validators.required,
                          ],
                        ],
                        is_broken: [d.is_broken],
                        remarks: [d.remarks || ''],
                      })
                    );
                    this.loading = false;
                  });
                },
                error: (error: Error) => {
                  this.loading = false;
                  alert(error);
                },
              });
          },
          error: (error: Error) => {
            alert(error);
          },
        });
      })
    );
  }
  get details() {
    return this.detailsForm.get('details') as FormArray;
  }
  addComment(detailIndex: number) {
    this.newComment = detailIndex;
    this.comment = this.details
      .get(this.newComment.toString())
      ?.get('remarks')?.value;

    console.log(this.details.get(detailIndex.toString()));
  }
  UpdateComment(commentForm: NgForm) {
    if (commentForm.valid) {
      Swal.fire({
        title: `¿Estás seguro que desea agregar el comentario?`,
        icon: 'question',
        showCancelButton: true,
        cancelButtonColor: '#6c757d',
        confirmButtonColor: '#0d6efd',
        confirmButtonText: 'Aceptar',
        cancelButtonText: 'Cancelar',
      }).then((result) => {
        if (result.isConfirmed) {
          this.details
            .get(this.newComment.toString())
            ?.get('remarks')
            ?.setValue(commentForm.value.comment);
          Swal.fire({
            title: '¡Comentario agregado!',
            icon: 'success',
            confirmButtonText: 'Ok',
            confirmButtonColor: '#0d6efd',
          });
        }
      });
    } else {
      Swal.fire({
        title: `Debe agregar un comentario`,
        icon: 'info',
        confirmButtonColor: '#0d6efd',
        confirmButtonText: 'Volver',
      });
    }
  }
  getStatusText(state: string | undefined): string {
    switch (state) {
      case 'CREATED':
        return 'Creado';
      case 'CONFIRMED':
        return 'Confirmada';
      case 'RECEIVED_INCORRECTLY':
        return 'Parcialmente entregado';
      case 'RECEIVED_CORRECTLY':
        return 'Entregado';
      default:
        return '';
    }
  }
  backHome() {
    Swal.fire({
      title: `¿Desea volver a la lista de órdenes?`,
      icon: 'question',
      showCancelButton: true,
      cancelButtonColor: '#6c757d',
      confirmButtonColor: '#0d6efd',
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.router.navigate(['inventory', 'reception-orders']);
      }
    });
  }
  updateOrder() {
    let updateReceptionOrderDetails = this.createUpdateReceptionOrder(
      this.detailsForm.value as IUpdateReceptionOrder
    );
    console.log(updateReceptionOrderDetails);
    this.subscriptions.add(
      this.bookingService
        .updateReceptionOrder(updateReceptionOrderDetails)
        .subscribe({
          next: (response: IUpdatedOrderDto) => {
            Swal.fire({
              title: '¡Operación exitosa!',
              text: 'La orden ha sido actualizada con exito',
              icon: 'success',
              confirmButtonColor: '#0d6efd',
              confirmButtonText: 'Aceptar',
            });

            this.router.navigate(['inventory', 'reception-orders']);
          },
          error: (error: Error) => {
            Swal.fire({
              title: '¡Error!',
              text: error.message,
              icon: 'error',
              confirmButtonColor: '#0d6efd',
            });
          },
        })
    );
  }
  private createUpdateReceptionOrder(orderData: IUpdateReceptionOrder) {
    let updatedorder: IUpdateReceptionOrder = {
      id_reception_order: orderData.id_reception_order,
      received_by: orderData.received_by,
      details: [],
    };
    orderData.details.forEach((d) => {
      updatedorder.details.push({
        id_reception_order_detail: d.id_reception_order_detail,
        received_quantity: d.received_quantity,
        is_broken: d.is_broken,
        remarks: d.remarks,
      });
    });
    return updatedorder;
  }
}
