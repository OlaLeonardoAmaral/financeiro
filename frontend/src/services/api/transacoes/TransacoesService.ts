import { Api } from "../ApiConfig";
import { ApiException } from "../ApiException";
import { ICategoria, ICategoriaCreate } from "./ICategoria";
import { ITransacao } from "./ITransacao";
import { ITransacaoCreate } from "./ITransicaoCreate";
import { ITransacaoUpdate } from "./ITransicaoUpdate";

const listAll = async (params: { page: number, limit: number, categoria: string }): Promise<{ transacoes: ITransacao[]; total: number; page: number; limit: number; totalPages: number } | ApiException> => {
    try {
        const { page, limit, categoria } = params;
        const queryParams = new URLSearchParams({ page: page.toString(), limit: limit.toString() });
        if (categoria) {
            queryParams.append('categoria', categoria);
        }

        const { data } = await Api().get(`/transacoes/list?${queryParams.toString()}`);
        return data;
    } catch (error: any) {
        return new ApiException(error.message || 'Erro ao buscar todos');
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
        const { data } = await Api().put<any>(`/transacoes/update/${id}`, dataToUpdate);
        return data;
    } catch (error: any) {
        return new ApiException(error.message || 'Erro ao atualizar uma receita');
    }
};

const deleteById = async (id: string): Promise<undefined | ApiException> => {
    try {
        await Api().delete(`/transacoes/remove/${id}`);
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