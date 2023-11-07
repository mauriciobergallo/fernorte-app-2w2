import { Component, Input, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-view-image-product',
  templateUrl: './view-image-product.component.html',
  styleUrls: ['./view-image-product.component.css']
})
export class ViewImageProductComponent implements OnInit {

  @Input() imageUrl!: string;
  modalService:NgbModal
  constructor( private _modalService:NgbModal) { 
    this.modalService = _modalService;
  }

  ngOnInit() {
  }

}
