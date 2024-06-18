import { IUsuario, Roles } from "../interfaces/iusuario";

export class Usuario implements IUsuario {
    constructor(
        public nombre: string,
        public apellido: string,
        public fechaNacimiento: Date,
        public dni: string,
        public email: string,
        public password: string,
        public rol: Roles,
        public urlImagenUno: string,
        public urlImagenDos?: string,
        public userId?: string,
        public obraSocial?: string,
        public especialidades?: string[],
        public fechaEmailVerificado?: Date,
        public fechaAprobado: null | Date = null,
    ) { }
}

const u = new Usuario('Juan', 'Esteban', new Date(1992,1,1), '46122333','juan@gamil.com', 'aaaa1111', 'paciente', 'id usuario', 'url1','url2', 'Osde');
