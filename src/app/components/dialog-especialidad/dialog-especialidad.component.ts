import { Component, Inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {FormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';

@Component({
  selector: 'app-dialog-especialidad',
  standalone: true,
  imports: [MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,],
  templateUrl: './dialog-especialidad.component.html',
  styleUrl: './dialog-especialidad.component.css'
})
export class DialogEspecialidadComponent {

  public texto: string = '';
  private re = /^([A-Za-zÑñÁáÉéÍíÓóÚú]+['\-]{0,1}[A-Za-zÑñÁáÉéÍíÓóÚú]+)(\s+([A-Za-zÑñÁáÉéÍíÓóÚú]+['\-]{0,1}[A-Za-zÑñÁáÉéÍíÓóÚú]+))*$/;
  public esValido: boolean = false;//usar es valido desahabilitar el boton close si no es valido// sino hacer funcion y pasar result
  constructor(
    public dialogRef: MatDialogRef<DialogEspecialidadComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string | null,//se puede pasar data desde se lo llame //ver si hay que usar interface Especialidad
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
  esTextoValido() {
    return this.re.test(this.texto);
  }
}
