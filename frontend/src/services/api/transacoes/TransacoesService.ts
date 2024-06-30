import { Api } from "../ApiConfig";
import { ApiException } from "../ApiException";
import { ITransacao } from "./ITransacao";

const getAll = async (): Promise<ITransacao[] | ApiException> => {
    try {
        const { data } = await Api().get('/transacoes');
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
        await Api().delete(`/transacoes/${id}`);
        return undefined;
    } catch (error: any) {
        return new ApiException(error.message || 'Erro ao apagar o registro');
    }
};

export const TransacoesService = {
    getAll,
    getById,
    create,
    updateById,
    deleteById,
};