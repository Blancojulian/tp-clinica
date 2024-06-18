import { Injectable } from '@angular/core';
import { Firestore, addDoc, collection, collectionData, doc, getDoc, query, where } from '@angular/fire/firestore';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LogService {

  public loginsCollection:any[] = [];
  private sub!:Subscription;

  constructor(private firestore: Firestore) { }

  async crearLog(datos : {userId: string, email: string}) {
    
    const col = collection(this.firestore, 'logins');
    await addDoc(col, { fecha: new Date(), userId: datos.userId, email: datos.email});

    //Actualizamos el valor de la variable
    //this.miObservable.next(this.user);
  }

 

  getData(){
    
    let col = collection(this.firestore, 'logins');
    const observable = collectionData(col);

    this.sub = observable.subscribe((respuesta:any) => {

      //Actualizamos nuestro array
      this.loginsCollection = respuesta;

      //Actualizamos la cantidad de registros que contiene la colección (Ejemplo propuesto en clase)
      //this.countLogins = this.loginsCollection.length;

      console.log(respuesta);
    })

  }
  
}
