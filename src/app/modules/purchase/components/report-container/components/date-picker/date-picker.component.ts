import {
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  NgbCalendar,
  NgbDate,
  NgbDateParserFormatter,
} from '@ng-bootstrap/ng-bootstrap';
import { ReportsServiceService } from '../../service/reports-service.service';
import { BehaviorSubject } from 'rxjs';
import { SupliersService } from '../../../supplier/services/supliers.service';
import { ISupplier } from 'src/app/modules/purchase/models/ISuppliers';
import Swal from 'sweetalert2';

@Component({
  selector: 'fn-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.css'],
})
export class DatePickerComponent implements OnInit {

  @Input() tab = new BehaviorSubject<string>("COMPRA");

  // Filters
  rangeForm: FormGroup = new FormGroup({});
  rangeValue: number = 0;
  supplierName!: string;
  formGroup!: FormGroup;
  fromDate!: Date | null;
  toDate!: Date | null;
  suppliers: ISupplier[] = [{
    id: 1,
    socialReason: "Razon social 1",
    fantasyName: "Fantasia 1",
    cuit: "20323730009",
    adress: "Direccion 1",
    active: true,
  },
  {
    id: 2,
    socialReason: "Razon social 2",
    fantasyName: "Fantasia 2",
    cuit: "20323730009",
    adress: "Direccion 2",
    active: true,
  },
  {
    id: 3,
    socialReason: "Razon social 3",
    fantasyName: "Fantasia 3",
    cuit: "20323730009",
    adress: "Direccion 3",
    active: true,
  },
  {
    id: 4,
    socialReason: "Razon social 4",
    fantasyName: "Fantasia 4",
    cuit: "20323730009",
    adress: "Direccion 4",
    active: true,
  },
  {
    id: 5,
    socialReason: "Razon social 5",
    fantasyName: "Fantasia 5",
    cuit: "20323730009",
    adress: "Direccion 5",
    active: true,
  }]

  constructor(
    private calendar: NgbCalendar,
    public formatter: NgbDateParserFormatter,
    private formBuilder: FormBuilder,
    private reportsService: ReportsServiceService,
    private suppliersService: SupliersService,
  ) {}

  ngOnInit(): void {
    this.rangeForm = this.formBuilder.group({
      rangeInput: [0],
    });
    this.rangeForm.get('rangeInput')?.valueChanges.subscribe((value) => {
      this.rangeValue = value;
    });

    //this.suppliersService.getSupliers().subscribe((suppliers: ISupplier[]) => this.suppliers = suppliers);

    this.formGroup = this.formBuilder.group({
      dpToDate: [null, [Validators.required]],
    });

  }

  validateInput(currentValue: NgbDate | null, input: string): NgbDate | null {
    const parsed = this.formatter.parse(input);
    return parsed && this.calendar.isValid(NgbDate.from(parsed))
      ? NgbDate.from(parsed)
      : currentValue;
  }

  applyFilters() {
    let supplierId = 0;
    if (this.supplierName) {
      supplierId = this.suppliers.filter(supplier => supplier.fantasyName === this.supplierName)[0].id;
    }
    if (this.fromDate && this.toDate) {
      if (this.fromDate.getTime() > this.toDate.getTime()) {
        Swal.fire({
          title: 'Error!', 
          text: "La fecha de inicio es mayor que la fecha de fin", 
          icon: 'error', 
          confirmButtonText: 'ok'
        })
        this.fromDate = null;
        this.toDate = null;
      }
    }
    this.reportsService.applyFilter(this.rangeValue, supplierId, this.fromDate, this.toDate, this.tab);
  }

  clearFilter() {
    this.rangeValue = 0;
    this.supplierName = '';
    this.fromDate = null;
    this.toDate = null;
    this.reportsService.applyFilter();
  }

   parseDateFromString(dateString: string | null): Date | null {
    if (!dateString) return null;
    const [year, month, day] = dateString.split('-').map(Number);
    const dateObject = new Date(year, month - 1, day);
    return dateObject;
  }

  formatDateToString(date: Date | null): string | null {
    if (!date) return null;
    const dateString = date.toISOString().split('T')[0];
    return dateString;
  }

  onInputChange(value: string | null, date: string): void {
    date === 'from'
      ? this.fromDate = this.parseDateFromString(value)
      : this.toDate = this.parseDateFromString(value);
  }

}
