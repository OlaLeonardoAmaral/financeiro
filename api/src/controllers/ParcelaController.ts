import { Request, Response } from "express";

import { AuthenticatedRequest } from "../middleware/isAuth";
import UpdateParcelaService from "../services/ParcelaService/UpdateParcelaService";
import DeleteParcelaService from "../services/ParcelaService/DeleteParcelaService";


enum TipoTransacao {
    Receita = "Receita",
    Despesa = "Despesa",
}

enum PeriodoRepeticao {
    Mensal = "Mensal",
    Semanal = "Semanal",
}

interface SerializedParcela {
    tipo: TipoTransacao;
    categoriaId: string;
    observacao: string;
    valor: number;
    data?: string;
    foiRecebida: boolean;
    repetir: boolean;
    quantidadeRepeticoes?: number;
    periodoRepeticao?: PeriodoRepeticao;
}


export const updateParcela = async (req: AuthenticatedRequest, res: Response): Promise<Response> => {
    const {
        tipo,
        categoriaId,
        observacao,
        valor,
        data,
        foiRecebida,
        repetir,
        periodoRepeticao,
        quantidadeRepeticoes,
    } = req.body as SerializedParcela;



    const { id } = req.params;
    const userId = req.userId!;


    const transacao = await UpdateParcelaService(id, userId, {
        tipo,
        categoriaId,
        observacao,
        valor,
        data,
        foiRecebida,
        repetir,
        periodoRepeticao,
        quantidadeRepeticoes
    });



    return res.status(200).json(transacao);
}


export const deleteParcela = async (req: AuthenticatedRequest, res: Response): Promise<Response> => {
    const { id } = req.params;
    const userId = req.userId!;
    await DeleteParcelaService(id, userId);
    return res.status(204).send();
}