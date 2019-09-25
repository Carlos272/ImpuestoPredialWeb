import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AppService } from '../app-services.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatSnackBar} from '@angular/material';
@Component({
  selector: 'app-external-register',
  templateUrl: './external-register.component.html',
  styleUrls: ['./external-register.component.css']
})
export class ExternalRegisterComponent implements OnInit {


  registerUserForm = new FormGroup({
    FirstName: new FormControl(''),
    LastName: new FormControl(''),
    Email: new FormControl(''),
    Username: new FormControl(''),
    Password: new FormControl(''),
    Identification: new FormControl('')
  });
  
  constructor(
    private router: Router,
    private appService: AppService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
  }

  save() {
    this.appService.guardarUsuario(this.registerUserForm.value)
    .subscribe(res => {
      this.openSnackBar('Usuario Agregado.', 'Aceptar');
      this.router.navigate(['/login']);
    }, err => {
      this.openSnackBar('Ha ocurrido un error al intentar listar los usuario. Inténtelo más tarde.', 'Aceptar');
    });
   
  }
  cancel() {
    this.router.navigate(['login']);

  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 12000,
      horizontalPosition: 'center',
      verticalPosition: 'top'
    });
  }
}
