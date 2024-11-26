import AppError from "../../errors/AppError";
import Transacoes from "../../models/Transacoes";
import moment from "moment-timezone";


enum PeriodoRepeticao {
    Mensal = "Mensal",
    Semanal = "Semanal",
}

interface SerializedTransacao {
    tipo: string;
    categoriaId: string;
    observacao: string;
    valor: number;
    data?: string;
    foiRecebida: boolean;
    repetir: boolean;
    quantidadeRepeticoes?: number;
    periodoRepeticao?: PeriodoRepeticao;
    userId: string;
}


const CreateTransacaoService = async (transacao: SerializedTransacao) => {
    try {
        let createdAtDate = transacao.data
            ? moment.tz(transacao.data, "DD/MM/YYYY", "America/Sao_Paulo").utc().toDate()
            : moment().utc().toDate();

        const novaTransacao = await Transacoes.create({
            ...transacao,
            data: createdAtDate
        });

        const {
            tipo,
            categoriaId,
            observacao,
            valor,
            data,
            foiRecebida,
            repetir,
            quantidadeRepeticoes,
            periodoRepeticao,
            userId } = novaTransacao;

        return {
            tipo,
            categoriaId,
            observacao,
            valor,
            data,
            foiRecebida,
            repetir,
            quantidadeRepeticoes,
            periodoRepeticao,
            userId };

    } catch (err: any) {
        console.log(err);
        throw new AppError("Create error", 403);
    }
}

export default CreateTransacaoService;
