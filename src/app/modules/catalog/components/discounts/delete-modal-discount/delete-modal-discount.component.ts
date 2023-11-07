import { Component, Input } from '@angular/core';
import { IDiscount } from '../../../models/IDiscounts';
import { DiscountsService } from '../../../services/discounts.service';
import { NgbActiveModal ,NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'fn-delete-modal-discount',
  templateUrl: './delete-modal-discount.component.html',
  styleUrls: ['./delete-modal-discount.component.css']
})
export class DeleteModalDiscountComponent {
  @Input() discount?: IDiscount | null = null;
  isLoading: boolean = false;
  ngbModal: NgbModal

  constructor(_ngbModal: NgbModal, private disService: DiscountsService, private modalService: NgbActiveModal) { 
    this.ngbModal = _ngbModal;
  }

onSubmit(){
  this.isLoading = true;

  this.disService.deleteDiscounts(Number(this.discount?.id_discount), 'usuario').subscribe((res) => {
    this.isLoading = false;
    this.modalService.close(res)
  })
}

close(){
  this.modalService.close();
}
  
}
