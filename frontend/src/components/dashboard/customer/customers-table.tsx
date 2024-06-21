'use client';

import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Divider from '@mui/material/Divider';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import { ArrowCircleUp, ArrowCircleDown } from '@phosphor-icons/react/dist/ssr';
import IconButton from '@mui/material/IconButton';
import { TrashSimple, PencilSimple } from '@phosphor-icons/react/dist/ssr';
import { EditCustomerButton } from './customers-edit-button';
import CustomersEditModal from './customers-edit-modal';
import { positions } from '@mui/system';
import MessageModal from './message-modal';

function noop(): void {
  // do nothing
}

export interface Customer {
  id: string;
  type: string;
  avatar: string;
  name: string;
  email: string;
  address: { city: string; state: string; country: string; street: string };
  phone: string;
  createdAt: Date;
}

interface CustomersTableProps {
  count?: number;
  page?: number;
  rows?: Customer[];
  rowsPerPage?: number;
}

export function CustomersTable({
  count = 0,
  rows = [],
  page = 0,
  rowsPerPage = 0,
}: CustomersTableProps): React.JSX.Element {

  const [openCustomersModal, setOpenCustomersModal] = React.useState(false);
  const [openMessageModal, setOpenMessageModal] = React.useState(false);


  return (
    <Card>
      <Box sx={{ overflowX: 'auto' }}>
        <Table sx={{ minWidth: '800px' }}>
          <TableHead>
            <TableRow>
              <TableCell>Tipo</TableCell>
              <TableCell>Descrição</TableCell>
              <TableCell>Observações</TableCell>
              <TableCell>Inclusão</TableCell>
              <TableCell>Valor</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => {


              return (
                <TableRow hover key={row.id}>
                  <TableCell>
                    {row.type === 'entrada'
                      ?
                      <ArrowCircleUp size={30} color='#1AA918' weight="fill" />
                      :
                      <ArrowCircleDown size={30} color='#BF1515' weight="fill" />}
                  </TableCell>

                  <TableCell>
                    <Typography variant="subtitle2">{row.name}</Typography>
                  </TableCell>
                  <TableCell>{row.email}</TableCell>
                  <TableCell>{'20/12/2024 - 12:22'}</TableCell>
                  <TableCell>
                    {'R$ 55,34'}
                  </TableCell>
                  <TableCell>

                    {/* <IconButton aria-label="delete">
                      <TrashSimple size={20} color='#737A78' weight="fill"/>
                    </IconButton>

                    <IconButton aria-label="delete">
                      <PencilSimple size={20} color='#737A78' weight="fill"/>
                    </IconButton> */}

                    <Box sx={{ display: 'flex', gap: 1 }}>
                      <IconButton aria-label="delete" onClick={() => setOpenMessageModal(true)}>
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
        component="div"
        count={count}
        onPageChange={noop}
        onRowsPerPageChange={noop}
        page={page}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
      />
      <div>
        <CustomersEditModal isOpen={openCustomersModal} setOpenModal={() => setOpenCustomersModal(!openCustomersModal)} />
        <MessageModal isOpen={openMessageModal} setOpenModal={() => setOpenMessageModal(!openMessageModal)}/>
      </div>
    </Card>

  );
}
