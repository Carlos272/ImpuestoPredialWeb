import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ResolucionVigenteModel } from '../model/ResolucionVigenteModel';
import { AppService } from '../app-services.service';
import { MatSnackBar } from '@angular/material';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: '123456', weight: 1.0079, symbol: 'Cartagena'},
  {position: 2, name: '123456', weight: 4.0026, symbol: 'Cartagena'},
  {position: 3, name: '123456', weight: 6.941, symbol: 'Barranquilla'},
  {position: 4, name: '123456', weight: 9.0122, symbol: 'Santa Marta'},
  {position: 5, name: '123456', weight: 10.811, symbol: 'Medellín'},
  {position: 6, name: '123456', weight: 12.0107, symbol: 'Cali'},
  {position: 7, name: '123456', weight: 14.0067, symbol: 'Cúcuta'},
  {position: 8, name: '123456', weight: 15.9994, symbol: 'Bucaramanga'},
  {position: 9, name: '123456', weight: 18.9984, symbol: 'Manizales'},
  {position: 10, name: '123456', weight: 20.1797, symbol: 'Cartagena'},
];

@Component({
  selector: 'app-resolucion-vigente',
  templateUrl: './resolucion-vigente.component.html',
  styleUrls: ['./resolucion-vigente.component.css']
})
export class ResolucionVigenteComponent implements OnInit {

  displayedColumns: string[] = ['numero', 'nombre', 'referencia', 'valor', 'acciones'];
  dataSource: ResolucionVigenteModel | null;

  public pageIndex = 0;
  public pageSize  = 5;
  public length: number;

  registerUserForm = new FormGroup({
    Resoluciones_No: new FormControl(''),
    Nombre: new FormControl(''),
    Referencia: new FormControl(''),
    Matricula: new FormControl(''),
    Direccion: new FormControl(''),
    Valor: new FormControl(''),
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

    this.appService.getResolucionVigente(pageIndex + 1, pageSize).subscribe(res => {
      const resolucionVigente = res.message.docs;
      this.dataSource = resolucionVigente;
      this.length = res.message.total;

    }, err => {
      console.log(err);
      });
  }

  save() {

    let resolucionVigenteModel: ResolucionVigenteModel  = {
      Resoluciones_No: this.registerUserForm.value.Resoluciones_No,
      Nombre: this.registerUserForm.value.Nombre,
      Referencia: this.registerUserForm.value.Direccion,
      Matricula: this.registerUserForm.value.Matricula,
      Direccion: this.registerUserForm.value.Direccion,
      Valor: this.registerUserForm.value.Valor,
      
    };

    this.appService.guardarResolucionVigente(resolucionVigenteModel).subscribe(
        response => {
          this.list({pageIndex: this.pageIndex, pageSize: this.pageSize});
          this.openSnackBar('Resolución vigente ha sido creada exitosamente', 'Aceptar');    

        },
        error => {
          alert(error.message.message);

        }); 
  }


  delete(id: string): void {
    this.appService.borrarResolucionVigente(id).subscribe(res => {

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
