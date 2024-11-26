'use client';

import Button from '@mui/material/Button';
import { Plus as PlusIcon } from '@phosphor-icons/react/dist/ssr';
import React, { useState } from 'react';
import { SaveTransactionModal } from './modals/transaction-save-modal';
import { TransactionSelectModal } from './modals/transaction-select-modal';
import { useCategorias } from '@/contexts/CategoriaContext';

interface AddCustomerButtonProps {
  refreshTable: () => void;
}

type TransactionType = 'Receita' | 'Despesa';

export function AddCustomerButton({ refreshTable }: AddCustomerButtonProps): React.JSX.Element {
  const [openModalOptions, setOpenModalOptions] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const [transactionType, setTransactionType] = useState<TransactionType>('Receita');
  const { categorias, fetchCategorias } = useCategorias();

  const handleAddClick = () => {
    fetchCategorias();
    setOpenModalOptions(true);
  }

  const handleAddTransactionClick = (type: TransactionType) => {
    setTransactionType(type);
    setOpenModal(true);
    setOpenModalOptions(false);
  };


  return (
    <>
      <Button onClick={() => handleAddClick()} startIcon={<PlusIcon fontSize="var(--icon-fontSize-md)" />} variant="contained">
        Add
      </Button>

      <TransactionSelectModal
        isOpen={openModalOptions}
        onClose={() => setOpenModalOptions(!openModalOptions)}
        onAddIncome={() => handleAddTransactionClick('Receita')}
        onAddExpense={() => handleAddTransactionClick('Despesa')}
      />

      <SaveTransactionModal
        isOpen={openModal}
        onClose={() => setOpenModal(!openModal)}
        categorias={categorias}
        refreshTable={refreshTable}
        transactionType={transactionType}
      />
    </>
  );
};


