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
                          d.received_quantity,
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
                  });
                },
                error: (error: Error) => {
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
  addComment(detailId: number) {}
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
            alert('Operación exitosa');
            this.router.navigate(['inventory', 'reception-orders']);
          },
          error: (error: Error) => {
            alert(error.message);
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
