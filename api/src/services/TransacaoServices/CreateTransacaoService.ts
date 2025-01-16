import AppError from "../../errors/AppError";
import Transacoes from "../../models/Transacoes";
import Parcelas from "../../models/Parcelas";
import moment from "moment-timezone";

enum PeriodoRepeticao {
  Mensal = "Mensal",
  Semanal = "Semanal"
}

enum TipoTransacao {
  Receita = "Receita",
  Despesa = "Despesa"
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
  userId: string;
}

interface SerializedParcelas {
  transacaoId: string;
  userId: string;
  categoriaId: string;
  tipo: string;
  data: Date;
  foiRecebida: false;
  valor: number;
  observacao: string;
  numeroParcela: number;
  totalParcelas: number;
}

const CreateTransacaoService = async (transacao: SerializedTransacao) => {
  try {
    let createdAtDate = transacao.data
      ? moment
          .tz(transacao.data, "DD/MM/YYYY", "America/Sao_Paulo")
          .utc()
          .toDate()
      : moment().utc().toDate();

    const novaTransacao = await Transacoes.create({
      ...transacao,
      data: createdAtDate
    });

    const {
      id: transacaoId,
      tipo,
      categoriaId,
      observacao,
      valor,
      foiRecebida,
      repetir,
      quantidadeRepeticoes,
      periodoRepeticao,
      userId
    } = novaTransacao;

    const parcelas: SerializedParcelas[] = [];

    // Cria as demais parcelas, caso `repetir` seja true
    if (repetir && quantidadeRepeticoes && quantidadeRepeticoes > 1) {
      const intervalo =
        periodoRepeticao === PeriodoRepeticao.Mensal ? "month" : "week";

      for (let i = 1; i < quantidadeRepeticoes; i++) {
        const parcelaData = moment(createdAtDate).add(i, intervalo).toDate();

        parcelas.push({
          transacaoId,
          userId,
          categoriaId,
          tipo,
          data: parcelaData,
          foiRecebida: false,
          valor,
          observacao,
          numeroParcela: i + 1,
          totalParcelas: quantidadeRepeticoes
        });
      }
    }

    // Insere todas as parcelas no banco de dados
    await Parcelas.bulkCreate(parcelas);

    return {
      tipo,
      categoriaId,
      observacao,
      valor,
      data: createdAtDate,
      foiRecebida,
      repetir,
      quantidadeRepeticoes,
      periodoRepeticao,
      userId
    };
  } catch (err: any) {
    console.error(err);
    throw new AppError("Erro ao criar transação", 403);
  }
};

export default CreateTransacaoService;
