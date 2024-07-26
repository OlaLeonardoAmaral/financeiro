import { Api } from "../ApiConfig";
import { ApiException } from "../ApiException";
import { IEstatistica } from "./IEstatistica";
import { ITotaisAnoMes } from "./ITotaisAnoMes";


const getTotaisMes = async (): Promise<IEstatistica | ApiException> => {
    try {
        const { data } = await Api().get('/transacoes/totaismes');
        return data;
    } catch (error: any) {
        return new ApiException(error.message || 'Erro ao buscar totais por mes');
    }
};

const getTotaisAnoPorMes = async (): Promise<ITotaisAnoMes[] | ApiException> => {
    try {
        const { data } = await Api().get('/transacoes/totaiscadames');
        return data
    } catch (error: any) {
        return new ApiException(error.message || 'Erro ao buscar totais do ano');
    }
}


export const EstatisticasService = {
    getTotaisAnoPorMes,
    getTotaisMes,
};