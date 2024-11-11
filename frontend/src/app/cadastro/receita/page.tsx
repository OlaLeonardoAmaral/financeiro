'use client';
// pages/AddTransaction.tsx

import React, { useState } from 'react';
import { Button, Select, MenuItem, Switch, TextField, IconButton, Modal, Typography, Divider } from '@mui/material';
import { useRouter } from "next/navigation";
import { ArrowLeft as ArrowBack, 
  Check, 
  Shield as Category, 
  ArrowsClockwise as Loop, 
  Note as Notes,
  Calendar as CalendarToday, 
  CaretDown as ExpandMore } from '@phosphor-icons/react';
import { styled } from '@mui/system';

const AddTransaction: React.FC = () => {
  const router = useRouter();
  const [type, setType] = useState<'income' | 'expense'>('income');
  const [isReceived, setIsReceived] = useState(true);
  const [dateOption, setDateOption] = useState('today');
  const [repeat, setRepeat] = useState(false);
  const [repeatCount, setRepeatCount] = useState(1);
  const [repeatFrequency, setRepeatFrequency] = useState('monthly');
  const [openModal, setOpenModal] = useState(false);

  const handleSave = () => {
    // Lógica de salvamento aqui
    router.push('/'); // Redirecionar após salvar
  };

  return (
    <Container>
      {/* Header com botão de Cancelar */}
      <Header>
        <IconButton onClick={() => router.back()}>
          <ArrowBack />
        </IconButton>
        <Select
          value={type}
          onChange={(e) => setType(e.target.value as 'income' | 'expense')}
          variant="outlined"
          sx={{ color: 'white', bgcolor: type === 'income' ? 'green' : 'red', minWidth: '100px' }}
        >
          <MenuItem value="income">Receita</MenuItem>
          <MenuItem value="expense">Despesa</MenuItem>
        </Select>
      </Header>

      {/* Input de valor */}
      <MainInput>
        <label>Valor da {type === 'income' ? 'Receita' : 'Despesa'}</label>
        <TextField fullWidth placeholder="R$ 0,00" variant="standard" />
      </MainInput>

      {/* Recebido e opções de data */}
      <OptionsRow>
        <Option>
          <Check />
          <span>Recebido</span>
          <Switch checked={isReceived} onChange={() => setIsReceived(!isReceived)} />
        </Option>
      </OptionsRow>

      <DateOptions>
        {['today', 'tomorrow', 'other'].map((option) => (
          <DateOption
            key={option}
            selected={dateOption === option}
            onClick={() => setDateOption(option)}
          >
            {option === 'today' ? 'Hoje' : option === 'tomorrow' ? 'Amanhã' : 'Outro'}
          </DateOption>
        ))}
        {dateOption === 'other' && (
          <IconButton>
            <CalendarToday />
          </IconButton>
        )}
      </DateOptions>

      {/* Descrição */}
      <DescriptionInput>
        <IconButton>
          <Notes />
        </IconButton>
        <TextField fullWidth placeholder="Descrição" variant="standard" />
      </DescriptionInput>


      {/* Categoria */}
      <CategorySelect>
        <IconButton>
          <Category />
        </IconButton>
        <Select defaultValue="default" variant="standard" fullWidth>
          <MenuItem value="default">Categoria</MenuItem>
          <MenuItem value="add" onClick={() => setOpenModal(true)}>Cadastrar Nova</MenuItem>
        </Select>
      </CategorySelect>

      {/* Repetir Transação */}
      <RepeatOption>
        <IconButton>
          <Loop />
        </IconButton>
        <span>Repetir</span>
        <Switch checked={repeat} onChange={() => setRepeat(!repeat)} />
      </RepeatOption>

      {repeat && (
        <RepeatModal open>
          <RepeatOptionRow>
            <IconButton>
              <ExpandMore />
            </IconButton>
            <Typography>Como sua transação se repete?</Typography>
            <RepeatFrequency>
              <label>Quantidade:</label>
              <Button onClick={() => setRepeatCount(repeatCount - 1)}>-</Button>
              <span>{repeatCount}</span>
              <Button onClick={() => setRepeatCount(repeatCount + 1)}>+</Button>
            </RepeatFrequency>
            <Select
              value={repeatFrequency}
              onChange={(e) => setRepeatFrequency(e.target.value as 'monthly' | 'weekly')}
              variant="outlined"
            >
              <MenuItem value="monthly">Mensal</MenuItem>
              <MenuItem value="weekly">Semanal</MenuItem>
            </Select>
          </RepeatOptionRow>
        </RepeatModal>
      )}

      {/* Botões de ação */}
      <ActionButtons>
        <Button variant="contained" fullWidth color="primary" onClick={handleSave}>
          Salvar
        </Button>
      </ActionButtons>
    </Container>
  );
};

export default AddTransaction;


const Container = styled('div')({
  padding: '1rem',
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
  maxWidth: '400px',
  margin: '0 auto',
});

const Header = styled('div')({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
});

const MainInput = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  label: {
    marginBottom: '0.5rem',
    fontSize: '1.1rem',
    fontWeight: 'bold',
  },
});

const OptionsRow = styled('div')({
  display: 'flex',
  justifyContent: 'space-between',
});

const Option = styled('div')({
  display: 'flex',
  alignItems: 'center',
  gap: '0.5rem',
});

const DateOptions = styled('div')({
  display: 'flex',
  gap: '0.5rem',
  justifyContent: 'center',
  marginTop: '0.5rem',
});

interface DateOptionProps {
  selected?: boolean;
}

const DateOption = styled(Button)<DateOptionProps>(({ selected }) => ({
  backgroundColor: selected ? '#4caf50' : 'transparent',
  color: selected ? '#fff' : '#000',
}));

const DescriptionInput = styled('div')({
  display: 'flex',
  alignItems: 'center',
});

const CategorySelect = styled('div')({
  display: 'flex',
  alignItems: 'center',
});

const RepeatOption = styled('div')({
  display: 'flex',
  alignItems: 'center',
  gap: '0.5rem',
});

const RepeatOptionRow = styled('div')({
  display: 'flex',
  alignItems: 'center',
  gap: '0.5rem',
  flexDirection: 'column',
});

const RepeatFrequency = styled('div')({
  display: 'flex',
  alignItems: 'center',
  gap: '0.5rem',
});

const RepeatModal = styled(Modal)({
  padding: '1rem',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});

const ActionButtons = styled('div')({
  display: 'flex',
  justifyContent: 'space-between',
});
