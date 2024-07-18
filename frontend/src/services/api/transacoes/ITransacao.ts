import { ICategoria } from "./ICategoria";

export interface ITransacao {
    id: string,
    tipo: string,
    categoria: ICategoria,
    observacao: string,
    createdAt: string,
    valor: number
    data: string,
}