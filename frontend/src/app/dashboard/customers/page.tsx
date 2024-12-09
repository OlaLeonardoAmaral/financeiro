"use client";

import * as React from 'react';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { CustomersFilters } from '@/components/dashboard/customer/customers-filters';
import { CustomersTable } from '@/components/dashboard/customer/customers-table';
import { AddCustomerButton } from '@/components/dashboard/customer/customers-add-button';
import { ITransacao } from '@/services/api/transacoes/ITransacao';
import { ApiException } from '@/services/api/ApiException';
import { TransacoesService } from '@/services/api/transacoes/TransacoesService';
import { useMediaQuery } from '@mui/material';
import { MobileList } from '@/components/dashboard/customer/customers-mobile-list';
import dayjs from 'dayjs';


export default function Page(): React.JSX.Element {

  const [transacoes, setTransacoes] = React.useState<ITransacao[]>([]);
  const [total, setTotal] = React.useState(0);
  const [page, setPage] = React.useState(1);
  const [limit, setLimit] = React.useState(10);
  const [categoria, setCategoria] = React.useState('');

  const [month, setMonth] = React.useState(dayjs().month() + 1);
  const [year, setYear] = React.useState(dayjs().year());


  const isMobile = useMediaQuery('(max-width:850px)');

  const fetchContas = (
    page = 1,
    limit = 10,
    categoria = '',
    month = dayjs().month() + 1,
    year = dayjs().year()
  ) => {
    TransacoesService.listAll({ page, limit, categoria, month, year })
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
    fetchContas(page, limit, categoria, month, year);
  }, [page, limit, categoria, month, year]);



  const handleMonthChange = (newMonth: number) => {
    setMonth(newMonth);
    setPage(1);
  };

  const handleYearChange = (newYear: number) => {
    setYear(newYear);
    setPage(1);
  };



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
          <AddCustomerButton refreshTable={() => fetchContas(page, limit, categoria, month, year)} />
        </div>
      </Stack>
      <CustomersFilters onFilterChange={handleFilterChange} />

      {isMobile ? (
        <MobileList
          rows={transacoes}
          onRowsPerPageChange={handleRowsPerPageChange}
          refreshTable={() => fetchContas(page, limit, categoria, month, year)}
          onMonthChange={handleMonthChange}
          onYearChange={handleYearChange}
        />
      ) : <CustomersTable
        count={total}
        rows={transacoes}
        page={page - 1}
        rowsPerPage={limit}
        refreshTable={() => fetchContas(page, limit, categoria, month, year)}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleRowsPerPageChange}
      />}
    </Stack>
  );
}

