import { Api } from "../ApiConfig";
import { ApiException } from "../ApiException";
import { ICategoria, ICategoriaCreate } from "./ICategoria";
import { ITransacao } from "./ITransacao";
import { ITransacaoCreate } from "./ITransicaoCreate";
import { ITransacaoUpdate } from "./ITransicaoUpdate";
import dayjs from 'dayjs';

const listAll = async (params: { 
    page: number; 
    limit: number; 
    categoria?: string; 
    month?: number; 
    year?: number; 
}): Promise<{
    transacoes: ITransacao[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    currentMonth: number;
    currentYear: number;
} | ApiException> => {
    try {
        const { page, limit, categoria, month, year } = params;

        const currentMonth = month || dayjs().month() + 1; 
        const currentYear = year || dayjs().year();

        const queryParams = new URLSearchParams({
            page: page.toString(),
            limit: limit.toString(),
            month: currentMonth.toString(),
            year: currentYear.toString(),
        });

        if (categoria) {
            queryParams.append('categoria', categoria);
        }

        const { data } = await Api().get(`/transacoes/list?${queryParams.toString()}`);
        return data;
    } catch (error: any) {
        return new ApiException(error.message || 'Erro ao buscar transações');
    }
};

const listAllCategorias = async (): Promise<ICategoria[] | ApiException> => {
    try {
        const { data } = await Api().get('/transacoes/categoria');
        return data;
    } catch (error: any) {
        return new ApiException(error.message || 'Erro ao buscar todas categorias');
    }
};

const createCategoria = async (dataToCreate: ICategoriaCreate): Promise<ICategoria | ApiException> => {
    try {
        const { data } = await Api().post<ICategoria>('/transacoes/categoria/add', dataToCreate);
        return data;
    } catch (error: any) {
        return new ApiException(error.message || 'Erro ao criar uma categoria');
    }
}

const create = async (dataToCreate: ITransacaoCreate): Promise<ITransacaoCreate | ApiException> => {
    try {
        const { data } = await Api().post<any>('/transacoes/add', dataToCreate);
        return data;
    } catch (error: any) {
        return new ApiException(error.message || 'Erro ao criar uma receita');
    }
};

 const updateById = async (id: string, dataToUpdate: ITransacaoUpdate): Promise<ITransacaoUpdate | ApiException> => {
    try {

        const routeUpdate = `/transacoes/update${dataToUpdate.isParcela ? '/parcela' : ''}/${id}`

        const { data } = await Api().put<any>(routeUpdate, dataToUpdate);
        return data;
    } catch (error: any) {
        return new ApiException(error.message || 'Erro ao atualizar uma receita');
    }
};

const deleteById = async (id: string, isParcela?: boolean): Promise<undefined | ApiException> => {
    try {
        const routeDelete = `/transacoes/remove${isParcela ? '/parcela' : ''}/${id}`; 
        await Api().delete(routeDelete);
        return undefined;
    } catch (error: any) {
        return new ApiException(error.message || 'Erro ao apagar o registro');
    }
};



export const TransacoesService = {
    listAll,
    listAllCategorias,
    createCategoria,
    create,
    updateById,
    deleteById,
};