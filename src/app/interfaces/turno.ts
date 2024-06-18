import { Timestamp } from "@angular/fire/firestore";

export interface Turno {
    fecha: Date | Timestamp;
    duracion: number;
    /*fechaInicio: Date | Timestamp;
    fechaFinal: Date | Timestamp;*/
    emailEspecialista: string;
    emailPaciente: string;
    especialidad: string;
    estado: Estados;
    reseniaPaciente?:string;
    reseniaEspecialista?:string;
}

export type Estados = 'pendiente' | 'aceptado' | 'cancelado' | 'rechazado' | 'finalizado';
