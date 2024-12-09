import { ICategoria } from "./ICategoria";

enum PeriodoRepeticao {
    Mensal = "Mensal",
    Semanal = "Semanal",
}

export interface ITransacao {
    id: string;
    tipo: string;
    categoria: ICategoria;
    observacao: string;
    createdAt: string;
    valor: number;
    data: Date;
    foiRecebida: boolean;
    repetir: boolean;
    quantidadeRepeticoes?: number;
    periodoRepeticao?: PeriodoRepeticao;
    isParcela: boolean;

    numeroParcela?: number,
    totalParcelas?: number,

}