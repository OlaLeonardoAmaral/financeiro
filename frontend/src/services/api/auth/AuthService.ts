import { Api } from "../ApiConfig";
import { ApiException } from "../ApiException";
import { IUserCreate, IUserResponse, IUserResponseById } from "./IUserCreate";


const signUp = async (userToCreate: IUserCreate): Promise<IUserResponse | ApiException> => {
    try {
        const { data } = await Api().post("/auth/signup", userToCreate);
        return data;
    } catch (error: any) {
        return new ApiException(error.message || 'Erro ao criar uma receita');
    }
}

const singIn = async (email: string, password: string): Promise<IUserResponse | ApiException> => {
    try {
        const { data } = await Api().post("/auth/login", { email, password });
        return data;
    } catch (error: any) {
        const errorMessage = error.response?.data?.error || 'Erro ao fazer login';
        return new ApiException(errorMessage);
    }
}

const refreshToken = async (): Promise<IUserResponse | ApiException> => {
    try {
        const { data } = await Api().post("/auth/refresh_token");
        return data;
    } catch (error: any) {
        const errorMessage = error.response?.data?.error || 'Erro ao fazer refresh token';
        return new ApiException(errorMessage);
    }
}

const getUserById = async (id: string | undefined): Promise<IUserResponseById | ApiException> => {
    try {
        const { data } = await Api().get(`user/${id}`);
        return data;
    } catch (error: any) {
        const errorMessage = error.response?.data?.error || 'Erro ao buscar usuário por id';
        return new ApiException(errorMessage);
    }
}

export const AuthService = {
    signUp,
    singIn,
    refreshToken,
    getUserById
};