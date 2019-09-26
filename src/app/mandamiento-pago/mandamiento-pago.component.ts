
import { MandamientoPagoModel } from '../model/MandamientoPagoModel';
import { AppService } from '../app-services.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material'
import { MatDialog } from '@angular/material';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}


@Component({
  selector: 'app-mandamiento-pago',
  templateUrl: './mandamiento-pago.component.html',
  styleUrls: ['./mandamiento-pago.component.css']
})

export class MandamientoPagoComponent implements OnInit {
  @ViewChild('formDirective') private formDirective: NgForm;
  // displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  displayedColumns: string[] = ['numero', 'expediente', 'referencia', 'ciudad', 'actions'];
  // dataSource = ELEMENT_DATA;
  dataSource: MandamientoPagoModel | null;
  public pageIndex = 0;
  public pageSize = 5;
  public length: number;
  public notificacions;
  registerUserForm = new FormGroup({
    numero: new FormControl(''),
    ciudad: new FormControl(''),
    expediente: new FormControl(''),
    referenciaC: new FormControl(''),
    direccion: new FormControl(''),
    notificacion: new FormControl(''),
    propietario: new FormControl(''),
    resolucion: new FormControl(''),
    valor: new FormControl('')

  });


  constructor(
    private appService: AppService,
    private snackBar: MatSnackBar,
  ) { }

  ngOnInit() {
    this.list({ pageIndex: this.pageIndex, pageSize: this.pageSize });
    this.getNotificacion();
    this.listFirst();
  }

  list(event) {
    const { pageIndex = 0, pageSize = 5 } = event;

    this.appService.getMandamientosPago(pageIndex + 1, pageSize).subscribe(res => {
      const mandamientosPago = res.message.docs;
      this.dataSource = mandamientosPago;
      this.length = res.message.total;

    }, err => {

      console.log(err);

    });
  }

  save() {

    let mandamientoPagoModel: MandamientoPagoModel = {
      Mandamiento_de_pago_No: this.registerUserForm.value.numero,
      Ciudad: this.registerUserForm.value.ciudad,
      Expediente: this.registerUserForm.value.expediente,
      ReferenciaC: this.registerUserForm.value.referenciaC,
      Direccion: this.registerUserForm.value.direccion,
      Notificacion: this.registerUserForm.value.notificacion,
      Propietario: this.registerUserForm.value.propietario,
      Resolucion: this.registerUserForm.value.resolucion,
      Valor: this.registerUserForm.value.valor,
    };

    this.appService.guardarMandamientoPago(mandamientoPagoModel).subscribe(
      response => {
        this.openSnackBar('Mandamiento Pago creado exitosamente.', 'Aceptar');
        this.formDirective.resetForm();  
      },
      error => {
        alert(error.message.message);
        this.openSnackBar('Error al guardar Mandamiento Pago.', 'Aceptar');

      });
  }
  getNotificacion() {
    this.appService.getNotificacionMensajeria(1, 1000).subscribe(res => {
      this.notificacions = res.message.docs;
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
  listFirst() {

    this.appService.getMandamientosPago(this.pageIndex + 1, this.pageSize).subscribe(res => {

      const pagos = res.message.docs;
      this.dataSource = pagos;
      this.length = res.message.total;

    }, err => {

      console.log(err);
    });
  }

  delete(id: string): void {
    this.appService.borrarMandamientoPago(id).subscribe(res => {
    this.openSnackBar('Mandamiento de pago eliminado.', 'Aceptar');  
      this.listFirst(); 
    }, err => {
      this.openSnackBar('Error.', 'Aceptar');  
      console.log(err);
    });
  }
}
