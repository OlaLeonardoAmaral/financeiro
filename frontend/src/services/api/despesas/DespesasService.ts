import { Api } from "../ApiConfig";
import { ApiException } from "../ApiException";
import { IContas } from "../IContas";

const getAll = async (): Promise<IContas[] | ApiException> => {
    try {
        const { data } = await Api().get('/despesas');
        return data;
    } catch (error: any) {
        return new ApiException(error.message || 'Erro ao bustar todos');
    }
};

const getById = async (id: number): Promise<IContas | ApiException> => {
    try {
        const { data } = await Api().get(`/despesas/${id}`);
        return data;
    } catch (error: any) {
        return new ApiException(error.message || 'Erro ao bustar por id');
    }
 };

const create = async (dataToCreate: Omit<IContas, 'id'>): Promise<IContas | ApiException> => {
    try {
        const { data } = await Api().post<any>('/despesas', dataToCreate);
        return data;
    } catch (error: any) {
        return new ApiException(error.message || 'Erro ao criar uma receita');
    }
 };

const updateById = async (id: number, dataToUpdate: IContas): Promise<IContas | ApiException> => { 
    try {
        const { data } = await Api().put<any>(`/despesas/${id}`, dataToUpdate);
        return data;
    } catch (error: any) {
        return new ApiException(error.message || 'Erro ao atualizar uma receita');
    }
};

const deleteById = async (id: number): Promise<undefined | ApiException> => { 
    try {
        await Api().delete(`/despesas/${id}`);
        return undefined;
    } catch (error: any) {
        return new ApiException(error.message || 'Erro ao apagar o registro');
    }
};

export const DespesasService = {
    getAll,
    getById,
    create,
    updateById,
    deleteById,
};