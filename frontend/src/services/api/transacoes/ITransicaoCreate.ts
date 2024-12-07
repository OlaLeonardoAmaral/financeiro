
enum PeriodoRepeticao {
    Mensal = "Mensal",
    Semanal = "Semanal",
}

export interface ITransacaoCreate {
    tipo: string,
    categoriaId: string,
    observacao: string,    
    valor: number
    data: string;
    foiRecebida: boolean;
    repetir: boolean;
    quantidadeRepeticoes?: number;
    periodoRepeticao?: PeriodoRepeticao;
    isParcela: boolean;
}



