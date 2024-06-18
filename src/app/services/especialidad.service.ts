import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Especialidad } from '../interfaces/especialidad';
import { Firestore, addDoc, collection, collectionData } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class EspecialidadService {

  public readonly listaEspecialidades$: Observable<Especialidad[]>
  constructor(private firestore: Firestore) {
    this.listaEspecialidades$ = this.getData();
  }

  private getData() {
    let col = collection(this.firestore, 'especialidades');
    //const observable = collectionData(col) as Observable<Especialidad[]>;
    return collectionData(col) as Observable<Especialidad[]>;
  }

  async crearEspecialidad(datos: Especialidad) {
    const col = collection(this.firestore, 'especialidades');
    await addDoc(col, datos);
  }
}
