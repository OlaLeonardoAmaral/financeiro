import { Api } from "../ApiConfig";
import { ApiException } from "../ApiException";
import { IContas } from "../IContas";


const getAll = async (): Promise<IContas[] | ApiException> => {
    try {
        const { data } = await Api().get('/receitas');
        return data;
    } catch (error: any) {
        return new ApiException(error.message || 'Erro ao bustar todos');
    }
};

const getById = async (id: string): Promise<IContas | ApiException> => {
    try {
        const { data } = await Api().get(`/receitas/${id}`);
        return data;
    } catch (error: any) {
        return new ApiException(error.message || 'Erro ao bustar por id');
    }
 };

const create = async (dataToCreate: Omit<IContas, 'id'>): Promise<IContas | ApiException> => {
    try {
        const { data } = await Api().post<any>('/receitas', dataToCreate);
        return data;
    } catch (error: any) {
        return new ApiException(error.message || 'Erro ao criar uma receita');
    }
 };

const updateById = async (id: string, dataToUpdate: IContas): Promise<IContas | ApiException> => { 
    try {
        const { data } = await Api().put<any>(`/receitas/${id}`, dataToUpdate);
        return data;
    } catch (error: any) {
        return new ApiException(error.message || 'Erro ao atualizar uma receita');
    }
};

const deleteById = async (id: string): Promise<undefined | ApiException> => { 
    try {
        await Api().delete(`/receitas/${id}`);
        return undefined;
    } catch (error: any) {
        return new ApiException(error.message || 'Erro ao apagar o registro');
    }
};

export const ReceitasService = {
    getAll,
    getById,
    create,
    updateById,
    deleteById,
};