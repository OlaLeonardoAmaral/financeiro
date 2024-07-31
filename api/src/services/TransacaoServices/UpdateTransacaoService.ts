

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


const UpdateTransacaoService = async (id: string, userId: string, transacao: SerializedTransacao) => {
    const findTransacao = await Transacoes.findOne({
        where: {
            id,
            userId
        }
    });

    if (!findTransacao) throw new AppError('Transação não encontrada!');

    let updateDate = transacao.data
        ? moment.tz(transacao.data, "DD/MM/YYYY", "America/Sao_Paulo").utc().toDate() // Converta para UTC
        : transacao.data;

    await findTransacao.update({ ...transacao, data: updateDate })
    await findTransacao.reload();

    return findTransacao;
}

export default UpdateTransacaoService;
