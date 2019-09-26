
import { AppService } from '../app-services.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material'
import { MatDialog } from '@angular/material';
import { NotificacionCorrespondenciaModel } from '../model/NotificacionCorrespondenciaModel';

@Component({
  selector: 'app-notificacion-correspondencia',
  templateUrl: './notificacion-correspondencia.component.html',
  styleUrls: ['./notificacion-correspondencia.component.css']
})
export class NotificacionCorrespondenciaComponent implements OnInit {
  @ViewChild('formDirective') private formDirective: NgForm;
  displayedColumns: string[] = ['ciudad', 'nombre', 'referencia', 'propietario', 'acciones'];
  dataSource: NotificacionCorrespondenciaModel | null;

  public  pageIndex = 0;
  public  pageSize  = 5;
  public length: number;

  constructor(
    private appService: AppService,
    private snackBar: MatSnackBar
  ) { }

  registerUserForm = new FormGroup({
    Ciudad: new FormControl(''),
    Nombre: new FormControl(''),
    Referencia_Catas: new FormControl(''),
    Direccion: new FormControl(''),
    Propietario: new FormControl('')
  
  });

  ngOnInit() {
    this.list({pageIndex: this.pageIndex, pageSize: this.pageSize});
    this.listFirst();
  }

  list(event) {
    const {pageIndex = 0, pageSize = 5} = event;

    this.appService.getNotificacionCorrespondencia(pageIndex + 1, pageSize ).subscribe(res => {
      const notificacionCorrespondencia = res.message.docs;
      this.dataSource = notificacionCorrespondencia;
      this.length = res.message.total;

    }, err => {

      console.log(err);

      });
  }
  listFirst() {

    this.appService.getNotificacionCorrespondencia(this.pageIndex + 1, this.pageSize).subscribe(res => {

      const correo = res.message.docs;
      this.dataSource = correo;
      this.length = res.message.total;

    }, err => {

      console.log(err);
    });
  }

  save() {

    let notificacionCorrespondenciaModel: NotificacionCorrespondenciaModel  = {
      Ciudad: this.registerUserForm.value.Ciudad,
      Nombre: this.registerUserForm.value.Nombre,
      Referencia_Catas: this.registerUserForm.value.Referencia_Catas,
      Direccion: this.registerUserForm.value.Direccion,
      Propietario: this.registerUserForm.value.Propietario,
    };

    this.appService.guardarNotificacionCorrespondencia(notificacionCorrespondenciaModel).subscribe(
        response => {
          this.openSnackBar('La notificación por Correo ha sido creada exitosamente', 'Aceptar');    
          this.formDirective.resetForm();   
        },
        error => {
        
          this.openSnackBar('Error al crear la notificacion', 'Aceptar');  

        }); 
 }

 delete(id: string): void {
  this.appService.borrarNotificacionCorrespondencia(id).subscribe(res => {
    this.listFirst();
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
