import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['../spinner.component.css']
})
export class SpinnerComponent implements OnInit {
@Input() loading: boolean = false;
  constructor() { }

  ngOnInit(): void {
  }

}
