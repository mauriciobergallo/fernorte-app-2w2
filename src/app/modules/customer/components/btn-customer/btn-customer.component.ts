import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TurnService } from '../../services/turn.service';

@Component({
  selector: 'fn-btn-customer',
  templateUrl: './btn-customer.component.html',
  styleUrls: ['./btn-customer.component.css']
})
export class BtnCustomerComponent implements OnInit {
  clientform: FormGroup;

  @Output() back = new EventEmitter<void>();

  documentNumber: string = "";
  clientNotRegistered: boolean = false;
  Main:boolean = true;
  numberTurn: Number = 0;

  constructor(private formBuilder: FormBuilder,private turnService: TurnService) {
    this.clientform = this.formBuilder.group({
      document: ['', [Validators.required]]
  });}

  onSubmit() {
    const document = this.clientform.get('document');

    if (document?.value !== '123456') {
      this.clientNotRegistered = true;
    } else {
      this.turnService.postData().subscribe((response: any) => {
        this.numberTurn = response;});
      this.Main = false;
      console.log(this.numberTurn);
    }
  }

  ngOnInit() {
    setTimeout(() => {
      this.returnToMainPage();
    }, 15000); 
  }

  returnToMainPage() {
    this.back.emit();
  }
}
