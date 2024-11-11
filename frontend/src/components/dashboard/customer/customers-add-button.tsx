'use client';

import React, { useState } from 'react';
import Button from '@mui/material/Button';
import { Plus as PlusIcon } from '@phosphor-icons/react/dist/ssr';
import CustomersAddModal from './customers-add-modal';
import { ICategoria } from '@/services/api/transacoes/ICategoria';
import { TransacoesService } from '@/services/api/transacoes/TransacoesService';
import { ApiException } from '@/services/api/ApiException';
import { AddTransactionModal } from './customers-modal-trasacoes';
import { useRouter } from 'next/navigation';

interface AddCustomerButtonProps {
  onAddCustomer: () => void;
}


export function AddCustomerButton({ onAddCustomer }: AddCustomerButtonProps): React.JSX.Element {
  const [openModal, setOpenModal] = useState(false);
  const [categorias, setCategorias] = React.useState<ICategoria[]>([]);
  const router = useRouter();

  const fetchCategorias = async () => {
    try {
      const response = await TransacoesService.listAllCategorias();

      if (response instanceof ApiException) {
        alert(response.message);
        return;
      }

      setCategorias(response)
    } catch (error: any) {
      alert(error.message || 'An unexpected error occurred');
    }
  };

  const handleAddClick = () => {
    fetchCategorias();
    setOpenModal(true);
  }

  const handleCategoriaCreated = (newCategoria: ICategoria) => {
    setCategorias(prevCategorias => [...prevCategorias, newCategoria]);
  };


  const handleIncomeClick = () => {
    // Lógica para redirecionar para a página de adicionar receitas
    // router.push('/ ... ') // Ao clicar em receita, eu quero que abra essa nova pagina
    setOpenModal(false);
  };

  const handleExpenseClick = () => {
    // Lógica para redirecionar para a página de adicionar despesas
    setOpenModal(false);
  };


  return (
    <>
      <Button onClick={() => handleAddClick()} startIcon={<PlusIcon fontSize="var(--icon-fontSize-md)" />} variant="contained">
        Add
      </Button>

      <AddTransactionModal
        isOpen={openModal}
        setOpenModal={() => setOpenModal(!openModal)}
        onAddIncome={handleIncomeClick}
        onAddExpense={handleExpenseClick}
      />


      {/* <CustomersAddModal
        isOpen={openModal}
        setOpenModal={() => setOpenModal(!openModal)}
        onAddCustomer={onAddCustomer}
        categorias={categorias}
        onCategoriaCreated={handleCategoriaCreated}
      /> */}
    </>
  );
};


