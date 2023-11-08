import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  constructor(private snackBar: MatSnackBar) { }

  show(message: string, action: string = 'Close', duration: number = 3000,cssClass:string = '') {
    this.snackBar.open(message, action, {
      duration: duration,
      verticalPosition:'top',
      panelClass:[cssClass]
    });
  }
  showSuccess(message: string) {
    this.show(message, 'close', 5000, 'success-snackbar');
  }
  showError(message: string) {
    this.show(message, 'Error', 3000,'error-snackbar');
  }
}
