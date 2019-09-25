import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { LoginUserModel } from '../model/LoginUserModel';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user: LoginUserModel = {
    Username: '',
    Password: ''
  };

  public showLoadingBar: boolean;

  loginForm = new FormGroup({
    usernameField: new FormControl(''),
    passwordField: new FormControl('')
  });

  constructor(private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar

    ) { }

  ngOnInit() {
  }
  

  save(): void {
    this.authService.authenticate(this.user).subscribe(res => {
     this.router.navigate(['home/dashboard']);
     }, err => {
      this.openSnackBar('El usuario no se ha logueado correctamente.', 'Aceptar');
     

     });
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 12000,
      verticalPosition: 'top',
      horizontalPosition: 'center'
    });
  }
}
