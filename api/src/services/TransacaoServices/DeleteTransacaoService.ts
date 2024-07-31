

import AppError from "../../errors/AppError";
import Transacoes from "../../models/Transacoes";



const DeleteTransacaoService = async (id: string, userId: string) => {
    const transacao = await Transacoes.findOne({ where: { id, userId } });
    if (!transacao) throw new AppError('Transação não encontrado!');
    Transacoes.destroy({ where: { id, userId } });
}

export default DeleteTransacaoService;
