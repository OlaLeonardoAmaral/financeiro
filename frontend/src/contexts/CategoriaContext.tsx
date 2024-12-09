'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { ApiException } from '@/services/api/ApiException';
import { TransacoesService } from '@/services/api/transacoes/TransacoesService';
import { ICategoria } from '@/services/api/transacoes/ICategoria';

interface CategoriaContextType {
  categorias: ICategoria[];
  fetchCategorias: () => Promise<void>;
}

const CategoriaContext = createContext<CategoriaContextType | undefined>(undefined);

export const CategoriaProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [categorias, setCategorias] = useState<ICategoria[]>([]);

  const fetchCategorias = async () => {
    if (categorias.length > 0) return;

    try {
      const response = await TransacoesService.listAllCategorias();

      if (!(response instanceof ApiException)) {
        setCategorias(response);
      }
    } catch (error: any) {
      console.error(error.message || 'Erro ao carregar categorias');
    }
  };

  useEffect(() => {
    fetchCategorias();
  }, []);

  return (
    <CategoriaContext.Provider value={{ categorias, fetchCategorias }}>
      {children}
    </CategoriaContext.Provider>
  );
};

export const useCategorias = () => {
  const context = useContext(CategoriaContext);
  if (!context) throw new Error('useCategorias must be used within a CategoriaProvider');
  return context;
};