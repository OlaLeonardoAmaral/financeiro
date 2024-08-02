'use client';

import type { User } from '@/types/user';
import { AuthService } from '@/services/api/auth/AuthService';
import { ApiException } from '@/services/api/ApiException';

export interface SignUpParams {
  firstName: string;
  secondName: string;
  email: string;
  password: string;
}

export interface SignInWithOAuthParams {
  provider: 'google' | 'discord';
}

export interface SignInWithPasswordParams {
  email: string;
  password: string;
}

export interface ResetPasswordParams {
  email: string;
}

class AuthClient {
  private _user?: User;


  async signUp(params: SignUpParams): Promise<{ error?: string }> {

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

      const token = response.token;
      localStorage.setItem('token', token);
      this._user = response.user;

      return {};
    } catch (error: any) {
      return { error: error.message || 'Failed to sign up' }
    }
  }


  async signInWithOAuth(_: SignInWithOAuthParams): Promise<{ error?: string }> {
    return { error: 'Social authentication not implemented' };
  }

  async signInWithPassword(params: SignInWithPasswordParams): Promise<{ error?: string }> {
    const { email, password } = params;

    const response = await AuthService.singIn(email, password);

    if (response instanceof ApiException) {
      return { error: response.message };
    }

    localStorage.setItem('token', response.token);
    this._user = response.user;

    return {};
  }

  async resetPassword(_: ResetPasswordParams): Promise<{ error?: string }> {
    return { error: 'Password reset not implemented' };
  }

  async updatePassword(_: ResetPasswordParams): Promise<{ error?: string }> {
    return { error: 'Update reset not implemented' };
  }

  async getUser(): Promise<{ data?: User | null; error?: string }> { // aqui
    const token = localStorage.getItem('token');

    if (!token) {
      return { data: null }; 
    }

    try {
      const response = await AuthService.refreshToken();

      if (response instanceof ApiException) {
        return { error: response.message };
      }

      localStorage.setItem('token', response.token);
      this._user = response.user;

      return { data: this._user };
    } catch (error: any) {
      return { error: error.message || 'Failed to get user' };
    }
  }

  async signOut(): Promise<{ error?: string }> {
    localStorage.removeItem('token');
    return {};
  }
}

export const authClient = new AuthClient();
