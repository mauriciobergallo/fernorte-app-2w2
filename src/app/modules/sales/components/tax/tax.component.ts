import { Component, OnInit } from '@angular/core';
import { Tax, TaxEmpty } from '../../models/Tax';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TaxService } from '../../services/tax/tax.service';
import { BootstrapOptions } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


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
myModalEl = document.getElementById('NewMethodModal')

openModal() {
  const modalRef = this.modalService.open('NewMethodModal', { size: 'lg' });  // Ajusta el nombre y tamaño según corresponda
  // Puedes realizar acciones adicionales después de abrir el modal si es necesario
  modalRef.result.then(
    (result) => {
      console.log(`Modal cerrado con resultado: ${result}`);
      // Aquí puedes manejar el resultado después de cerrar el modal
    },
    (reason) => {
      console.log(`Modal cerrado con motivo: ${reason}`);
      // Aquí puedes manejar la razón por la que se cerró el modal
    }
  );
}


  constructor(private taxService: TaxService, private formBuilder: FormBuilder,private modalService: NgbModal) {

    this.taxEditForm = this.formBuilder.group({
      taxType: ['', Validators.required],
      taxValue: [0, [Validators.required, Validators.min(0)]],
    });
  }

  ngOnInit(): void {
    this.loadTax();
  }

saveNewTax() {
  if (this.taxEditForm && this.taxEditForm.valid) {
    this.tax = {
      id: 0,
      tax_type: this.taxEditForm.get('taxType')?.value || '',
      tax_value: this.taxEditForm.get('taxValue')?.value || 0
    };

    console.log('Nueva tax a crear:', this.tax);

    this.taxService.createTax(this.tax).subscribe({
      next: (methods) => {
        console.log('Nueva tax creada:', methods);
        this.loadTax();
        this.taxEditForm.reset(); // Esto restablecerá el formulario
      },
      error: (err) => {
        alert("error");
      }
    });
  }
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
      },
      error:(err)=>{
        alert("error")
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
