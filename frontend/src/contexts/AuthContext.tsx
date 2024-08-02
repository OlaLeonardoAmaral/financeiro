'use client';

import { ApiException } from "@/services/api/ApiException";
import { AuthService } from "@/services/api/auth/AuthService";
import { createContext, useCallback, useEffect, useState } from "react";
import { User } from "@/types/user";
import { jwtDecode } from "jwt-decode";

type SingInData = {
    email: string;
    password: string;
}

export type AuthContextType = {
    isAutenticated: boolean;
    user: User | null;
    singIn: (data: SingInData) => Promise<{ error?: string }>
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

    const isAutenticated = !!user;

    const checkSession = useCallback(async (): Promise<void> => {

        const token = localStorage.getItem('financeiro_token');
        if (!token) {
            setIsloading(false);
            setUser(null);
            return;
        }

        if(token) { 
            const { id } = jwtDecode<{ id: string }>(token);
            const response = await AuthService.getUserById(id);
            if (response instanceof ApiException) {
                setError(response.message);
                return;
            }
            setUser(response.user);
        }

        setError(null)
        setIsloading(false);
    }, [])

    useEffect(() => {
        checkSession()
    }, []);

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

    async function signOut(): Promise<{ error?: string }> {
        localStorage.removeItem('financeiro_token');
        setIsloading(false);
        return {};
    }


    return (
        <AuthContext.Provider value={{ user, isLoading, error, isAutenticated, checkSession, singIn, signOut }}>
            {children}
        </AuthContext.Provider>
    )
}