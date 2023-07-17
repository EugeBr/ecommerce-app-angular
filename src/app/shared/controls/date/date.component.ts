import { Component, EventEmitter, forwardRef, Input, Output } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { MatDatepickerInput, MatDatepickerInputEvent } from '@angular/material/datepicker';

type Value = number;

@Component({
  selector: 'app-date',
  templateUrl: './date.component.html',
  styleUrls: ['./date.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DateComponent),
      multi: true
    }
  ]
})
export class DateComponent implements ControlValueAccessor {

  @Input() placeholder!: string;
  @Input() min!: Date;
  @Input() max!: Date;

  @Output() changed = new EventEmitter<Value>();

  get inputValue(): Date {
    return this.value ? new Date(this.value) : new Date();
  }

  value!: Value;
  isDisabled!: boolean;
 
  constructor() { }

  private propagateChange: any = () => {}

  private propagateTouched: any = () => {}

  writeValue(value: Value): void {
    this.value = value;
  }
  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.propagateTouched = fn;
  }
  setDisabledState(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

  onChanged(event: MatDatepickerInputEvent<Date>): void {
    const value = event.value ? event.value.getTime() : new Date().getTime();
    this.value = value;
    this.propagateChange(value);
    this.changed.emit(value);
  }

  onClosed(): void {
    this.propagateTouched();
  }

}
