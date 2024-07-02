

import AppError from "../../errors/AppError";
import Transacoes from "../../models/Transacoes";


interface SerializedTransacao { // isso aqui pode ser um DTO
    tipo: string;
    categoriaId: string;
    observacao: string;
    valor: number;
}

const CreateTransacaoService = async (transacao: SerializedTransacao) => {
    try {
        const { tipo, categoriaId, observacao, valor } = await Transacoes.create(transacao);
        return { tipo, categoriaId, observacao, valor };
    } catch (err: any) {
        console.log(err);
        throw new AppError("Create error", 403);
    }
}

export default CreateTransacaoService;
