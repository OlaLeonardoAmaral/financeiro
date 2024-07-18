'use client';

import { type ITransacao } from '@/services/api/transacoes/ITransacao';
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
  rows?: ITransacao[];
  page: number;
  rowsPerPage: number;
  onDeleteCustomer: () => void;
  onEditCustomer: () => void;
  onPageChange: (newPage: number) => void;
  onRowsPerPageChange: (newLimit: number) => void;  
}




export function CustomersTable({
  count = 0,
  rows = [],
  page,
  rowsPerPage,
  onDeleteCustomer,
  onEditCustomer,
  onPageChange,
  onRowsPerPageChange
}: CustomersTableProps): React.JSX.Element {

  const selectedContaData: ITransacao = {
    id: '',
    tipo: '',
    categoria: { id: '', titulo: '' },
    observacao: '',
    createdAt: '',
    valor: 0,
    data: ''
  };

  const [selectedId, setSelectedId] = React.useState('');
  const [selectedConta, setSelectedConta] = React.useState<ITransacao>(selectedContaData);

  const [openCustomersModal, setOpenCustomersModal] = React.useState(false);
  const [openMessageModal, setOpenMessageModal] = React.useState(false);

  const handlePageChange = (event: unknown, newPage: number) => {
    onPageChange(newPage);
  };

  const handleRowsPerPageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onRowsPerPageChange(Number(event.target.value));
  };

  const handleDeleteClick = (id: string) => {
    setSelectedId(id);
    setOpenMessageModal(true);
  };

  const handleEditClick = (transacao: ITransacao) => {
    console.log(transacao)    
    setSelectedConta(transacao);
    setOpenCustomersModal(true);
  };

  return (
    <Card>
      <Box sx={{ overflowX: 'auto' }}>
        <Table sx={{ minWidth: '800px' }}>
          <TableHead>
            <TableRow>
              <TableCell>Tipo</TableCell>
              <TableCell>Categoria</TableCell>
              <TableCell>Observações</TableCell>
              <TableCell>Data</TableCell>
              <TableCell>Valor</TableCell>
              <TableCell />
            </TableRow>
          </TableHead>
          <TableBody>
            {rows              
              .map((row) => {
                return (
                  <TableRow hover key={row.id}>
                    <TableCell>
                      {row.tipo.toUpperCase() === 'RECEITA'
                        ?
                        <ArrowCircleUp size={30} color='#1AA918' weight="fill" />
                        :
                        <ArrowCircleDown size={30} color='#BF1515' weight="fill" />}
                    </TableCell>

                    <TableCell>
                      <Typography variant="subtitle2">{row.categoria.titulo}</Typography>  {/* Property 'titulo' does not exist on type 'string' */}
                    </TableCell>

                    <TableCell>{row.observacao}</TableCell>

                    <TableCell>{new Date(row.data).toLocaleDateString('pt-BR')}</TableCell>

                    <TableCell>
                      {`R$ ${row.valor}`}
                    </TableCell>

                    <TableCell>
                      <Box sx={{ display: 'flex', gap: 1 }}>
                        <IconButton aria-label="delete" onClick={() => handleDeleteClick(row.id)}>
                          <TrashSimple size={20} color='#737A78' weight="fill" />
                        </IconButton>

                        <IconButton aria-label="edit" onClick={() => handleEditClick(row)}>
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
        <CustomersEditModal
          isOpen={openCustomersModal}
          setOpenModal={() => setOpenCustomersModal(!openCustomersModal)}
          onEditCustomer={onEditCustomer}
          selectedConta={selectedConta}
        />
        <MessageModal
          isOpen={openMessageModal}
          setOpenModal={() => setOpenMessageModal(!openMessageModal)}
          onDeleteCostumer={onDeleteCustomer}
          selectedId={selectedId} />
      </div>
    </Card>

  );
}
