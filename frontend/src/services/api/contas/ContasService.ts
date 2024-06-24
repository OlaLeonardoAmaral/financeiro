// services/api/contas/ContasService.ts

import { ReceitasService } from '../receitas/ReceitasService';
import { DespesasService } from '../despesas/DespesasService';
import { IContas } from '../IContas';
import { ApiException } from '../ApiException';

export const ContasService = {
  getAll: async (): Promise<IContas[]> => {
    try {
      const [receitas, despesas] = await Promise.all([
        ReceitasService.getAll(),
        DespesasService.getAll(),
      ]);

      if (receitas instanceof ApiException) throw receitas;
      if (despesas instanceof ApiException) throw despesas;

      // return [...receitas, ...despesas];

      const contas = [...receitas, ...despesas];
      contas.sort((a, b) => new Date(b.data).getTime() - new Date(a.data).getTime());     
      
      console.log(contas)

      return contas;

    } catch (error) {
      if (error instanceof ApiException) {
        return Promise.reject(new ApiException(error.message));
      }
      return Promise.reject(new ApiException('Unexpected error occurred'));
    }
  },
};
