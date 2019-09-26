import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AppService } from '../app-services.service';
import { NotificacionMensajeriaModel } from '../model/NotificacionMensajeriaModel';

@Component({
  selector: 'app-notificacion-mensajeria',
  templateUrl: './notificacion-mensajeria.component.html',
  styleUrls: ['./notificacion-mensajeria.component.css']
})
export class NotificacionMensajeriaComponent implements OnInit {
  displayedColumns: string[] = ['empresa', 'nombre', 'direccion', 'firma', 'acciones'];
  dataSource: NotificacionMensajeriaModel | null;

  public pageIndex = 0;
  public pageSize  = 5;
  public length: number;

  registerUserForm = new FormGroup({
    Empresa_mensajeria: new FormControl(''),
    Nombre: new FormControl(''),
    Direccion: new FormControl(''),
    Firma_recibido: new FormControl(''),
  });
  
  constructor(
    private appService: AppService
  ) { }

  ngOnInit() {
    this.list({pageIndex: this.pageIndex, pageSize: this.pageSize});
  }

  list(event) {
    const {pageIndex = 0, pageSize = 5} = event;

    this.appService.getNotificacionMensajeria(pageIndex + 1, pageSize).subscribe(res => {
      const notificacionMensajeriaModel = res.message.docs;
      this.dataSource = notificacionMensajeriaModel;
      this.length = res.message.total;

    }, err => {
      alert(err);
      });
  }

  save() {

    let notificacionMensajeriaModel: NotificacionMensajeriaModel  = {
      Empresa_mensajeria: this.registerUserForm.value.Empresa_mensajeria,
      Nombre: this.registerUserForm.value.Nombre,
      Direccion: this.registerUserForm.value.Direccion,
      Firma_recibido: this.registerUserForm.value.Firma_recibido,
    };

    this.appService.guardarNotificacionMensajeria(notificacionMensajeriaModel).subscribe(
        response => {
          this.list({pageIndex: this.pageIndex, pageSize: this.pageSize});
          alert('La notificación de mensajería ha sido creada exitosamente');

        },
        error => {
          alert(error.message.message);

        }); 
  }

  delete(id: string): void {
    this.appService.borrarNotificacionMensajeria(id).subscribe(res => {

    this.list({pageIndex: this.pageIndex, pageSize: this.pageSize});
    }, err => {
      console.log(err);
    });
  }

}
