'use client';

import React, { useState, ChangeEvent } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  IconButton,
  Switch,
  ToggleButtonGroup,
  ToggleButton,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  InputAdornment,
  Stack,
  SelectChangeEvent,
} from '@mui/material';
import {
  X as CloseIcon,
  Calculator,
  CalendarBlank,
  BookmarkSimple,
  ArrowClockwise,
} from '@phosphor-icons/react';

import { styled } from '@mui/material/styles';
import DatePickerModal from './DatePickerModal';
import { ICategoria } from '@/services/api/transacoes/ICategoria';

interface AddTransactionProps {
  open: boolean;
  onClose: () => void;
  // categorias: ICategoria[];
}

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

export const AddTransaction: React.FC<AddTransactionProps> = ({
  open = true,
  onClose,
  // categorias
}) => {

  const handleDateTypeChange = (
    event: React.MouseEvent<HTMLElement>,
    newDateType: string,
  ) => {
    if (newDateType !== null) {
      if (newDateType === 'other') {
        updateField('isCalendarOpen',true);
      } else {
        updateField('dataType', newDateType);
      }
    }
  };


  const formatDatePtBR = (date: Date) => {
    const months = [
      'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
      'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
    ];

    const day = date.getDate();
    const month = months[date.getMonth()];

    return `${day} de ${month.slice(0, 3)}`;
  };

  const handleDateSelect = (date: Date) => {
    updateField('dataType', 'other');
    updateField('selectedDate', date);

    console.log('Selected date:', date);
  };



  //// Controle da mascara do valor 
  const [amount, setAmount] = useState<string>('');

  const formatCurrency = (value: string): string => {
    // Remove tudo que não for dígito
    const digits = value.replace(/\D/g, '');

    // Converte para número e divide por 100 para ter o valor decimal
    const numberValue = Number(digits) / 100;

    // Retorna string vazia se não houver valor
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
    // Remove tudo que não for dígito
    const cleanValue = input.replace(/\D/g, '');
    setAmount(cleanValue);
  };
  ////////////



    const handleSave = async () => {
      // setLoading(true);
      // const formData: ITransacaoCreate = {
      //     tipo,
      //     categoriaId,
      //     observacao: values.observacoes,
      //     valor: parseFloat(values.numberformat),
      //     data: values.textmask
      // };

      // await TransacoesService.create(formData);
      // setLoading(false);
      // onAddCustomer();
      // handleCancel();

      console.log(formState, amount)
  };


  
  
  
  
  
  const categorias: ICategoria[] = [
    { id: '1', titulo: 'Alimentação' },
    { id: '2', titulo: 'Educação' },
  ];
  
  const [formState, setFormState] = useState({
    dateType: 'today',
    isReceived: true,
    repeat: false,
    repeatTimes: '2',
    repeatPeriod: 'months',
    isCalendarOpen: false,
    description: '',
    selectedDate: new Date(),
    categoriaId: categorias[0]?.id || '',
  });
  
  const updateField = (field: string, value: any) => {
    setFormState((prev) => ({ ...prev, [field]: value }));
  };



  return (
    <StyledDialog open={open} onClose={onClose} fullWidth>
      <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        Nova receita
        <IconButton onClick={onClose} size="medium">
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent>
        <Stack spacing={3}>

          {/* Amount Input */}
          <TextField
            fullWidth
            value={formatCurrency(amount)}
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

          {/* Received Switch */}
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <span>Foi recebida</span>
            <Switch
              checked={formState.isReceived}
              onChange={(e) => updateField('isReceived', e.target.checked)}
              color="success"
            />
          </Stack>

          {/* Date Toggle Buttons */}
          <StyledToggleButtonGroup
            value={formState.dateType}
            exclusive
            onChange={(e, value) => updateField('dateType', value || formState.dateType)}
            fullWidth
          >
            <ToggleButton value="today">
              <CalendarBlank weight="bold" style={{ marginRight: 8 }} />
              Hoje
            </ToggleButton>
            <ToggleButton value="yesterday">Ontem</ToggleButton>

            <ToggleButton value="other" onClick={ handleDateTypeChange}>

              {formState.dateType === 'other'
                ? formatDatePtBR(formState.selectedDate)
                : 'Outros...'}

            </ToggleButton>
          </StyledToggleButtonGroup>

          <DatePickerModal
            open={formState.isCalendarOpen}
            onClose={() => updateField('isCalendarOpen',false)}
            onDateSelect={handleDateSelect}
          />



          {/* Description Input */}
          <TextField
            fullWidth
            placeholder="Descrição"
            onChange={(e) => updateField('description', e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <BookmarkSimple />
                </InputAdornment>
              ),
            }}
          />

          {/* Category Select */}
          <FormControl fullWidth>
            <InputLabel>Categoria</InputLabel>
            <Select
              label="Categoria"
              onChange={(e) => updateField('categoriaId', e.target.value)}
              value={formState.categoriaId}
            >
              {categorias.map(categoria => {
                return <MenuItem value={categoria.id} key={categoria.id}>
                  {categoria.titulo}
                </MenuItem>
              })};

            </Select>
          </FormControl>

          {/* Repeat Section */}
          <Stack spacing={2}>
            <Stack direction="row" justifyContent="space-between" alignItems="center">
              <Stack direction="row" alignItems="center" spacing={1}>
                <ArrowClockwise />
                <span>Repetir</span>
              </Stack>
              <Switch
                checked={formState.repeat}
                onChange={(e) => updateField('repeat', e.target.checked)}
              />
            </Stack>

            {formState.repeat && (
              <Stack direction="row" spacing={2} alignItems="center">
                <TextField
                  value={formState.repeatTimes}
                  onChange={(e) => updateField('repeatTimes', e.target.value)}
                  type="number"
                  size="small"
                  sx={{ width: 300 }}
                />
                <span>vezes</span>
                <FormControl fullWidth size="small">
                  <Select
                    value={formState.repeatPeriod}
                    onChange={(e) => updateField('repeatPeriod', e.target.value)}
                  >
                    <MenuItem value="months">Meses</MenuItem>
                    <MenuItem value="weeks">Semanas</MenuItem>
                  </Select>
                </FormControl>
              </Stack>
            )}
          </Stack>
        </Stack>
      </DialogContent>

      <DialogActions sx={{ p: 2, gap: 1 }}>
        {/* <Button
          variant="outlined"
          color="success"
          fullWidth
          onClick={onClose}
        >
          SALVAR E CRIAR NOVA
        </Button> */}
        <Button
          variant="contained"
          color="success"
          fullWidth
          onClick={handleSave}
        >
          SALVAR
        </Button>
      </DialogActions>
    </StyledDialog>
  );
};

export default AddTransaction;