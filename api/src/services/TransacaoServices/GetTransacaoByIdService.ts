

import AppError from "../../errors/AppError";
import Transacoes from "../../models/Transacoes";



const GetTransacaoByIdService = async (id: string) => {
    const transacao = await Transacoes.findByPk(id);
    // if(!transacao) throw new AppError('Transação não encontrado!');
    return transacao;
}

export default GetTransacaoByIdService;
