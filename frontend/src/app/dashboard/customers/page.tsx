"use client";

import * as React from 'react';
// import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
// import { Download as DownloadIcon } from '@phosphor-icons/react/dist/ssr/Download';
// import { Upload as UploadIcon } from '@phosphor-icons/react/dist/ssr/Upload';


import { CustomersFilters } from '@/components/dashboard/customer/customers-filters';
import { CustomersTable } from '@/components/dashboard/customer/customers-table';
import { AddCustomerButton } from '@/components/dashboard/customer/customers-add-button';
// import type { Customer } from '@/components/dashboard/customer/customers-table';
import { ITransacao } from '@/services/api/transacoes/ITransacao';
import { ApiException } from '@/services/api/ApiException';
// import { TransacoesService } from '@/services/mockapi/transacoes/TransacoesService';
import { TransacoesService } from '@/services/api/transacoes/TransacoesService';



export default function Page(): React.JSX.Element {

  const [transacoes, setTransacoes] = React.useState<ITransacao[]>([]);
  const [total, setTotal] = React.useState(0);
  const [page, setPage] = React.useState(1);
  const [limit, setLimit] = React.useState(10);
  const [categoria, setCategoria] = React.useState('');

  const fetchContas = (page = 1, limit = 10, categoria = '') => {
    TransacoesService.listAll({ page, limit, categoria })
      .then((result) => {
        if (result instanceof ApiException) {
          alert(result.message);
        } else {
          setTransacoes(result.transacoes);
          setTotal(result.total);
          setPage(result.page);
          setLimit(result.limit);
        }
      })
      .catch((error) => alert(error.message));
  };

  React.useEffect(() => {
    fetchContas(page, limit, categoria);
  }, [page, limit, categoria]);

  const handlePageChange = (newPage: number) => {
    setPage(newPage + 1);
  };

  const handleRowsPerPageChange = (newLimit: number) => {
    setLimit(newLimit);
    setPage(1);
  };

  const handleFilterChange = (categoria: string) => {
    setCategoria(categoria);
    setPage(1);
  };

  return (
    <Stack spacing={3}>
      <Stack direction="row" spacing={3}>
        <Stack spacing={1} sx={{ flex: '1 1 auto' }}>
          <Typography variant="h4">Transações</Typography>
        </Stack>
        <div>
          <AddCustomerButton onAddCustomer={() => fetchContas(page, limit)} />
        </div>
      </Stack>
      <CustomersFilters onFilterChange={handleFilterChange} /> {/* quero que seja possivel fazer pesquisa das transacoes*/}
      <CustomersTable
        count={total}
        rows={transacoes}
        page={page - 1}
        rowsPerPage={limit}
        onDeleteCustomer={() => fetchContas(page, limit)}
        onEditCustomer={() => fetchContas(page, limit)}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleRowsPerPageChange}
      />
    </Stack>
  );
}

