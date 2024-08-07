import { Api } from "../ApiConfig";
import { ApiException } from "../ApiException";


const listAll = async (startDate: string, endDate: string) => {
    try {

        const queryParams = new URLSearchParams({ startDate, endDate });

        const { data } = await Api().get(`/printrepo?${queryParams.toString()}`, {
            responseType: 'blob'
        });
        return data;
    } catch (error: any) {
        return new ApiException(error.message || 'Erro ao buscar todos');
    }
};



export const RelatorioServices = {
    listAll,
};