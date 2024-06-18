export class Dia {
    public horarios: Horario[];
    constructor(
        public dia: string,
        public numeroDia: number,
        public indexMes: number 
    ) {
        this.horarios = Dia.generarHorarios(dia);
    }

    get fecha() {
        return `${this.numeroDia}/${this.indexMes+1}`;
    }

    private static generarHorarios(dia: string){
        dia = dia.toLowerCase();
        const intervalo = 30;
        const limite = dia === 'sabado' ? 14 : 18;
        const arr = [];
        let strHorario = '';
        let minutos = 0; 
        for (let i = 8; i <= limite; ) {
            const strHorario = `${i}:${minutos >= 10 ? minutos : '0' + minutos}`;
            arr.push({textoHorario: strHorario, hora: i, minutos});
            minutos += intervalo
            if (minutos >= 60) {
                i++;
                minutos = 0;
            }
        }
        return arr;
    }
}


interface Horario {
    textoHorario: string;
    hora: number;
    minutos: number;
}