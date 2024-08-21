'use client';

import { ApiException } from '@/services/api/ApiException';
import { ITransacao } from '@/services/api/transacoes/ITransacao';
import { Box, Card, Typography, Divider } from '@mui/material';
import { ArrowCircleDown, ArrowCircleUp } from '@phosphor-icons/react';
import React, { use, useEffect, useState } from 'react';
import { TransacoesService } from '@/services/api/transacoes/TransacoesService';

interface MobileListProps {
    rows?: ITransacao[];
    onRowsPerPageChange: (newLimit: number) => void;
}

export function MobileList({ rows = [], onRowsPerPageChange }: MobileListProps): React.JSX.Element {
    const [currentPage, setCurrentPage] = useState(10);


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



    return (
        <Box sx={{ padding: 2 }}>
            {rows.map((row, index) => (
                <React.Fragment key={row.id}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, margin: '2px 0px', padding: 2 }}>
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
                    {index < rows.length - 1 && <Divider sx={{ backgroundColor: '#333' }} />}
                </React.Fragment>
            ))}
            <div id="sentinela" />
        </Box>
    );
}
