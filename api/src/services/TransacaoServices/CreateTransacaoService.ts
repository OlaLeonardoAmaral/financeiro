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

const CreateTransacaoService = async (transacao: SerializedTransacao) => {
    try {
        let createdAtDate = transacao.data ? moment(transacao.data, "DD/MM/YYYY").toDate() : new Date();

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
