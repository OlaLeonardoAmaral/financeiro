'use client';

import { ApiException } from "@/services/api/ApiException";
import { AuthService } from "@/services/api/auth/AuthService";
import { createContext, useCallback, useEffect, useState } from "react";
import { User } from "@/types/user";
import { jwtDecode } from "jwt-decode";
import { isTokenExpired } from "@/utils/tokenUtils";

type SingInData = {
    email: string;
    password: string;
}

type SignUpParams = {
    firstName: string;
    secondName: string;
    email: string;
    password: string;
}

export type AuthContextType = {
    isAutenticated: boolean;
    user: User | null;
    singIn: (data: SingInData) => Promise<{ error?: string }>
    signUp: (data: SignUpParams) => Promise<{ error?: string }>
    signOut: () => Promise<{ error?: string }>
    checkSession: () => Promise<void>
    error: string | null;
    isLoading: boolean;
}

export interface AuthProviderProps {
    children: React.ReactNode;
}


export const AuthContext = createContext({} as AuthContextType);

export function AuthProvider({ children }: AuthProviderProps) {
    const [user, setUser] = useState<User | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsloading] = useState<boolean>(true);
    const [isAutenticated, setIsAutenticated] = useState<boolean>(false);


    const checkSession = useCallback(async (): Promise<void> => {

        const token = localStorage.getItem('financeiro_token');
        if (!token || isTokenExpired(token)) {
            setIsAutenticated(false);
            setUser(null);
            setIsloading(false);
            return;
        }

        const { id } = jwtDecode<{ id: string }>(token);
        const response = await AuthService.getUserById(id);

        if (response instanceof ApiException) {
            setIsAutenticated(false);
            setError(response.message);
            setIsloading(false);
            return;
        }

        setUser(response.user);
        setIsAutenticated(true);
        setIsloading(false);
    }, [])

    useEffect(() => {
        checkSession();
    }, [checkSession]);

    async function singIn({ email, password }: SingInData): Promise<{ error?: string }> {
        const response = await AuthService.singIn(email, password);
        if (response instanceof ApiException) {
            setError(response.message);
            setIsloading(false);
            return { error: response.message };
        }

        const { token, user } = response;

        localStorage.setItem('financeiro_token', token);
        setUser(user)
        setError(null);
        setIsloading(false);
        return {};
    }

    async function signUp(params: SignUpParams): Promise<{ error?: string }> {

        try {
            const userToCreate = {
                email: params.email,
                password: params.password,
                name: `${params.firstName} ${params.secondName}`,
                firstName: params.firstName,
                secondName: params.secondName
            };

            const response = await AuthService.signUp(userToCreate);

            if (response instanceof ApiException) {
                return { error: response.message };
            }

            const { token, user } = response;

            localStorage.setItem('financeiro_token', token);
            setUser(user)
            setError(null);
            setIsloading(false);
            return {};
        } catch (error: any) {
            return { error: error.message || 'Failed to sign up' }
        }
    }

    async function signOut(): Promise<{ error?: string }> {
        localStorage.removeItem('financeiro_token');
        setIsAutenticated(false);
        setIsloading(false);
        return {};
    }


    return (
        <AuthContext.Provider value={{ user, isLoading, error, isAutenticated, checkSession, singIn, signUp, signOut }}>
            {children}
        </AuthContext.Provider>
    )
}