import { Api } from "../ApiConfig";
import { ApiException } from "../ApiException";
import { ICategoria } from "./ICategoria";
import { ITransacao } from "./ITransacao";

const listAll = async (params: {page: number, limit: number}): Promise<{ transacoes: ITransacao[]; total: number; page: number; limit: number; totalPages: number } | ApiException> => {
    try {
        const { page, limit } = params;
        const { data } = await Api().get(`/list?page=${page}&limit=${limit}`);
        console.log("resresre", data);
        return data;
    } catch (error: any) {
        return new ApiException(error.message || 'Erro ao bustar todos');
    }
};

const getById = async (id: string): Promise<ITransacao | ApiException> => {
    try {
        const { data } = await Api().get(`/transacoes/${id}`);
        return data;
    } catch (error: any) {
        return new ApiException(error.message || 'Erro ao bustar por id');
    }
};

const create = async (dataToCreate: Omit<ITransacao, 'id'>): Promise<ITransacao | ApiException> => {
    try {
        const { data } = await Api().post<any>('/transacoes', dataToCreate);
        return data;
    } catch (error: any) {
        return new ApiException(error.message || 'Erro ao criar uma receita');
    }
};

const updateById = async (id: string, dataToUpdate: Omit<ITransacao, 'id' | 'data'>): Promise<ITransacao | ApiException> => {
    try {
        const { data } = await Api().put<any>(`/transacoes/${id}`, dataToUpdate);
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
    getById,
    create,
    updateById,
    deleteById,
};