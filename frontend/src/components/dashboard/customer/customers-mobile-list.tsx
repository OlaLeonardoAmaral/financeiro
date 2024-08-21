'use client';

import { ApiException } from '@/services/api/ApiException';
import { ITransacao } from '@/services/api/transacoes/ITransacao';
import { Box, Card, Typography, Divider } from '@mui/material';
import { ArrowCircleDown, ArrowCircleUp, Trash } from '@phosphor-icons/react';
import React, { use, useEffect, useRef, useState } from 'react';
import SwipeToDelete from 'react-swipe-to-delete-ios';
import MessageModal from './message-modal';
import { TransacoesService } from '@/services/api/transacoes/TransacoesService';
import CustomersEditModal from './customers-edit-modal';

interface MobileListProps {
    rows?: ITransacao[];
    onRowsPerPageChange: (newLimit: number) => void;
    onEditCustomer: () => void;
}

export function MobileList({ rows = [], onRowsPerPageChange, onEditCustomer }: MobileListProps): React.JSX.Element {


    const selectedContaData: ITransacao = {
        id: '',
        tipo: '',
        categoria: { id: '', titulo: '' },
        observacao: '',
        createdAt: '',
        valor: 0,
        data: ''
    };

    const [selectedConta, setSelectedConta] = React.useState<ITransacao>(selectedContaData);
    const [currentPage, setCurrentPage] = useState(10);
    const [openCustomersModal, setOpenCustomersModal] = React.useState(false);

    useEffect(() => {
        onRowsPerPageChange(currentPage);
    }, [currentPage])

    useEffect(() => {
        const intersectionObserver = new IntersectionObserver(entries => {
            if (entries.some(entry => entry.isIntersecting)) {
                setCurrentPage((currentValue) => currentValue + 10);
            }
        })

        const sentinelaElement = document.querySelector('#sentinela');

        if (sentinelaElement) {
            intersectionObserver.observe(sentinelaElement);
        }

        return () => intersectionObserver.disconnect();
    }, []);

    const handleDelete = async (id: string) => {
        await TransacoesService.deleteById(id);
    };

    const handleEditClick = (transacao: ITransacao) => {
        setSelectedConta(transacao);
        setOpenCustomersModal(true);
    };


    return (
        <Box sx={{ padding: 2 }}>
            {rows.map((row, index) => (
                <SwipeToDelete
                    key={row.id}
                    id={row.id}
                    deleteComponent={<Trash size={35} />}
                    onDelete={() => handleDelete(row.id)}
                    deleteColor="red"
                    deleteWidth={75}
                    height={79}
                    disabled={false}
                >
                    <Box
                        sx={{ display: 'flex', alignItems: 'center', gap: 2, marginBottom: '0.1px', padding: 2, backgroundColor: 'white' }}
                        onClick={() => handleEditClick(row)}
                    >
                        {row.tipo.toUpperCase() === 'RECEITA' ? (
                            <ArrowCircleUp size={35} color='#1AA918' weight="fill" />
                        ) : (
                            <ArrowCircleDown size={35} color='#BF1515' weight="fill" />
                        )}
                        <Box sx={{ flexGrow: 1 }}>
                            <Typography variant="subtitle1">
                                {row.categoria.titulo}
                            </Typography>
                            <Typography variant="body2">
                                {new Date(row.data).toLocaleDateString('pt-BR')}
                            </Typography>
                        </Box>
                        <Typography variant="h6">
                            {`R$ ${row.valor}`}
                        </Typography>
                    </Box>
                </SwipeToDelete>
            ))}
            <div id="sentinela" />
            <CustomersEditModal
                isOpen={openCustomersModal}
                setOpenModal={() => setOpenCustomersModal(!openCustomersModal)}
                onEditCustomer={onEditCustomer}
                selectedConta={selectedConta}
            />
        </Box>
    );
}
