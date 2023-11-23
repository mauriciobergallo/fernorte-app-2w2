import { Component, OnInit, ViewChild, ComponentRef } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { TaxService } from '../../services/tax/tax.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Tax } from '../../models/TaxModel';
import Swal from 'sweetalert2';

@Component({
  selector: 'fn-tax-register',
  templateUrl: './tax-register.component.html',
  styleUrls: ['./tax-register.component.css']
})
export class TaxRegisterComponent implements OnInit {
  tax: Tax = {id:0,tax_value:0,tax_type:""};
  // taxList: Tax[] = [];
  taxForm: FormGroup;
  // taxEditForm: FormGroup;
  // isFormDisabled: boolean = true;

  taxTypeList: string[] = ["VAT", "IIBB"];

  constructor(
    private taxService: TaxService,
    private formBuilder: FormBuilder,
  ) {
    this.taxForm = this.formBuilder.group({
      taxType: ['', Validators.required],
      taxValue: [0, [Validators.required, Validators.min(0)]],
    });
  }

  ngOnInit(): void {
  }

  
  saveNewTax() {

    if (this.taxForm && this.taxForm.valid) {
      let newTax: Tax = {
        id: 0,
        tax_type: this.taxForm.get('taxType')?.value || '',
        tax_value: this.taxForm.get('taxValue')?.value || 0
      };
  
      console.log(this.taxForm.value)
      this.taxService.createTax(newTax).subscribe({
        next: (methods) => {
          this.taxForm.reset();
          Swal.fire({
            title: "Agregado exitoso!",
            text: "El impuesto fue agregado exitosamente!",
            icon: "success"
          });
        },
        error: (err) => {
          alert("error");
        }
      });
    }
  }
}