import React from 'react';
import LoadingButton from '@mui/lab/LoadingButton';
import {
  Box,
  Button,
  Card,
  CardContent,
  Checkbox,
  Grid,
  MenuItem,
  Select,
  SelectChangeEvent,
  styled,
  Typography,
} from '@mui/material';
import dayjs from 'dayjs';

import 'dayjs/locale/pt-br';

import { ICategoria } from '@/services/api/transacoes/ICategoria';
import { ITransacaoCreate } from '@/services/api/transacoes/ITransicaoCreate';

dayjs.locale('pt-br');

interface TransactionCardProps {
  transaction: ITransacaoCreate;
  onCategoryChange?: (transactionId: string | undefined, categoryId: string) => void;
  onAddClick?: (transaction: ITransacaoCreate) => void;
  categorias: ICategoria[];
  selected: boolean;
  onToggle: () => void;
  loading: boolean;
}

const StyledCard = styled(Card)({
  backgroundColor: '#ffffff',
  borderRadius: 16,
  boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
  marginBottom: '1rem',
  padding: 2,
  fontFamily: 'Roboto, sans-serif',
  transition: 'transform 0.2s ease, box-shadow 0.2s ease',
});

const formatTransactionDate = (dateString: string) => {
  return dayjs(dateString, 'DD/MM/YYYY').format('DD MMMM YYYY');
};

const TransactionCard: React.FC<TransactionCardProps> = ({
  transaction,
  onCategoryChange,
  onAddClick,
  categorias,
  selected,
  onToggle,
  loading,
}) => {
  const [category, setCategory] = React.useState(categorias[0]?.id);

  const handleCategoryChange = (event: SelectChangeEvent) => {
    const value = event.target.value as string;

    setCategory(value);
    if (onCategoryChange) {
      onCategoryChange(transaction.id, value);
    }
  };

  return (
    <StyledCard>
      <CardContent>
        <Grid container spacing={1} alignItems="center">
          <Grid item xs={10}>
            <Typography variant="subtitle1" sx={{ fontWeight: '500', fontSize: '16px', lineHeight: 1.2 }}>
              {transaction.observacao}
            </Typography>
          </Grid>
          <Grid item xs={2}>
            <Checkbox
              checked={selected}
              onChange={onToggle}
              sx={{
                color: '#4caf50',
                '&.Mui-checked': { color: '#4caf50' },
              }}
            />
          </Grid>

          <Grid item xs={8}>
            <Typography variant="body2" sx={{ color: '#757575', fontSize: '14px' }}>
              {formatTransactionDate(transaction.data)}
            </Typography>
          </Grid>
          <Grid item xs={4} sx={{ textAlign: 'left' }}>
            <Typography
              variant="h6"
              sx={{
                color: transaction.tipo === 'Despesa' ? '#ff5722' : '#2e7d32',
                fontWeight: 'bold',
                fontSize: '18px',
              }}
            >
              {`R$ ${transaction.valor.toFixed(2)}`}
            </Typography>
          </Grid>

          <Grid item xs={8}>
            <Select
              value={category}
              onChange={handleCategoryChange}
              displayEmpty
              sx={{
                borderRadius: 4,
                backgroundColor: '#f5f5f5',
                fontSize: '14px',
                height: 40,
                width: '90%',
              }}
            >
              {categorias.map((categoria) => {
                return (
                  <MenuItem value={categoria.id} key={categoria.id}>
                    {categoria.titulo}
                  </MenuItem>
                );
              })}
            </Select>
          </Grid>
          <Grid item xs={4} sx={{ textAlign: 'right', display: 'flex', alignItems: 'flex-end' }}>
            <LoadingButton
              variant="contained"
              color="primary"
              onClick={() => onAddClick && onAddClick(transaction)}
              loading={loading}
            >
              Adicionar
            </LoadingButton>
          </Grid>
        </Grid>
      </CardContent>
    </StyledCard>
  );
};

export default TransactionCard;
