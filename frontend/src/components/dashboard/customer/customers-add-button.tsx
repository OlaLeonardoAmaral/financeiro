'use client';

import React, { useState } from 'react';
import Button from '@mui/material/Button';
import { Plus as PlusIcon } from '@phosphor-icons/react/dist/ssr';
import CustomersAddModal from './customers-add-modal';

export function AddCustomerButton(): React.JSX.Element {
  const [openModal, setOpenModal] = useState(false);

  return (
    <>
      <Button onClick={() => setOpenModal(true)} startIcon={<PlusIcon fontSize="var(--icon-fontSize-md)" />} variant="contained">
        Add
      </Button>
      <CustomersAddModal isOpen={openModal} setOpenModal={() => setOpenModal(!openModal)}/>
    </>
  );
};


