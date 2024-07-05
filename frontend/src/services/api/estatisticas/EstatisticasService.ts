import { Api } from "../ApiConfig";
import { ApiException } from "../ApiException";
import { IEstatistica } from "./IEstatistica";


const getTotaisMes = async (): Promise<IEstatistica | ApiException> => {
    try {
        const { data } = await Api().get('/totaismes');
        return data;
    } catch (error: any) {
        return new ApiException(error.message || 'Erro ao buscar totais por mes');
    }
};


export const EstatisticasService = {
    getTotaisMes,
};