import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import {
  DateAdapter,
  MAT_DATE_LOCALE,
  MAT_DATE_FORMATS
} from "@angular/material/core";
import { MomentDateAdapter } from "@angular/material-moment-adapter";
import { DatePipe } from "@angular/common";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from "@angular/forms";

export const MY_FORMATS = {
  parse: {
    dateInput: "DD-MM-YYYY"
  },
  display: {
    dateInput: "DD-MM-YYYY",
    monthYearLabel: "DD-MM-YYYY",
    dateA11yLabel: "DD-MM-YYYY",
    monthYearA11yLabel: "DD-MM-YYYY"
  }
};

@Component({
  selector: 'app-datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.sass'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE]
    },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
    DatePipe
  ]
  
})
export class DatepickerComponent implements OnInit {
  @Input('Dateitem') dataitem :any;
  @Output() dateChange :EventEmitter<any> = new EventEmitter();
  dateFormGroup: FormGroup;
  public maxDate = new Date();

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.dateFormGroup = this.fb.group({
      dateOfBirth: new FormControl(this.dataitem, Validators.required)
    });
  }

  public onSubmit(event) {
    console.log(event)
    this.dateChange.emit(event);
   
  
  }
}
