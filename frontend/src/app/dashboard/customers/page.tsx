"use client";

import * as React from 'react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Download as DownloadIcon } from '@phosphor-icons/react/dist/ssr/Download';
import { Upload as UploadIcon } from '@phosphor-icons/react/dist/ssr/Upload';


import { CustomersFilters } from '@/components/dashboard/customer/customers-filters';
import { CustomersTable } from '@/components/dashboard/customer/customers-table';
import { AddCustomerButton } from '@/components/dashboard/customer/customers-add-button';
// import type { Customer } from '@/components/dashboard/customer/customers-table';
import { IContas } from '@/services/api/IContas';
import { ApiException } from '@/services/api/ApiException';
import { ContasService } from '@/services/api/contas/ContasService';



export default function Page(): React.JSX.Element {

  const [contas, setContas] = React.useState<IContas[]>([]);


  const fetchContas = () => {
    ContasService.getAll()
      .then((result) => {
        if (result instanceof ApiException) {
          alert(result.message);
        } else {
          setContas(result);
        }
      })
      .catch((error) => alert(error.message));

      console.log('feat contas teste')
  };



  React.useEffect(() => {
    fetchContas();
  }, []);


  return (
    <Stack spacing={3}>
      <Stack direction="row" spacing={3}>
        <Stack spacing={1} sx={{ flex: '1 1 auto' }}>
          <Typography variant="h4">Receitas e Despesas</Typography>
          <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
            <Button color="inherit" startIcon={<UploadIcon fontSize="var(--icon-fontSize-md)" />}>
              Import
            </Button>
            <Button color="inherit" startIcon={<DownloadIcon fontSize="var(--icon-fontSize-md)" />}>
              Export
            </Button>
          </Stack>
        </Stack>
        <div>
          <AddCustomerButton onAddCustomer={fetchContas}/>
        </div>
      </Stack>
      <CustomersFilters />
      <CustomersTable
        count={contas.length}
        rows={contas}
        onDeleteCustomer={fetchContas}
      />
    </Stack>
  );
}

