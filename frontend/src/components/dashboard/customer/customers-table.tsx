'use client';

import { type IContas } from '@/services/api/IContas';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import { ArrowCircleDown, ArrowCircleUp, PencilSimple, TrashSimple } from '@phosphor-icons/react/dist/ssr';
import * as React from 'react';
import CustomersEditModal from './customers-edit-modal';
import MessageModal from './message-modal';

interface CustomersTableProps {
  count?: number;
  rows?: IContas[];
  onDeleteCustomer: () => void;
}

export function CustomersTable({
  count = 0,
  rows = [],
  onDeleteCustomer,
}: CustomersTableProps): React.JSX.Element {

  const [selectedId, setSelectedId] = React.useState('');
  const [selectedType, setSelectedType] = React.useState('');

  const [openCustomersModal, setOpenCustomersModal] = React.useState(false);
  const [openMessageModal, setOpenMessageModal] = React.useState(false);

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handlePageChange = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(Number(event.target.value));
    setPage(0);
  };

  const handleDeleteClick = (id: string, tipo: string) => {
    setSelectedId(id);
    setSelectedType(tipo);
    setOpenMessageModal(true);
  };

  return (
    <Card>
      <Box sx={{ overflowX: 'auto' }}>
        <Table sx={{ minWidth: '800px' }}>
          <TableHead>
            <TableRow>
              <TableCell>Tipo</TableCell>
              <TableCell>Descrição</TableCell>
              <TableCell>Observações</TableCell>
              <TableCell>Data</TableCell>
              <TableCell>Valor</TableCell>
              <TableCell />
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover key={row.id}>
                    <TableCell>
                      {row.tipoCad.toUpperCase() === 'RECEITA'
                        ?
                        <ArrowCircleUp size={30} color='#1AA918' weight="fill" />
                        :
                        <ArrowCircleDown size={30} color='#BF1515' weight="fill" />}
                    </TableCell>

                    <TableCell>
                      <Typography variant="subtitle2">{row.titulo}</Typography>
                    </TableCell>

                    <TableCell>{row.observacao}</TableCell>

                    <TableCell>{row.data}</TableCell>

                    <TableCell>
                      {`R$ ${row.valor}`}
                    </TableCell>

                    <TableCell>
                      <Box sx={{ display: 'flex', gap: 1 }}>
                        <IconButton aria-label="delete" onClick={() => handleDeleteClick(row.id, row.tipoCad)}>
                          <TrashSimple size={20} color='#737A78' weight="fill" />
                        </IconButton>

                        <IconButton aria-label="edit" onClick={() => setOpenCustomersModal(true)}>
                          <PencilSimple size={20} color='#737A78' weight="fill" />
                        </IconButton>
                      </Box>
                    </TableCell>

                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </Box>

      <Divider />
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={count}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleRowsPerPageChange}
      />
      <div>
        <CustomersEditModal isOpen={openCustomersModal} setOpenModal={() => setOpenCustomersModal(!openCustomersModal)} />
        <MessageModal
          isOpen={openMessageModal}
          setOpenModal={() => setOpenMessageModal(!openMessageModal)}
          onDeleteCostumer={onDeleteCustomer}
          selectedId={selectedId} 
          selectedType={selectedType}/>
      </div>
    </Card>

  );
}
