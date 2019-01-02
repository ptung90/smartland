import { Component, OnInit } from '@angular/core';
import { BannerService } from 'src/app/services/banner/banner.service';
import { HttpClient, HttpRequest, HttpEventType } from '@angular/common/http';
// import { NgxCurrencyModule } from "ngx-currency";
import { environment } from 'src/environments/environment';

import { NavbarComponent } from '../navbar/navbar.component';
import { CarouselComponent } from '../carousel/carousel.component';
import { SearchboxComponent } from '../searchbox/searchbox.component'

import { MatDialog, MatDialogRef } from '@angular/material';
import { ProdDialog } from '../prod-dialog/prod-dialog.component';
// import { Options, LabelType } from 'ng5-slider';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private http: HttpClient, public dialog: MatDialog) {

    this.tmpProdNumber = Array(12);
    for (var i = 1; i <= 12; i++)
      this.tmpProdNumber[i - 1] = i;
  }

  public progress: number;
  public message: string;
  title = 'app';

  // minPrice: number = 100000000;
  // maxPrice: number = 20000000000;

  // options: Options = {
  //   floor: 100000000,
  //   ceil: 20000000000,
  //   step: 100000000,
  //   translate: (value: number, label: LabelType): string => {
  //     switch (label) {
  //       case LabelType.Low:
  //         // return '<b>Min price:</b> $' + value;
  //         return this.formatMoneyVN(value);
  //       case LabelType.High:
  //         // return '<b>Max price:</b> $' + value;
  //         return this.formatMoneyVN(value);
  //       default:
  //         // return '$' + value;
  //         return '';
  //     }
  //   }
  // };
  // customCurrencyMaskConfig = {
  //   align: "left",
  //   allowNegative: true,
  //   allowZero: true,
  //   decimal: ",",
  //   precision: 0,
  //   prefix: "",
  //   suffix: " VND",
  //   thousands: ".",
  //   nullable: true
  // };

  public html: string = '<span class="btn btn-danger">Your HTML here</span>';

  tmpProdNumber = [];

  dialogRef: MatDialogRef<ProdDialog>;

  

  ngOnInit(): void {

  }

  upload(files) {
    if (files.length === 0)
      return;

    const formData = new FormData();

    for (let file of files)
      formData.append(file.name, file);

    const uploadReq = new HttpRequest('POST', `${environment.baseApiDomain}/api/upload`, formData, {
      reportProgress: true,
    });

    this.http.request(uploadReq).subscribe(event => {
      if (event.type === HttpEventType.UploadProgress)
        this.progress = Math.round(100 * event.loaded / event.total);
      else if (event.type === HttpEventType.Response)
        this.message = event.body.toString();
    });
  }

  // formatMoneyVN(number) {
  //   if (number < 1000000000)
  //     return number/1000000 + ' triệu VND';
  //   else
  //     return number/1000000000 + " tỷ VND";
  // }

   openConfirmationDialog() {
    this.dialogRef = this.dialog.open(ProdDialog, {
      disableClose: false
    });
    // this.dialogRef.componentInstance.confirmMessage = "Are you sure you want to delete?"

    this.dialogRef.afterClosed().subscribe(result => {
      if(result) {
        // do confirmation actions
      }
      this.dialogRef = null;
    });
  }
}
