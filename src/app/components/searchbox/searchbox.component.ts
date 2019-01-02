import { Component, OnInit } from '@angular/core';
import { NgxCurrencyModule } from "ngx-currency";
import { Options, LabelType } from 'ng5-slider';

@Component({
  selector: 'app-searchbox',
  templateUrl: './searchbox.component.html',
  styleUrls: ['./searchbox.component.css']
})
export class SearchboxComponent implements OnInit {
	minPrice: number = 100000000;
  maxPrice: number = 20000000000;

  options: Options = {
    floor: 100000000,
    ceil: 20000000000,
    step: 100000000,
    translate: (value: number, label: LabelType): string => {
      switch (label) {
        case LabelType.Low:
          // return '<b>Min price:</b> $' + value;
          return this.formatMoneyVN(value);
        case LabelType.High:
          // return '<b>Max price:</b> $' + value;
          return this.formatMoneyVN(value);
        default:
          // return '$' + value;
          return '';
      }
    }
  };
  customCurrencyMaskConfig = {
    align: "left",
    allowNegative: true,
    allowZero: true,
    decimal: ",",
    precision: 0,
    prefix: "",
    suffix: " VND",
    thousands: ".",
    nullable: true
  };
  formatMoneyVN(number) {
    if (number < 1000000000)
      return number/1000000 + ' triệu VND';
    else
      return number/1000000000 + " tỷ VND";
  }
  constructor() { }

  ngOnInit() {
  }

}
