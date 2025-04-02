import AppError from "../../errors/AppError";
import Transacoes from "../../models/Transacoes";


enum PeriodoRepeticao {
  Mensal = "Mensal",
  Semanal = "Semanal"
}

enum TipoTransacao {
  Receita = "Receita",
  Despesa = "Despesa"
}

interface SerializedTransacao {
  id: string;
  tipo: TipoTransacao;
  categoriaId: string;
  observacao: string;
  valor: number;
  data: Date;
  foiRecebida: boolean;
  repetir: boolean;
  quantidadeRepeticoes?: number;
  periodoRepeticao?: PeriodoRepeticao;
  userId: string;
}

const SaveAllTransacaoService = async (transacoes: SerializedTransacao[]) => {
    try {
      // Buscar transações existentes pelos IDs informados
      const existingTransactions = await Transacoes.findAll({
        where: {
          id: transacoes.map(t => t.id).filter(id => id !== undefined) // Filtra apenas os IDs definidos
        }
      });
  
      // Criar um conjunto (Set) com os IDs já existentes
      const existingIds = new Set(existingTransactions.map(t => t.id));
  
      // Filtrar apenas as transações que ainda não existem
      const transacoesParaSalvar = transacoes.filter(t => !existingIds.has(t.id));
  
      if (transacoesParaSalvar.length === 0) {
        throw new AppError("Nenhuma nova transação para salvar", 400);
      }
  
      // Salvar as novas transações no banco de dados
      await Transacoes.bulkCreate(transacoesParaSalvar, {
        validate: true,
        ignoreDuplicates: true,
      });
  
    } catch (err: any) {
      console.error(err);
      throw new AppError("Erro ao criar transações", 403);
    }
  };
  

export default SaveAllTransacaoService;
