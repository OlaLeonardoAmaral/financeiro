import { Api } from "../ApiConfig";
import { ApiException } from "../ApiException";
import { IUserCreate, IUserResponse } from "./IUserCreate";


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

export const AuthService = {
    signUp,
    singIn
};