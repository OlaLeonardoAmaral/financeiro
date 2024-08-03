'use client';

import React, { useState } from 'react';
import Button from '@mui/material/Button';
import { Plus as PlusIcon } from '@phosphor-icons/react/dist/ssr';
import CustomersAddModal from './customers-add-modal';
import { ICategoria } from '@/services/api/transacoes/ICategoria';
import { TransacoesService } from '@/services/api/transacoes/TransacoesService';
import { ApiException } from '@/services/api/ApiException';

interface AddCustomerButtonProps {
  onAddCustomer: () => void;
}


export function AddCustomerButton({ onAddCustomer }: AddCustomerButtonProps): React.JSX.Element {
  const [openModal, setOpenModal] = useState(false);
  const [categorias, setCategorias] = React.useState<ICategoria[]>([]);

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

  return (
    <>
      <Button onClick={() => handleAddClick()} startIcon={<PlusIcon fontSize="var(--icon-fontSize-md)" />} variant="contained">
        Add
      </Button>
      <CustomersAddModal
        isOpen={openModal}
        setOpenModal={() => setOpenModal(!openModal)}
        onAddCustomer={onAddCustomer}
        categorias={categorias}
        onCategoriaCreated={handleCategoriaCreated}
      />
    </>
  );
};


