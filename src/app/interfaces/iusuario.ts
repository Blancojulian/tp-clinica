import { Timestamp } from "@angular/fire/firestore";

export interface IUsuario {
    nombre: string;
    apellido: string;
    fechaNacimiento: Timestamp | Date;
    dni: string;
    email: string;
    password: string;
    rol: Roles;
    urlImagenUno: string;
    userId?: string;
    urlImagenDos?: string;
    obraSocial?: string;
    especialidades?: string[];
    fechaEmailVerificado?: Date | Timestamp;
    fechaAprobado: null | Date | Timestamp;

}

export type Roles = 'admin' | 'paciente' | 'especialista';