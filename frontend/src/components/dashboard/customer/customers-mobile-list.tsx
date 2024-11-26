'use client';

import { ITransacao } from '@/services/api/transacoes/ITransacao';
import { TransacoesService } from '@/services/api/transacoes/TransacoesService';
import { Box, Typography } from '@mui/material';
import { ArrowCircleDown, ArrowCircleUp, Trash } from '@phosphor-icons/react';
import React, { useEffect, useState } from 'react';
import SwipeToDelete from 'react-swipe-to-delete-ios';
import SaveTransactionModal from './modals/transaction-save-modal';
import { useCategorias } from '@/contexts/CategoriaContext';

interface MobileListProps {
    rows?: ITransacao[];
    onRowsPerPageChange: (newLimit: number) => void;
    refreshTable: () => void;
}

export function MobileList({ rows = [], onRowsPerPageChange, refreshTable }: MobileListProps): React.JSX.Element {


    const selectedContaData: ITransacao = {
        id: '',
        tipo: '',
        categoria: { id: '', titulo: '' },
        observacao: '',
        createdAt: '',
        valor: 0,
        data: new Date(),
        foiRecebida: true,
        repetir: false,
        periodoRepeticao: undefined,
        quantidadeRepeticoes: undefined
    };

    const [selectedConta, setSelectedConta] = React.useState<ITransacao>(selectedContaData);
    const [currentPage, setCurrentPage] = useState(10);
    const [openSaveTransactionModal, setOpenSaveTransactionModal] = React.useState(false);
    const { categorias, fetchCategorias } = useCategorias();

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
        fetchCategorias();
        setSelectedConta(transacao);
        setOpenSaveTransactionModal(true);
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

            <SaveTransactionModal 
                isOpen={openSaveTransactionModal}
                onClose={() => setOpenSaveTransactionModal(!openSaveTransactionModal)}
                categorias={categorias}
                refreshTable={refreshTable}
                transactionType={selectedConta.tipo}
                transactionSelect={selectedConta} 
            />

        </Box>
    );
}
