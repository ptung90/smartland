import { Component, Input } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';

@Component({
  selector: 'prod-dialog',
  templateUrl: 'prod-dialog.component.html',
})
export class ProdDialog {
  constructor(public dialogRef: MatDialogRef<ProdDialog>) {}

  // public confirmMessage:string;
}