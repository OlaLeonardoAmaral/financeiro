

import AppError from "../../errors/AppError";
import Parcelas from "../../models/Parcelas";
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
}


const UpdateParcelaService = async (id: string, userId: string, parcela: SerializedTransacao) => {
    const findParcela = await Parcelas.findOne({
        where: {
            id,
            userId
        }
    });

    if (!findParcela) throw new AppError('Parcela não encontrada!');

    let updateDate = parcela.data
        ? moment.tz(parcela.data, "DD/MM/YYYY", "America/Sao_Paulo").utc().toDate() // Converta para UTC
        : parcela.data;

    await findParcela.update({ ...parcela, data: updateDate })
    await findParcela.reload();

    return findParcela;
}

export default UpdateParcelaService;
