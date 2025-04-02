import { Request, Response } from "express";

import CreateCategoriaService from "../services/TransacaoServices/CreateCategoriaService";
import ListCategoriaService from "../services/TransacaoServices/ListCategoriaService";
import CreateTransacaoService from "../services/TransacaoServices/CreateTransacaoService";
import ListTransacaoService from "../services/TransacaoServices/ListTransacaoService";
import DeleteTransacaoService from "../services/TransacaoServices/DeleteTransacaoService";
import UpdateTransacaoService from "../services/TransacaoServices/UpdateTransacaoService";
import GetTransacaoByIdService from "../services/TransacaoServices/GetTransacaoByIdService";
import GetTotaisMes from "../services/TransacaoServices/GetTotaisMes";
import GetTotaisCadaMes from "../services/TransacaoServices/GetTotaisCadaMes";
import { AuthenticatedRequest } from "../middleware/isAuth";
import moment from "moment-timezone";
import SaveAllTransacaoService from "../services/TransacaoServices/SaveAllTransacaoService";

interface SerializedCategoria {
  titulo: string;
}

enum TipoTransacao {
  Receita = "Receita",
  Despesa = "Despesa"
}

enum PeriodoRepeticao {
  Mensal = "Mensal",
  Semanal = "Semanal"
}

interface SerializedTransacao {
  id?: string;
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

interface SerializedImportTransacao {
  id: string;
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

export const createCategoria = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<Response> => {
  const { titulo } = req.body as SerializedCategoria;
  const userId = req.userId!;
  const categoria = await CreateCategoriaService({ titulo, userId });
  return res.status(200).json(categoria);
};

export const findAllCategoria = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<Response> => {
  const userId = req.userId!;
  const categoria = await ListCategoriaService(userId);
  return res.status(200).json(categoria);
};

export const createTransacao = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<Response> => {
  const {
    id,
    tipo,
    categoriaId,
    observacao,
    valor,
    data,
    foiRecebida,
    repetir,
    periodoRepeticao,
    quantidadeRepeticoes
  } = req.body as SerializedTransacao;

  const userId = req.userId!;

  if (id) {
    const transacao = await GetTransacaoByIdService(id);
    if (transacao) return res.status(200).json(transacao);
  }

  const transacao = await CreateTransacaoService({
    id,
    tipo,
    categoriaId,
    observacao,
    valor,
    data,
    foiRecebida,
    repetir,
    periodoRepeticao,
    quantidadeRepeticoes,
    userId
  });

  return res.status(200).json(transacao);
};

export const saveAllTransacao = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<Response> => {
  const transacoes = req.body as SerializedImportTransacao[];
  const userId = req.userId!;

  const transacoesFormatadas = transacoes.map(transacao => ({
    ...transacao,
    userId,
    data: transacao.data
      ? moment
          .tz(transacao.data, "DD/MM/YYYY", "America/Sao_Paulo")
          .utc()
          .toDate()
      : moment().utc().toDate()
  }));

  await SaveAllTransacaoService(transacoesFormatadas);

  return res.status(200).json(transacoes);
};

export const listTransacao = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<Response> => {
  try {
    const page = req.query.page ? parseInt(req.query.page as string, 10) : 1;
    const limit = req.query.limit
      ? parseInt(req.query.limit as string, 10)
      : 10;
    const categoria = req.query.categoria as string;
    const month = req.query.month
      ? parseInt(req.query.month as string, 10)
      : undefined;
    const year = req.query.year
      ? parseInt(req.query.year as string, 10)
      : undefined;
    const userId = req.userId!;

    const { transacoes, total } = await ListTransacaoService(userId, {
      page,
      limit,
      categoria,
      month,
      year
    });
    const totalPages = Math.ceil(total / limit);

    return res.status(200).json({
      transacoes,
      total,
      page,
      limit,
      totalPages,
      currentMonth: month,
      currentYear: year
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Erro ao listar transações" });
  }
};

export const getTransacaoById = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { id } = req.params;
  const transacao = await GetTransacaoByIdService(id);
  return res.status(200).json(transacao);
};

export const updateTransacao = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<Response> => {
  const {
    tipo,
    categoriaId,
    observacao,
    valor,
    data,
    foiRecebida,
    repetir,
    periodoRepeticao,
    quantidadeRepeticoes
  } = req.body as SerializedTransacao;

  const { id } = req.params;
  const userId = req.userId!;

  const transacao = await UpdateTransacaoService(id, userId, {
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
};

export const deleteTransacao = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<Response> => {
  const { id } = req.params;
  const userId = req.userId!;
  await DeleteTransacaoService(id, userId);
  return res.status(204).send();
};

export const getTotaisMes = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<Response> => {
  const userId = req.userId!;
  const totais = await GetTotaisMes(userId);
  return res.status(200).json(totais);
};

export const getTotaisCadaMes = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<Response> => {
  const userId = req.userId!;
  const totais = await GetTotaisCadaMes(userId);
  return res.status(200).json(totais);
};
