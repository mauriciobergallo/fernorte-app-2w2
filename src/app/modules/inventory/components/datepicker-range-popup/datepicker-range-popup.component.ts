import { Component, EventEmitter, Output } from '@angular/core';
import { NgbDate, NgbCalendar, NgbDateParserFormatter, NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'fn-datepicker-range-popup',
  templateUrl: './datepicker-range-popup.component.html',
  styleUrls: ['./datepicker-range-popup.component.css']
})
export class DatepickerRangePopupComponent {
  @Output() onFilter = new EventEmitter<{ from:NgbDate | null, to:NgbDate | null}>();
  @Output() onClearFilter = new EventEmitter<void>();


    hoveredDate: NgbDate | null = null;
	fromDate: NgbDate | null;
	toDate: NgbDate | null;

	constructor(private calendar: NgbCalendar, public formatter: NgbDateParserFormatter) {
		this.fromDate = calendar.getToday();
		this.toDate = calendar.getNext(calendar.getToday(), 'd', 1);
	}

	onDateSelection(date: NgbDate) {
		if (!this.fromDate && !this.toDate) {
			this.fromDate = date;
		} else if (this.fromDate && !this.toDate && date && date.after(this.fromDate)) {
			this.toDate = date;
		} else {
			this.toDate = null;
			this.fromDate = date;
		}
	}

	isHovered(date: NgbDate) {
		return (
			this.fromDate && !this.toDate && this.hoveredDate && date.after(this.fromDate) && date.before(this.hoveredDate)
		);
	}

	isInside(date: NgbDate) {
		return this.toDate && date.after(this.fromDate) && date.before(this.toDate);
	}

	isRange(date: NgbDate) {
		return (
			date.equals(this.fromDate) ||
			(this.toDate && date.equals(this.toDate)) ||
			this.isInside(date) ||
			this.isHovered(date)
		);
	}

	validateInput(currentValue: NgbDate | null, input: string): NgbDate | null {
		const parsed = this.formatter.parse(input);
		return parsed && this.calendar.isValid(NgbDate.from(parsed)) ? NgbDate.from(parsed) : currentValue;
	}

  filter(from: NgbDate | null, to: NgbDate | null){
	console.log("btn fil")
	console.log(from,to)
    this.onFilter.emit({from,to})
  }

  clearFilter() {
	this.onClearFilter.emit();
	console.log('limpiando')
  }

  
}
