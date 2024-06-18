import { Injectable } from '@angular/core';
import { Storage, getDownloadURL, ref, uploadBytes, uploadBytesResumable } from '@angular/fire/storage';
import { v4 as uuidv4 } from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(private storage: Storage) { }

  

  async guardarArchivo(archivo: File, nombre: string = uuidv4()) {
    try {
      const ext = archivo.name.slice(archivo.name.lastIndexOf('.'));
      const storageRef = ref(this.storage, nombre + ext);
      const res = await uploadBytes(storageRef, archivo);
      return await getDownloadURL(res.ref);
    } catch (err) {
      throw new Error('Error al subir archivo', err as Error)
    }
  }
  /*
  async guardarArchivos(archivos: FileList, nombreGenerico = true) {
    const urls = [];
    let ruta = '';
    let nombre = '';
    try {
      for (let i = 1; i <= archivos.length; i++) {
        const archivo = archivos.item(i);
        if (archivo) {
          nombre = nombreGenerico ?
          `imagen-${Date.now()}-${i}.${archivo.name.slice(archivo.name.lastIndexOf('.'))}` :
          archivo.name;
          ruta = await this.guardarArchivo(archivo, nombre);
          urls.push(ruta);
        }
      }
    } catch (err) {
      throw err;
    }

    return urls;
  }*/
}
