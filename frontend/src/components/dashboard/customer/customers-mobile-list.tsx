'use client';

import { useCategorias } from '@/contexts/CategoriaContext';
import { ITransacao } from '@/services/api/transacoes/ITransacao';
import { Box, IconButton, Typography } from '@mui/material';
import { DotOutline, GreaterThan, LessThan, Trash } from '@phosphor-icons/react';
import React, { useEffect, useState } from 'react';
import SwipeToDelete from 'react-swipe-to-delete-ios';
import MessageModal from './modals/message-modal';
import SaveTransactionModal from './modals/transaction-save-modal';
import dayjs from 'dayjs';

interface MobileListProps {
    rows?: ITransacao[];
    onRowsPerPageChange: (newLimit: number) => void;
    refreshTable: () => void;
    onMonthChange: (newMonth: number) => void;
    onYearChange: (newYear: number) => void;
}



export function MobileList({ rows = [], onRowsPerPageChange, refreshTable, onMonthChange, onYearChange }: MobileListProps): React.JSX.Element {


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
    const [currentMonth, setCurrentMonth] = useState(dayjs().month() + 1);
    const [currentYear, setCurrentYear] = useState(dayjs().year());
    const [openSaveTransactionModal, setOpenSaveTransactionModal] = React.useState(false);
    const { categorias, fetchCategorias } = useCategorias();
    const [selectedId, setSelectedId] = React.useState('');
    const [openMessageModal, setOpenMessageModal] = React.useState(false);

    
    useEffect(() => {
        onRowsPerPageChange(currentPage);
    }, [currentPage])
    
    useEffect(() => {
        const intersectionObserver = new IntersectionObserver(entries => {
            if (entries.some(entry => entry.isIntersecting)) {
                setCurrentPage((currentValue) =>  currentValue + 10);
            }
        })
        
        const sentinelaElement = document.querySelector('#sentinela');
        
        if (sentinelaElement) {
            intersectionObserver.observe(sentinelaElement);
        }
        
        return () => intersectionObserver.disconnect();
    }, []);
    
    
    const months = [
        'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
        'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
    ];

    const handleMonthChange = (month: number) => {

        if (month === 13) {
            month = 1;
            const year = currentYear + 1;
            handleYearChange(year)
        } else if (month === 0) {
            month = 12;
            const year = currentYear - 1;
            handleYearChange(year)
        }

        setCurrentMonth(month)
        onMonthChange(month);
    }


    const handleYearChange = (year: number) => {
        setCurrentYear(year)
        onYearChange(year);
    }


    const handleDelete = async (id: string) => {
        // await TransacoesService.deleteById(id);

        setSelectedId(id);
        setOpenMessageModal(true);
    };

    const handleEditClick = (transacao: ITransacao) => {
        fetchCategorias();
        setSelectedConta(transacao);
        setOpenSaveTransactionModal(true);
    };



    return (
        <Box sx={{ padding: 2 }}>


            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, marginBottom: 2 }}>
                <IconButton onClick={() => handleMonthChange(currentMonth - 1)}>
                    <LessThan size={28} weight="bold" />
                </IconButton>

                <Typography variant="h5">
                    {months[currentMonth - 1]} {currentYear}
                </Typography>

                <IconButton onClick={() => handleMonthChange(currentMonth + 1)}>
                    <GreaterThan size={28} weight="bold" />
                </IconButton>
            </Box>


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
                        sx={{ display: 'flex', alignItems: 'center', gap: 1, marginBottom: '0.1px', padding: 2, backgroundColor: 'white' }}
                        onClick={() => handleEditClick(row)}
                    >

                        <DotOutline size={36}
                            color={row.tipo.toUpperCase() === 'RECEITA'
                                ? 'green'
                                : 'red'}
                            weight={row.foiRecebida ? "fill" : "regular"} />

                        <Box sx={{ flexGrow: 1 }}>
                            <Typography variant="subtitle1">
                                {row.categoria.titulo}
                            </Typography>
                            <Typography variant="body2">
                                {new Date(row.data).toLocaleDateString('pt-BR')}
                            </Typography>
                        </Box>
                        <Typography variant="h6" sx={{ color: row.tipo.toUpperCase() === 'RECEITA' ? 'green' : 'red' }}>
                            {row.tipo.toUpperCase() === 'RECEITA' ? `R$ ${row.valor}` : `-R$ ${row.valor}`}
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

            <MessageModal
                isOpen={openMessageModal}
                setOpenModal={() => setOpenMessageModal(!openMessageModal)}
                onDeleteCostumer={refreshTable}
                selectedId={selectedId} />

        </Box>
    );
}
