import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AppService } from '../app-services.service';
import { ResolucionConvenioPagoModel } from '../model/ResolucionConvenioPagoModel';

@Component({
  selector: 'app-resolucion-convenio-pago',
  templateUrl: './resolucion-convenio-pago.component.html',
  styleUrls: ['./resolucion-convenio-pago.component.css']
})
export class ResolucionConvenioPagoComponent implements OnInit {
  
  displayedColumns: string[] = ['numero', 'convenio', 'nombre', 'valor', 'acciones'];
  dataSource: ResolucionConvenioPagoModel | null;

  public pageIndex = 0;
  public pageSize  = 5;
  public length: number;

  registerUserForm = new FormGroup({
    Resolucion_No: new FormControl(''),
    No_de_Convenio: new FormControl(''),
    Referencia: new FormControl(''),
    Nombre: new FormControl(''),
    Valor: new FormControl(''),
    Fecha: new FormControl(''),
    No_de_Cuotas: new FormControl(''),
    
  });
  constructor(
    private appService: AppService
  ) { }

  ngOnInit() {
    this.list({pageIndex: this.pageIndex, pageSize: this.pageSize});
    
  }

  list(event) {
    const {pageIndex = 0, pageSize = 5} = event;

    this.appService.getResolucionConvenioPago(pageIndex + 1, pageSize).subscribe(res => {
      const notificacionMensajeriaModel = res.message.docs;
      this.dataSource = notificacionMensajeriaModel;
      this.length = res.message.total;

    }, err => {

      console.log(err);

      });
  }


  save() {

    let resolucionConvenioPagoModel: ResolucionConvenioPagoModel  = {
      Resolucion_No: this.registerUserForm.value.Resolucion_No,
      No_de_Convenio: this.registerUserForm.value.No_de_Convenio,
      Referencia: this.registerUserForm.value.Direccion,
      Nombre: this.registerUserForm.value.Nombre,
      Valor: this.registerUserForm.value.Valor,
      Fecha: this.registerUserForm.value.Fecha,
      No_de_Cuotas: this.registerUserForm.value.No_de_Cuotas

    };

    this.appService.guardarResolucionConvenioPago(resolucionConvenioPagoModel).subscribe(
        response => {
        this.list({pageIndex: this.pageIndex, pageSize: this.pageSize});

          alert('Resolución de convenio de pago ha sido creada exitosamente');
        },
        error => {
          alert(error.message.message);

        }); 
  }

  delete(id: string): void {
    this.appService.borrarResolucionConvenioPago(id).subscribe(res => {

    this.list({pageIndex: this.pageIndex, pageSize: this.pageSize});
    }, err => {
      console.log(err);
    });
  }


}
