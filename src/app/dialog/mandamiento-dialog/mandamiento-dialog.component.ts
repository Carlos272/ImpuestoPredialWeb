import { Component, OnInit, ViewChild, Inject} from '@angular/core';
import { FormGroup, FormControl, NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { AppService } from '../../app-services.service';
import { MandamientoModel } from '../../model/MandamientoModel';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
@Component({
  selector: 'app-mandamiento-dialog',
  templateUrl: './mandamiento-dialog.component.html',
  styleUrls: ['./mandamiento-dialog.component.css']
})
export class MandamientoDialogComponent implements OnInit {
  @ViewChild('formDirective') private formDirective: NgForm;


  public notificacions;
  public mandamiento : MandamientoModel;
  public id_mandamiento: string;
  constructor( public appService:AppService,
    public dialogRef: MatDialogRef<MandamientoModel>,
    private snackBar: MatSnackBar, 
    @Inject(MAT_DIALOG_DATA) public data: any) {

      this.mandamiento = new MandamientoModel;
      this.mandamiento.Mandamiento_de_pago_No=data[0].Mandamiento_de_pago_No;
      this.mandamiento.Ciudad= data[0].Ciudad;
      this.mandamiento.Expediente= data[0].Expediente;
      this.mandamiento. ReferenciaC= data[0].ReferenciaC;
      this.mandamiento.Direccion=  data[0].Direccion;
      this.mandamiento.Notificacion = data[0].Notificacion;
      this.mandamiento.Propietario=  data[0].Propietario;
      this.mandamiento.Resolucion= data[0].Resolucion;
      this.mandamiento.Valor= data[0].Valor;
      this.id_mandamiento = data[0]._id;
     
  
    
     }

  ngOnInit() {
    this.geNotificacion();
  }


  geNotificacion() {
    this.appService.getNotificacionMensajeria(1, 1000).subscribe(res => {
      this.notificacions = res.message.docs;
    }, err => {
      console.log(err);
    });
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  onSubmit_edit() {
    let mandamientoModel: MandamientoModel  = {
      Mandamiento_de_pago_No: this.mandamiento.Mandamiento_de_pago_No,
      Ciudad: this.mandamiento.Mandamiento_de_pago_No,
      Expediente:  this.mandamiento.Mandamiento_de_pago_No,
      ReferenciaC: this.mandamiento.Mandamiento_de_pago_No,
      Direccion: this.mandamiento.Mandamiento_de_pago_No,
      Notificacion: this.mandamiento.Mandamiento_de_pago_No,
      Propietario: this.mandamiento.Mandamiento_de_pago_No,
      Resolucion: this.mandamiento.Mandamiento_de_pago_No,
      Valor: this.mandamiento.Mandamiento_de_pago_No
    };

    this.appService.actulizarMandamiento(this.id_mandamiento, mandamientoModel ).subscribe(
      response => {
        this.openSnackBar(`Mandamiento editado.`, `Aceptar`);
        this.onNoClick();
     this.formDirective.resetForm();  
      },
      error => {
       this.openSnackBar('Error no ha podido guardarse mandamiento.', 'Aceptar');
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
