import React, { ChangeEvent, useEffect, useState } from 'react';
import { ICategoria } from '@/services/api/transacoes/ICategoria';
import { ITransacao } from '@/services/api/transacoes/ITransacao';
import { ITransacaoCreate } from '@/services/api/transacoes/ITransicaoCreate';
import { TransacoesService } from '@/services/api/transacoes/TransacoesService';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  Switch,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import {
  ArrowClockwise,
  BookmarkSimple,
  Calculator,
  CalendarBlank,
  X as CloseIcon,
  Minus,
  Plus,
} from '@phosphor-icons/react';

import DatePickerModal from './datePicker-modal';
import MessageModal from './message-modal';

interface AddTransactionProps {
  isOpen: boolean;
  onClose: () => void;
  categorias: ICategoria[];
  refreshTable: () => void;
  transactionType: string;
  transactionSelect?: ITransacao;
}

const styleButtonDelete = {
  backgroundColor: '#F11414',
  color: 'white',
  font: 'semibold',
};

const StyledDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialog-paper': {
    width: '100%',
    maxWidth: 400,
    margin: theme.spacing(2),
    borderRadius: theme.spacing(1),
  },
}));

const StyledToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
  '& .MuiToggleButton-root': {
    border: 'none',
    borderRadius: theme.spacing(1),
    padding: theme.spacing(1, 2),
    textTransform: 'none',
    '&.Mui-selected': {
      backgroundColor: '#4CAF50',
      color: 'white',
      '&:hover': {
        backgroundColor: '#45a049',
      },
    },
  },
}));

export function SaveTransactionModal({
  isOpen,
  onClose,
  categorias,
  refreshTable,
  transactionType,
  transactionSelect,
}: AddTransactionProps): React.JSX.Element {
  const initialFormState = {
    amount: transactionSelect?.valor?.toString() || '',
    isReceived: transactionSelect?.foiRecebida !== undefined ? transactionSelect.foiRecebida : true,
    repeat: transactionSelect?.repetir || false,
    repeatTimes: transactionSelect?.quantidadeRepeticoes || 2,
    repeatPeriod: transactionSelect?.periodoRepeticao || 'Mensal',
    isCalendarOpen: false,
    description: transactionSelect?.observacao || '',
    selectedDate: transactionSelect?.data ? new Date(transactionSelect.data) : new Date(),
    categoriaId: transactionSelect?.categoria?.id || categorias[0]?.id || '',
    isParcela: transactionSelect?.isParcela,
  };

  const handleDateTypeChange = (event: React.MouseEvent<HTMLElement>, newDateType: string) => {
    if (newDateType !== null) {
      if (newDateType === 'other') {
        updateField('isCalendarOpen', true);
      } else {
        updateField('dataType', newDateType);
      }
    }
  };

  const formatDatePtBR = (date: Date) => {
    const months = [
      'Janeiro',
      'Fevereiro',
      'Março',
      'Abril',
      'Maio',
      'Junho',
      'Julho',
      'Agosto',
      'Setembro',
      'Outubro',
      'Novembro',
      'Dezembro',
    ];

    const day = date.getDate();
    const month = months[date.getMonth()];

    return `${day} de ${month}`;
  };

  const handleDateSelect = (date: Date) => {
    updateField('selectedDate', date);
  };

  const getCurrentDateFormatted = (dataFormat: Date) => {
    const day = String(dataFormat.getDate()).padStart(2, '0');
    const month = String(dataFormat.getMonth() + 1).padStart(2, '0');
    const year = dataFormat.getFullYear();
    return `${day}/${month}/${year}`;
  };

  function parseCurrency(formattedValue: string): number {
    let numericValue = formattedValue.replace(/[^\d,.-]/g, '');
    numericValue = numericValue.replace(/\.(?=\d{3},)/g, '');
    numericValue = numericValue.replace(',', '.');
    return parseFloat(numericValue);
  }

  //// Controle da mascara do valor
  const formatCurrency = (value: string): string => {
    const digits = value.replace(/\D/g, '');
    const numberValue = Number(digits) / 100;
    if (!numberValue) return '';

    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(numberValue);
  };

  const handleAmountChange = (event: ChangeEvent<HTMLInputElement>) => {
    const input = event.target.value;
    const cleanValue = input.replace(/\D/g, '');
    updateField('amount', cleanValue);
  };
  ////////////

  const [formState, setFormState] = useState(initialFormState);

  useEffect(() => {
    setFormState({
      amount: transactionSelect?.valor?.toString() || '',
      isReceived: transactionSelect?.foiRecebida !== undefined ? transactionSelect.foiRecebida : true,
      repeat: transactionSelect?.repetir || false,
      repeatTimes: transactionSelect?.quantidadeRepeticoes || 2,
      repeatPeriod: transactionSelect?.periodoRepeticao || 'Mensal',
      isCalendarOpen: false,
      description: transactionSelect?.observacao || '',
      selectedDate: transactionSelect?.data ? new Date(transactionSelect.data) : new Date(),
      categoriaId: transactionSelect?.categoria?.id || categorias[0]?.id || '',
      isParcela: transactionSelect?.isParcela,
    });
  }, [transactionSelect, categorias]);

  useEffect(() => {
    if (!isOpen) {
      setFormState(initialFormState);
    }
  }, [isOpen]);

  enum PeriodoRepeticao {
    Mensal = 'Mensal',
    Semanal = 'Semanal',
  }

  const handleSave = async () => {
    const formData: ITransacaoCreate = {
      tipo: transactionType,
      categoriaId: formState.categoriaId,
      observacao: formState.description,
      valor: parseCurrency(formatCurrency(formState.amount)),
      data: getCurrentDateFormatted(formState.selectedDate),
      foiRecebida: formState.isReceived,
      repetir: formState.repeat,
      quantidadeRepeticoes: formState.repeat ? Number(formState.repeatTimes) : undefined,
      periodoRepeticao: formState.repeat ? (formState.repeatPeriod as PeriodoRepeticao) : undefined,
      isParcela: formState.isParcela || false,
    };

    if (transactionSelect) {
      await TransacoesService.updateById(transactionSelect.id, formData);
    } else {
      await TransacoesService.create(formData);
    }

    refreshTable();
    // setLoading(false);
    onClose();
  };

  const [selectedId, setSelectedId] = React.useState('');
  const [selectedIsParcela, setSelectedIsParcela] = React.useState(false);
  const [openMessageModal, setOpenMessageModal] = React.useState(false);

  const handleDelete = async (id: string, isParcela: boolean) => {
    setSelectedId(id);
    setSelectedIsParcela(isParcela);
    setOpenMessageModal(true);
  };

  const updateField = (field: string, value: any) => {
    setFormState((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <StyledDialog open={isOpen} onClose={onClose} fullWidth>
      <DialogTitle
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontSize: '1.5rem',
        }}
      >
        <span>
          {transactionSelect ? 'Editar' : 'Nova'}{' '}
          <span
            style={{
              color: transactionType === 'Receita' ? 'green' : 'red',
              fontWeight: 'bold',
            }}
          >
            {transactionType}
          </span>
        </span>

        <IconButton onClick={onClose} size="medium">
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent>
        <Stack spacing={3}>
          <TextField
            fullWidth
            value={formatCurrency(formState.amount)}
            onChange={handleAmountChange}
            placeholder="R$ 0,00"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Calculator />
                </InputAdornment>
              ),
            }}
          />

          <StyledToggleButtonGroup exclusive fullWidth>
            <Stack direction="row" justifyContent="space-between" alignItems="center" width="20rem">
              <span>Foi recebida</span>
              <Switch
                checked={formState.isReceived}
                onChange={(e) => updateField('isReceived', e.target.checked)}
                color="success"
              />
            </Stack>

            <ToggleButton value="other" onClick={handleDateTypeChange}>
              <CalendarBlank weight="bold" style={{ marginRight: 8 }} />
              {formatDatePtBR(formState.selectedDate)}
            </ToggleButton>
          </StyledToggleButtonGroup>

          <DatePickerModal
            open={formState.isCalendarOpen}
            onClose={() => updateField('isCalendarOpen', false)}
            onDateSelect={handleDateSelect}
          />

          <TextField
            fullWidth
            placeholder="Descrição"
            onChange={(e) => updateField('description', e.target.value)}
            value={formState.description}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <BookmarkSimple />
                </InputAdornment>
              ),
            }}
          />

          <FormControl fullWidth>
            <InputLabel>Categoria</InputLabel>
            <Select
              label="Categoria"
              onChange={(e) => updateField('categoriaId', e.target.value)}
              value={formState.categoriaId}
            >
              {categorias.map((categoria) => {
                return (
                  <MenuItem value={categoria.id} key={categoria.id}>
                    {categoria.titulo}
                  </MenuItem>
                );
              })}
              ;
            </Select>
          </FormControl>

          {!transactionSelect && (
            <Stack spacing={2}>
              <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Stack direction="row" alignItems="center" spacing={1}>
                  <ArrowClockwise />
                  <span>Repetir</span>
                </Stack>
                <Switch checked={formState.repeat} onChange={(e) => updateField('repeat', e.target.checked)} />
              </Stack>

              {formState.repeat && (
                <Stack direction="row" spacing={2} alignItems="center">
                  <TextField
                    value={formState.repeatTimes}
                    onChange={(e) => updateField('repeatTimes', e.target.value)}
                    type="number"
                    label="Quantidade"
                    size="small"
                    sx={{ width: 300 }}
                    inputProps={{ min: 2 }}
                  />

                  <FormControl fullWidth size="small">
                    <InputLabel id="label-periodo">Período</InputLabel>
                    <Select
                      labelId="label-periodo"
                      value={formState.repeatPeriod}
                      onChange={(e) => updateField('repeatPeriod', e.target.value)}
                      label="Período"
                    >
                      <MenuItem value="Mensal">Meses</MenuItem>
                      <MenuItem value="Semanal">Semanas</MenuItem>
                    </Select>
                  </FormControl>
                </Stack>
              )}
            </Stack>
          )}
        </Stack>
      </DialogContent>

      <DialogActions sx={{ p: 2, gap: 1 }}>
        <Button variant="contained" color="success" fullWidth onClick={handleSave}>
          Salvar
        </Button>

        {transactionSelect && (
          <Button
            variant="contained"
            fullWidth
            onClick={() => handleDelete(transactionSelect.id, transactionSelect.isParcela)}
            sx={{ ...styleButtonDelete }}
          >
            Excluir
          </Button>
        )}

        <MessageModal
          isOpen={openMessageModal}
          setOpenModal={() => setOpenMessageModal(!openMessageModal)}
          onDeleteCostumer={refreshTable}
          onCloseSaveModal={onClose}
          selectedId={selectedId}
          isParcela={selectedIsParcela}
        />
      </DialogActions>
    </StyledDialog>
  );
}

export default SaveTransactionModal;
