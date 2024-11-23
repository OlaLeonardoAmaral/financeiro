'use client';

import React, { useState } from 'react';
import Button from '@mui/material/Button';
import { Plus as PlusIcon } from '@phosphor-icons/react/dist/ssr';
import CustomersAddModal from './customers-add-modal';
import { ICategoria } from '@/services/api/transacoes/ICategoria';
import { TransacoesService } from '@/services/api/transacoes/TransacoesService';
import { ApiException } from '@/services/api/ApiException';
import { TransactionSelectModal } from './modals/transaction-select-modal';
import { useRouter } from 'next/navigation';
import AddTransaction, { AddTransactionModal } from './modals/transaction-add-modal';

interface AddCustomerButtonProps {
  onAddCustomer: () => void;
}


export function AddCustomerButton({ onAddCustomer }: AddCustomerButtonProps): React.JSX.Element {
  const [openModalOptions, setOpenModalOptions] = useState(false);
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
    setOpenModalOptions(true);
  }

  const handleCategoriaCreated = (newCategoria: ICategoria) => {
    setCategorias(prevCategorias => [...prevCategorias, newCategoria]);
  };


  const handleIncomeClick = () => {
    // router.push('/cadastro/receita')
    console.log('ta aq')
    setOpenModal(true);
    setOpenModalOptions(false);
  };

  const handleExpenseClick = () => {
    // Lógica para redirecionar para a página de adicionar despesas
    setOpenModalOptions(false); // estou muito viciado em modal, tenho que mudar isso
  };


  return (
    <>
      <Button onClick={() => handleAddClick()} startIcon={<PlusIcon fontSize="var(--icon-fontSize-md)" />} variant="contained">
        Add
      </Button>

      <TransactionSelectModal
        isOpen={openModalOptions}
        onClose={() => setOpenModalOptions(!openModalOptions)}
        onAddIncome={handleIncomeClick}
        onAddExpense={handleExpenseClick}
      />

      <AddTransactionModal
        isOpen={openModal}
        onClose={() => setOpenModal(!openModal)}
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


