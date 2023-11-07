import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-view-image-product',
  templateUrl: './view-image-product.component.html',
  styleUrls: ['./view-image-product.component.css']
})
export class ViewImageProductComponent implements OnInit {

  @Input() imageUrl!: string;

  constructor() { }

  ngOnInit() {
  }

}
