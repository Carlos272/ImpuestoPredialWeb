import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AppService } from '../app-services.service';
import { ArchivoDeterminadoModel } from '../model/ArchivoDeterminadoModel';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-archivo-determinado',
  templateUrl: './archivo-determinado.component.html',
  styleUrls: ['./archivo-determinado.component.css']
})
export class ArchivoDeterminadoComponent implements OnInit {
  displayedColumns: string[] = ['numero', 'nombre', 'asunto', 'firma', 'actions'];
  dataSource: ArchivoDeterminadoModel | null;

  public length: number;
  public pageIndex = 0;
  public pageSize  = 5;

  registerUserForm = new FormGroup({
    No_de_Oficio_EXT: new FormControl(''),
    Nombre: new FormControl(''),
    Asunto: new FormControl(''),
    Firma_del_Responsable: new FormControl('')
    
  });
  constructor(
    private appService: AppService,
    private snackBar: MatSnackBar,
  ) { }

  ngOnInit() {
  this.listFirst();
}

  list(event) {
    const {pageIndex = 0, pageSize = 5} = event;

    this.appService.getArchivoDeterminado(pageIndex + 1, pageSize ).subscribe(res => {
      const archivos = res.message.docs;
      this.dataSource = archivos;
      this.length = res.message.total;
    }, err => {
      console.log(err);
      });
  }

  listFirst() {

    this.appService.getArchivoDeterminado(this.pageIndex + 1, this.pageSize ).subscribe(res => {
      
      const archivos = res.message.docs;
     this.dataSource = archivos;
      this.length = res.message.total;

    }, err => {

      console.log(err);
      });
  }
  save() {

    let archivoDeterminadoModel: ArchivoDeterminadoModel  = {
      No_de_Oficio_EXT: this.registerUserForm.value.No_de_Oficio_EXT,
      Nombre: this.registerUserForm.value.Nombre,
      Asunto: this.registerUserForm.value.Asunto,
      Firma_del_Responsable: this.registerUserForm.value.Firma_del_Responsable,
    };

    this.appService.guardarArchivoDeterminado(archivoDeterminadoModel).subscribe(
        response => {
          this.openSnackBar('El archivo Determinación ha sido creado exitosamente.', 'Aceptar');  
        },
        error => {
          this.openSnackBar('Error en el archivo Determinación.', 'Aceptar');  
       

        }); 
  }
  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 12000,
      horizontalPosition: 'center',
      verticalPosition: 'top'
    });
  }
  delete(id: string): void {
    this.appService.borrarArchivoDeterminado(id).subscribe(res => {
    this.openSnackBar('Archivo Determinación.', 'Aceptar');  
      this.listFirst(); 
    }, err => {
      this.openSnackBar('Error.', 'Aceptar');  
      console.log(err);
    });
  }
}
