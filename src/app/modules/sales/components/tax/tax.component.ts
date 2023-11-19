import { Component, OnInit } from '@angular/core';
import { Tax, TaxEmpty } from '../../models/Tax';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TaxService } from '../../services/tax/tax.service';
import { BootstrapOptions } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';


@Component({
  selector: 'fn-tax',
  templateUrl: './tax.component.html',
  styleUrls: ['./tax.component.css']
})
export class TaxComponent implements OnInit {
  tax: Tax = TaxEmpty;
  taxEdit: Tax = TaxEmpty;
  taxList: Tax[] = [];
  taxEditForm: FormGroup;
  isFormDisabled: boolean = true;

  taxTypeList: string[] = ["VAT", "IIBB"];


  constructor(private taxService: TaxService, private formBuilder: FormBuilder) {

    this.taxEditForm = this.formBuilder.group({
      taxType: ['', Validators.required],
      taxValue: [0, [Validators.required, Validators.min(0)]],
    });
  }

  ngOnInit(): void {
    this.loadTax();
  }



  loadTax() {
    this.taxService.getTaxList().subscribe({
      next:(tax) => {
        this.taxList= tax;
        console.log("payment Methods: ", tax)
      },
      error:(err)=>{
        alert("error")
      }
    })
  }
  

  updateTax() {
    if (this.taxEditForm && this.taxEditForm.valid)
      this.taxService.updateTax(this.taxEdit).subscribe({
      next:(tax) => {
        console.log('tax actualizada:', tax);
        this.loadTax();
        this.taxEditForm.get('taxType')?.setValue('');
        this.taxEditForm.get('taxValue')?.setValue(0);
        this.taxEdit = { id: 0, tax_type: '', tax_value: 0 };
        Swal.fire({
          title: "Actualización exitosa!",
          text: "El impuesto fue actualizado exitosamente!",
          icon: "success"
        });
      },
      error:(err)=>{
        Swal.fire({
          title: "Error!",
          text: "Debe contactarse con soporte",
          icon: "success"
        });
      }
    })
  }
  
  loadTaxList(tax: Tax) {
    console.log("tax selec", tax)
    this.taxEdit.id = tax.id;
    this.taxEdit.tax_type = tax.tax_type;
    this.taxEdit.tax_value = tax.tax_value;
    this.taxEditForm.get('taxType')?.setValue(this.taxEdit.tax_type);
    this.taxEditForm.get('taxValue')?.setValue(this.taxEdit.tax_value);
    
  }
}
