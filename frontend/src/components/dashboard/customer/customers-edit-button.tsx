'use client';

import React, { useState } from 'react';
import Button from '@mui/material/Button';
import { Plus as PlusIcon } from '@phosphor-icons/react/dist/ssr';
import CustomersEditModal from './customers-edit-modal';
import { IconButton } from '@mui/material';
import { PencilSimple } from '@phosphor-icons/react/dist/ssr';


export function EditCustomerButton(): React.JSX.Element {
  const [openModal, setOpenModal] = useState(false);

  return (
    <>
      <IconButton aria-label="edit" onClick={() => setOpenModal(true)}>
        <PencilSimple size={20} color='#737A78' weight="fill" />
      </IconButton>
      
      <CustomersEditModal isOpen={openModal} setOpenModal={() => setOpenModal(!openModal)} />
    </>
  );
};


