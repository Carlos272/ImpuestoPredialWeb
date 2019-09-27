import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AppService } from '../app-services.service';
import { NotificacionEmbargoModel } from '../model/NotificacionEmbargoModel';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-notificacion-embargo',
  templateUrl: './notificacion-embargo.component.html',
  styleUrls: ['./notificacion-embargo.component.css']
})
export class NotificacionEmbargoComponent implements OnInit {
  
  displayedColumns: string[] = ['expediente', 'nombre', 'numeroResolucion', 'matricula', 'acciones'];
  dataSource: NotificacionEmbargoModel | null;

  public pageIndex = 0;
  public pageSize  = 5;
  public length: number;
  
  registerUserForm = new FormGroup({
    Expediente: new FormControl(''),
    Nombre: new FormControl(''),
    Resolucion_No: new FormControl(''),
    Matricula: new FormControl(''),
    Referencia: new FormControl(''),
  });
  
  constructor(
    private appService: AppService,
    private snackBar: MatSnackBar

  ) { }

  ngOnInit() {
    this.list({pageIndex: this.pageIndex, pageSize: this.pageSize});
  }

  list(event) {
    const {pageIndex = 0, pageSize = 5} = event;

    this.appService.getNotificacionEmbargo(pageIndex + 1, pageSize).subscribe(res => {
      const notificacionEmbargo = res.message.docs;
      this.dataSource = notificacionEmbargo;
      this.length = res.message.total;
    }, err => {
      console.log(err);
      });
  }

  save() {

    let notificacionEmbargoModel: NotificacionEmbargoModel  = {
      Expediente: this.registerUserForm.value.Expediente,
      Nombre: this.registerUserForm.value.Nombre,
      Resolucion_No: this.registerUserForm.value.Resolucion_No,
      Matricula: this.registerUserForm.value.Matricula,
      Referencia: this.registerUserForm.value.Referencia,
      
    };

    this.appService.guardarNotificacionEmbargo(notificacionEmbargoModel).subscribe(
        response => {
          this.openSnackBar('La notificación de embargo ha sido creado exitosamente', 'Aceptar');    
        },
        error => {
          alert(error.message.message);

        }); 
  }

  delete(id: string): void {
    this.appService.borrarNotificacionEmbargo(id).subscribe(res => {

    this.list({pageIndex: this.pageIndex, pageSize: this.pageSize});
    }, err => {
      console.log(err);
    });
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 12000,
      horizontalPosition: 'center',
      verticalPosition: 'top'
    });
  }

}
