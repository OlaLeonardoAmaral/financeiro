

import AppError from "../../errors/AppError";
import Transacoes from "../../models/Transacoes";



const DeleteTransacaoService = async (id: string) => {
    const transacao = await Transacoes.findByPk(id);
    if (!transacao) throw new AppError('Transação não encontrado!');
    Transacoes.destroy({ where: { id } })
}

export default DeleteTransacaoService;
