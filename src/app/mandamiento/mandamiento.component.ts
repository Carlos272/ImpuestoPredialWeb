import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { AppService } from '../app-services.service';
import { MandamientoModel } from '../model/MandamientoModel';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { MandamientoDialogComponent } from '../dialog/mandamiento-dialog/mandamiento-dialog.component';
export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}
@Component({
  selector: 'app-mandamiento',
  templateUrl: './mandamiento.component.html',
  styleUrls: ['./mandamiento.component.css']
})
export class MandamientoComponent implements OnInit {
  @ViewChild('formDirective') private formDirective: NgForm;
  displayedColumns: string[] = ['numero', 'expediente', 'referencia','resolucion', 'propietario', 'ciudad', 'valor',  'actions'];
  dataSource: MandamientoModel | null;
  public  pageIndex = 0;
  public  pageSize  = 5;
  public length: number;

  public notificacions;
  registerUserForm = new FormGroup({
    numero: new FormControl(''),
    ciudad: new FormControl(''),
    expediente: new FormControl(''),
    referenciaC: new FormControl(''),
    direccion: new FormControl(''),
    propietario: new FormControl(''),
    resolucion: new FormControl(''),
    valor: new FormControl(''),
    notificacion: new FormControl(''),

  });
  constructor(
    private appService: AppService,
    private snackBar: MatSnackBar,
    public dialog: MatDialog

  ) { }

  ngOnInit() {
    this.geNotificacion();
    this.listMandamientoFirst();
  }

  geNotificacion() {
    this.appService.getNotificacionMensajeria(1, 1000).subscribe(res => {
      this.notificacions = res.message.docs;
    }, err => {
      console.log(err);
    });
  }
  list(event) {
    const {pageIndex = 0, pageSize = 5} = event;
    this.appService.getMandamientos(pageIndex + 1, pageSize ).subscribe(res => {
      const mandamientos = res.message.docs;
      this.dataSource = mandamientos;
      this.length = res.message.total;

    }, err => {

      console.log(err);

      });
  }

  save() {

     let mandamientoModel: MandamientoModel  = {
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

     this.appService.guardarMandamiento(mandamientoModel).subscribe(
         response => {
          this.openSnackBar('Mandamiento creado exitosamente.', 'Aceptar');   
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

  listMandamientoFirst() {

    this.appService.getMandamientos(this.pageIndex + 1, this.pageSize ).subscribe(res => {
      
      const mandamientos = res.message.docs;
     this.dataSource = mandamientos;
      this.length = res.message.total;

    }, err => {

      console.log(err);
      });
  }

  openDialogEdit(id: string, mandamiento: any): void {
 console.log()
       const dialogRef = this.dialog.open(MandamientoDialogComponent, {
      data: [mandamiento, false],

    });

    dialogRef.afterClosed().subscribe(result => {
      this.listMandamientoFirst();
    });


  }

  deleteMandamiento(id: string, operator: any): void {
    this.appService.borrarMandamiento(id).subscribe(res => {
    this.openSnackBar('Mandamiento eliminado.', 'Aceptar');  
      this.listMandamientoFirst(); 
    }, err => {
      this.openSnackBar('Error.', 'Aceptar');  
      console.log(err);
    });
  }
}
