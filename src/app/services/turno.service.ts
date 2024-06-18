import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData, getDocs, query, where } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Turno } from '../interfaces/turno';

@Injectable({
  providedIn: 'root'
})
export class TurnoService {

  constructor(private firestore: Firestore) { }
/*
  getTurnosPorEmailUsuario(email: string){
    let col = collection(this.firestore, 'usuarios');
    const q = query(col, where('especialidades','==',email))//, where("fechaAprobado", "==", true));
    const observable = collectionData(q)as Observable<Turno[]>;
    return observable;
  }*/

  async getTurnosPaciente(emailPaciente: string, especialidad?: string, emailEspecialistaSeleccionado?: string): Promise<Turno[]> {
    const filters = [where('emailPaciente', '==', emailPaciente)];
    especialidad && filters.push(where('especialidad', '==', especialidad));
    emailEspecialistaSeleccionado && filters.push(where('emailEspecialista', '==', emailEspecialistaSeleccionado));
    const col = collection(this.firestore, 'turnos');
    const q = query(col, ...filters);
    const docs = await getDocs(q);
    if (docs.empty) {
      return [];
    }

    return docs.docs.map((d)=> (d.data() as Turno));
  }

  async getTurnosEspecilista(emailEspecialista: string, especialidad?: string, emailPacienteSeleccionado?: string): Promise<Turno[]> {
    const filters = [where('emailEspecialista', '==', emailEspecialista)];
    especialidad && filters.push(where('especialidad', '==', especialidad));
    emailPacienteSeleccionado && filters.push(where('emailPaciente', '==', emailPacienteSeleccionado));

    const col = collection(this.firestore, 'turnos');
    const q = query(col, ...filters);
    const docs = await getDocs(q);
    if (docs.empty) {
      return [];
    }

    return docs.docs.map((d)=> (d.data() as Turno));
  }

  getTurnosPacienteObservable(emailPaciente: string, especialidad?: string, emailEspecialistaSeleccionado?: string) {
    return new Observable<Turno[]>((observer) => {
      this.getTurnosPaciente(emailPaciente, especialidad, emailEspecialistaSeleccionado)
      .then(turnos => {
        observer.next(turnos);
      })
      .catch(err => {
        observer.error(err);
      })
      .finally(() => {
        observer.complete();
      })
    });
  }

  getTurnosEspecilistaObservable(emailEspecialista: string, especialidad?: string, emailPacienteSeleccionado?: string) {
    return new Observable<Turno[]>((observer) => {
      this.getTurnosEspecilista(emailEspecialista, especialidad, emailPacienteSeleccionado)
      .then(turnos => {
        observer.next(turnos);
      })
      .catch(err => {
        observer.error(err);
      })
      .finally(() => {
        observer.complete();
      })
    });
  }

  async getTurnos(especialidad?: string, emailEspecialistaSeleccionado?: string): Promise<Turno[]> {
    const filters = [];
    especialidad && filters.push(where('especialidad', '==', especialidad));
    emailEspecialistaSeleccionado && filters.push(where('emailPaciente', '==', emailEspecialistaSeleccionado));

    const col = collection(this.firestore, 'turnos');
    const q = query(col, ...filters);
    const docs = await getDocs(q);
    if (docs.empty) {
      return [];
    }

    return docs.docs.map((d)=> (d.data() as Turno));
  }

  getTurnosObservable(especialidad?: string, emailEspecialistaSeleccionado?: string) {
    return new Observable<Turno[]>((observer) => {
      this.getTurnos(especialidad, emailEspecialistaSeleccionado)
      .then(turnos => {
        observer.next(turnos);
      })
      .catch(err => {
        observer.error(err);
      })
      .finally(() => {
        observer.complete();
      })
    });
  }

}
