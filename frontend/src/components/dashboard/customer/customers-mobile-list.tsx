'use client';

import { useCategorias } from '@/contexts/CategoriaContext';
import { ITransacao } from '@/services/api/transacoes/ITransacao';
import { Box, Button, IconButton, Typography } from '@mui/material';
import { DotOutline, GreaterThan, LessThan, Trash } from '@phosphor-icons/react';
import React, { useEffect, useState } from 'react';
import { MonthYearSelectorModal } from './modals/month-year-select-modal';
import SaveTransactionModal from './modals/transaction-save-modal';
import dayjs from 'dayjs';
dayjs.locale("pt-br");

interface MobileListProps {
    rows?: ITransacao[];
    onRowsPerPageChange: (newLimit: number) => void;
    refreshTable: () => void;
    onMonthChange: (newMonth: number) => void;
    onYearChange: (newYear: number) => void;
}


const boxContainerStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'background.paper',
    padding: '16px',
    borderRadius: '8px',
    boxShadow: 2,
    marginBottom: 2,
};

const iconButtonStyle = {
    backgroundColor: 'primary.main',
    color: 'common.white',
    '&:hover': {
        backgroundColor: 'primary.dark',
    },
};

const buttonStyle = {
    fontSize: '18px',
    fontWeight: 'bold',
    textTransform: 'none',
    color: 'text.primary',
    '&:hover': {
        color: 'primary.main',
    },
};

const cardStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: 1,
    marginBottom: '0.1px',
    padding: 2,
    backgroundColor: 'white',
    cursor: 'pointer',
    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
    '&:hover': {
        transform: 'scale(1.02)',
        boxShadow: 3,
        borderRadius: 1
    },
};

const iconStyle = (tipo: string, foiRecebida: boolean) => ({
    color: tipo.toUpperCase() === 'RECEITA' ? 'green' : 'red',
    weight: foiRecebida ? 'fill' as const : 'regular' as const,
});

const amountStyle = (tipo: string) => ({
    color: tipo.toUpperCase() === 'RECEITA' ? 'green' : 'red',
});

const formatDate = (date: Date) => {
    const formattedDate = dayjs(date).format("ddd, DD");
    return formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);
};


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
        quantidadeRepeticoes: undefined,
        isParcela: false
    };

    const [selectedConta, setSelectedConta] = React.useState<ITransacao>(selectedContaData);
    const [currentPage, setCurrentPage] = useState(10);
    const [currentMonth, setCurrentMonth] = useState(dayjs().month() + 1);
    const [currentYear, setCurrentYear] = useState(dayjs().year());
    const [openSaveTransactionModal, setOpenSaveTransactionModal] = React.useState(false);
    const { categorias, fetchCategorias } = useCategorias();


    useEffect(() => {
        onRowsPerPageChange(currentPage);
    }, [currentPage])

    useEffect(() => {
        onMonthChange(currentMonth);
        onYearChange(currentYear);
    }, [currentMonth, currentYear])

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

    const months = [
        'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
        'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
    ];

    const handleMonthChange = (month: number) => {

        if (month === 13) {
            month = 1;
            const year = currentYear + 1;
            setCurrentYear(year)
        } else if (month === 0) {
            month = 12;
            const year = currentYear - 1;
            setCurrentYear(year)
        }

        setCurrentMonth(month)
    }

    const handleEditClick = (transacao: ITransacao) => {
        fetchCategorias();
        setSelectedConta(transacao);
        setOpenSaveTransactionModal(true);
    };

    const [isModalMonthYearSelectOpen, setIsModalMonthYearSelectOpen] = React.useState(false);

    const handleOpenModal = () => setIsModalMonthYearSelectOpen(true);
    const handleCloseModal = () => setIsModalMonthYearSelectOpen(false);

    const handleSelectMonthYear = (month: number, year: number) => {
        setCurrentMonth(month);
        setCurrentYear(year);
    };



    return (
        <Box sx={{ padding: 2 }}>
            <Box sx={boxContainerStyle}>
                <IconButton onClick={() => handleMonthChange(currentMonth - 1)} sx={iconButtonStyle}>
                    <LessThan size={24} weight="bold" />
                </IconButton>

                <Button
                    variant="text"
                    onClick={handleOpenModal}
                    sx={buttonStyle}
                >
                    {months[currentMonth - 1]} {currentYear}
                </Button>

                <IconButton onClick={() => handleMonthChange(currentMonth + 1)} sx={iconButtonStyle}>
                    <GreaterThan size={24} weight="bold" />
                </IconButton>
            </Box>


            {rows.map((row, index) => (
                <Box
                    sx={cardStyle}
                    onClick={() => handleEditClick(row)}
                    key={row.id}
                >
                    <DotOutline size={36}
                        color={iconStyle(row.tipo, row.foiRecebida).color}
                        weight={iconStyle(row.tipo, row.foiRecebida).weight}

                    />

                    <Box sx={{ flexGrow: 1 }}>
                        <Typography variant="subtitle1">
                            {((row.observacao || row.categoria.titulo).length > 17
                                ? (row.observacao || row.categoria.titulo).slice(0, 17) + "..."
                                : row.observacao || row.categoria.titulo)} {row.isParcela && `(${row.numeroParcela}/${row.totalParcelas})`}
                        </Typography>
                        <Typography variant="body2">
                            {row.categoria.titulo} - {formatDate(row.data)}
                        </Typography>
                    </Box>
                    <Typography variant="h6" sx={amountStyle(row.tipo)}>
                        {row.tipo.toUpperCase() === 'RECEITA' ? `R$ ${row.valor}` : `-R$ ${row.valor}`}
                    </Typography>
                </Box>
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

            <MonthYearSelectorModal
                open={isModalMonthYearSelectOpen}
                currentMonth={currentMonth}
                currentYear={currentYear}
                onClose={handleCloseModal}
                onSelect={handleSelectMonthYear}
            />

        </Box>
    );
}
