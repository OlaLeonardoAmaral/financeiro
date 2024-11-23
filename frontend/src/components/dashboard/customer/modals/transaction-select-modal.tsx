'use client';

import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { CurrencyDollar, Coins } from '@phosphor-icons/react/dist/ssr'; // Ícones Phosphor

interface AddTransactionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddIncome: () => void;
  onAddExpense: () => void;
}

export function TransactionSelectModal({
  isOpen,
  onClose,
  onAddIncome,
  onAddExpense,
}: AddTransactionModalProps): React.JSX.Element {
  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      PaperProps={{
        sx: {
          padding: 3,
          borderRadius: 2,
          boxShadow: '0px 8px 24px rgba(0, 0, 0, 0.15)',
          maxWidth: '400px',
          width: '100%',
          backgroundColor: '#f7f7f7',
        },
      }}
    >
      <DialogContent
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 2,
        }}
      >
        <Typography variant="h6" sx={{ marginBottom: 2, fontWeight: 'bold' }}>
          Selecione a Transação
        </Typography>

        {/* Botão para Receita */}
        <Button
          onClick={onAddIncome}
          fullWidth
          variant="contained"
          startIcon={<CurrencyDollar weight="fill" />}
          sx={{
            backgroundColor: '#4caf50',
            color: '#fff',
            padding: '1rem',
            fontSize: '1.1rem',
            fontWeight: 'bold',
            borderRadius: '8px',
            boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.2)',
            '&:hover': { backgroundColor: '#43a047' },
          }}
        >
          Receita
        </Button>

        {/* Botão para Despesa */}
        <Button
          onClick={onAddExpense}
          fullWidth
          variant="contained"
          startIcon={<Coins weight="fill" />}
          sx={{
            backgroundColor: '#e53935',
            color: '#fff',
            padding: '1rem',
            fontSize: '1.1rem',
            fontWeight: 'bold',
            borderRadius: '8px',
            boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.2)',
            '&:hover': { backgroundColor: '#d32f2f' },
          }}
        >
          Despesa
        </Button>
      </DialogContent>
    </Dialog>
  );
}
