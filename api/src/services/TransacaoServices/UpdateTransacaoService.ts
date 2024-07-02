

import AppError from "../../errors/AppError";
import Transacoes from "../../models/Transacoes";


interface SerializedTransacao { // isso aqui pode ser um DTO
    tipo: string;
    categoriaId: string;
    observacao: string;
    valor: number;
}


const UpdateTransacaoService = async (id: string, transacao: SerializedTransacao) => {
    const findTransacao = await Transacoes.findByPk(id);    
    if(!findTransacao) throw new AppError('Transação não encontrada!');
    
    await findTransacao.update(transacao)
    await findTransacao.reload();
    return findTransacao;
}

export default UpdateTransacaoService;
