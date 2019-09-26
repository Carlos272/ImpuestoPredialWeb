import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AppService } from '../app-services.service';
import { NotificacionCorrespondenciaModel } from '../model/NotificacionCorrespondenciaModel';

@Component({
  selector: 'app-notificacion-correspondencia',
  templateUrl: './notificacion-correspondencia.component.html',
  styleUrls: ['./notificacion-correspondencia.component.css']
})
export class NotificacionCorrespondenciaComponent implements OnInit {
  displayedColumns: string[] = ['ciudad', 'nombre', 'referencia', 'propietario', 'acciones'];
  dataSource: NotificacionCorrespondenciaModel | null;

  public  pageIndex = 0;
  public  pageSize  = 5;
  public length: number;

  constructor(
    private appService: AppService
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
          this.list({pageIndex: this.pageIndex, pageSize: this.pageSize});

          alert('La notificación de correspondencia ha sido creada exitosamente');
        },
        error => {
          alert(error.message.message);

        }); 
 }

 delete(id: string): void {
  this.appService.borrarNotificacionCorrespondencia(id).subscribe(res => {

  this.list({pageIndex: this.pageIndex, pageSize: this.pageSize});
  }, err => {
    console.log(err);
  });
}


}
