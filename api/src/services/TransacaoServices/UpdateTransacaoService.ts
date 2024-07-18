

import AppError from "../../errors/AppError";
import Transacoes from "../../models/Transacoes";
import moment from "moment";


interface SerializedTransacao {
    tipo: string;
    categoriaId: string;
    observacao: string;
    valor: number;
    data?: Date;
}


const UpdateTransacaoService = async (id: string, transacao: SerializedTransacao) => {
    const findTransacao = await Transacoes.findByPk(id);
    if (!findTransacao) throw new AppError('Transação não encontrada!');

    let updateDate = transacao.data ? moment(transacao.data, "DD/MM/YYYY").toDate() : transacao.data;

    await findTransacao.update({ ...transacao, data: updateDate })
    await findTransacao.reload();

    return findTransacao;
}

export default UpdateTransacaoService;
