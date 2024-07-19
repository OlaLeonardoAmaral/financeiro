import AppError from "../../errors/AppError";
import Transacoes from "../../models/Transacoes";
import moment from "moment-timezone";

interface SerializedTransacao {
    tipo: string;
    categoriaId: string;
    observacao: string;
    valor: number;
    data?: string;
}

const CreateTransacaoService = async (transacao: SerializedTransacao) => {
    try {
        let createdAtDate = transacao.data
            ? moment.tz(transacao.data, "DD/MM/YYYY", "America/Sao_Paulo").utc().toDate() // Converta para UTC
            : moment().utc().toDate(); // Use UTC para a data atual

        const novaTransacao = await Transacoes.create({
            ...transacao,
            data: createdAtDate
        });

        const { tipo, categoriaId, observacao, valor, data } = novaTransacao;

        return { tipo, categoriaId, observacao, valor, data };
    } catch (err: any) {
        console.log(err);
        throw new AppError("Create error", 403);
    }
}

export default CreateTransacaoService;
