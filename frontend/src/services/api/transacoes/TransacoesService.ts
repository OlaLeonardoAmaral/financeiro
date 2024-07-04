import { Api } from "../ApiConfig";
import { ApiException } from "../ApiException";
import { ICategoria } from "./ICategoria";
import { ITransacao } from "./ITransacao";
import { ITransacaoCreate } from "./ITransicaoCreate";
import { ITransacaoUpdate } from "./ITransicaoUpdate";

const listAll = async (params: { page: number, limit: number }): Promise<{ transacoes: ITransacao[]; total: number; page: number; limit: number; totalPages: number } | ApiException> => {
    try {
        const { page, limit } = params;
        const { data } = await Api().get(`/list?page=${page}&limit=${limit}`);
        return data;
    } catch (error: any) {
        return new ApiException(error.message || 'Erro ao buscar todos');
    }
};

const listAllCategorias = async (): Promise<ICategoria[] | ApiException> => {
    try {
        const { data } = await Api().get('/categoria');
        return data;
    } catch (error: any) {
        return new ApiException(error.message || 'Erro ao buscar todas categorias');
    }
};

// const getById = async (id: string): Promise<ITransacao | ApiException> => {
//     try {
//         const { data } = await Api().get(`/transacoes/${id}`);
//         return data;
//     } catch (error: any) {
//         return new ApiException(error.message || 'Erro ao bustar por id');
//     }
// };

const create = async (dataToCreate: ITransacaoCreate): Promise<ITransacaoCreate | ApiException> => {
    try {
        const { data } = await Api().post<any>('/add', dataToCreate);
        return data;
    } catch (error: any) {
        return new ApiException(error.message || 'Erro ao criar uma receita');
    }
};

 const updateById = async (id: string, dataToUpdate: ITransacaoUpdate): Promise<ITransacaoUpdate | ApiException> => {
    try {
        const { data } = await Api().put<any>(`/update/${id}`, dataToUpdate);
        return data;
    } catch (error: any) {
        return new ApiException(error.message || 'Erro ao atualizar uma receita');
    }
};

const deleteById = async (id: string): Promise<undefined | ApiException> => {
    try {
        await Api().delete(`/remove/${id}`);
        return undefined;
    } catch (error: any) {
        return new ApiException(error.message || 'Erro ao apagar o registro');
    }
};

export const TransacoesService = {
    listAll,
    listAllCategorias,
    // getById,
    create,
    updateById,
    deleteById,
};