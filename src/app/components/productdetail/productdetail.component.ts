import { Component, OnInit } from '@angular/core';
import { CarouselComponent } from '../carousel/carousel.component'
import { SearchboxComponent } from '../searchbox/searchbox.component'
import { MatDialog, MatDialogRef } from '@angular/material';
import { ProdDialog } from '../prod-dialog/prod-dialog.component';


@Component({
  selector: 'app-productdetail',
  templateUrl: './productdetail.component.html',
  styleUrls: ['./productdetail.component.css']
})
export class ProductdetailComponent implements OnInit {
	tmpProdNumber = [];
  dialogRef: MatDialogRef<ProdDialog>;
  constructor(public dialog: MatDialog) {

    this.tmpProdNumber = Array(3);
    for (var i = 1; i <= 3; i++)
      this.tmpProdNumber[i - 1] = i;
  }
  ngOnInit() {
  }
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
