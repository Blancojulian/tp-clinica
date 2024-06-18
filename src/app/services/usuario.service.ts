import { Injectable } from '@angular/core';
import { Firestore, addDoc, collection, collectionData, where, query, getDoc, doc, snapToData, getDocs, limit, Timestamp, setDoc, updateDoc, QueryFieldFilterConstraint } from '@angular/fire/firestore';
import { IUsuario } from '../interfaces/iusuario';
import { Observable, Subscription, map } from 'rxjs';
import { Turno } from '../interfaces/turno';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  public readonly listaUsuarios$: Observable<IUsuario[]>;

  constructor(private firestore: Firestore) {
    this.listaUsuarios$ = this.getUsuarios();
  }

  async crearUsuario(usuario: IUsuario) {
    const col = collection(this.firestore, 'usuarios');
    await addDoc(col, this.getProps(usuario));
  }

  getProps(usuario: Object){
    const newObj:{[key: string]:any} = {};
    const entries = Object.entries(usuario)
    for (const [key, value] of entries) {
      if (value !== undefined) {
        newObj[key] = value;
      }
    }
    return newObj;
  }

  async updateUsuario(email:string, datos: IUsuario) {
    if (!email) {
      throw new Error('Parametro email invalido');
    }
    const usuario = await this.getDocumento(where('email', '==', email));
    if (!usuario) {
      throw new Error('Usuario no existe');
    }
    
    await setDoc(usuario.ref, this.getProps(datos));
  }

  getUsuarios(){
    let col = collection(this.firestore, 'usuarios');
    const observable = collectionData(col)as Observable<IUsuario[]>
    return observable;
  }

  //ver que traiga los especialistas aprobados
  //ver si funciona la query, where("fechaAprobado", "==", true)
  getUsuariosPorEspecialidad(especialidad: string) {
    let col = collection(this.firestore, 'usuarios');
    const q = query(col, where('especialidades','array-contains',especialidad), where("fechaAprobado", "!=", null));
    const observable = collectionData(q)as Observable<IUsuario[]>
    return observable;
  }
  
  async getPacientesAsignados(emailEspecialista: string) {
    let pacientesAsignados: IUsuario[] = [];
    const col = collection(this.firestore, 'turnos');
    const queryTurnos = query(col, where('emailEspecialista', '==', emailEspecialista));
    const listaTurnos = await getDocs(queryTurnos);
    let paciente;
    if (listaTurnos.empty) {
      return pacientesAsignados;
    }
    for await (const t of listaTurnos.docs) {
      if (t.exists()) {
        paciente = await this.getUsuarioPorEmail((t.data() as Turno).emailPaciente);
        paciente && pacientesAsignados.push(paciente);
      }
    }
    return pacientesAsignados;
  }
  async getPacientesAsignadosPorEspecialidad(emailEspecialista: string, especialidad: string) {
    let pacientesAsignados: IUsuario[] = [];
    const col = collection(this.firestore, 'turnos');
    const queryTurnos = query(col, where('emailEspecialista', '==', emailEspecialista), where('especialidad', '==', especialidad));
    const listaTurnos = await getDocs(queryTurnos);
    let paciente;
    if (listaTurnos.empty) {
      return pacientesAsignados;
    }
    for await (const t of listaTurnos.docs) {
      if (t.exists()) {
        paciente = await this.getUsuarioPorEmail((t.data() as Turno).emailPaciente);
        paciente && pacientesAsignados.push(paciente);
      }
    }
    return pacientesAsignados;
  }

  async prueba() {
    const col = collection(this.firestore, 'usuarios');
    const q = query(col, where('nombre', '==', 'juan'), limit(1));
    const ref = doc(col, '3CIXedznAtqWl6ibexHD');
    const doc1 = await getDoc(ref);
    const u = doc1.data() as IUsuario;
    console.log(doc1);
    console.log(u);
    if (doc1.exists()) {
      console.log(u as IUsuario);
      (u.fechaNacimiento as Timestamp).toDate()
    }

    const listaDocs = await getDocs(q);
    console.log(listaDocs.docs);
    console.log(listaDocs.docs[0]?.data() as IUsuario);
    
    
  }
  async getDocumento(filtro: QueryFieldFilterConstraint) {
    const col = collection(this.firestore, 'usuarios');
    const q = query(col, filtro, limit(1));
    const listaDocs = await getDocs(q);
    if (listaDocs.empty || !listaDocs.docs[0].exists()) {
      return null;
    }
    return listaDocs.docs[0];
  }

  async getUsuarioPorEmail(email: string){
    const col = collection(this.firestore, 'usuarios');
    const q = query(col, where('email', '==', email), limit(1));
    const listaDocs = await getDocs(q);
    if (listaDocs.empty || !listaDocs.docs[0].exists()) {
      return null;
    }
    return listaDocs.docs[0].data() as IUsuario;
  }

  async getUsuarioPorDni(dni: string){
    const col = collection(this.firestore, 'usuarios');
    const q = query(col, where('dni', '==', dni), limit(1));
    const listaDocs = await getDocs(q);
    if (listaDocs.empty || !listaDocs.docs[0].exists()) {
      return null;
    }
    return listaDocs.docs[0].data() as IUsuario;
  }

  getUsuarioPorNombre(nombre: string){
    
    let col = collection(this.firestore, 'usuarios');
    const q = query(col, where('nombre', '==', nombre))
    const observable = collectionData(q) as Observable<IUsuario[]>;
    return observable;

  }

}
