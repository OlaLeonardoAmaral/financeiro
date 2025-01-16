'use client';

import * as React from 'react';
import { ITransacaoCreate } from '@/services/api/transacoes/ITransicaoCreate';
import { TransacoesService } from '@/services/api/transacoes/TransacoesService';
import { Checkbox, FormControlLabel, Stack } from '@mui/material';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { ArrowLeft } from '@phosphor-icons/react/dist/ssr';

import { useCategorias } from '@/contexts/CategoriaContext';

import TransactionCard from './upload-file-card';

interface UploadOFXFormProps {
  onSendComponent: (component: JSX.Element) => void;
}

const UploadOFXForm: React.FC<UploadOFXFormProps> = ({ onSendComponent }) => {
  const [transactions, setTransactions] = React.useState<ITransacaoCreate[]>([]);
  const [selectedTransactions, setSelectedTransactions] = React.useState<Set<string>>(new Set());
  const [isImportView, setIsImportView] = React.useState(false);
  const { categorias, fetchCategorias } = useCategorias();
  const [loadingTransactions, setLoadingTransactions] = React.useState<Set<string | undefined>>(new Set());

  const sendComponentToParent = (component: React.JSX.Element) => {
    onSendComponent(component);
  };

  const convertDate = (ofxDate: string): string => {
    const cleanDate = ofxDate.split('[')[0];
    const year = cleanDate.substring(0, 4);
    const month = cleanDate.substring(4, 6);
    const day = cleanDate.substring(6, 8);

    return `${day}/${month}/${year}`;
  };

  const processMemo = (memo: string): string => {
    if (memo.startsWith('Transferência')) {
      const parts = memo.split(' - ');
      return parts.slice(0, 2).join(' - ');
    }
    return memo;
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const text = await file.text();
      extractTransactionsFromOFX(text);
      fetchCategorias();
      setIsImportView(true);

      sendComponentToParent(
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
          <IconButton onClick={handleBack} sx={{ marginRight: '1rem' }}>
            <ArrowLeft size={32} />
          </IconButton>

          <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
            Transações Importadas
          </Typography>
        </div>
      );
    }
  };

  const extractTransactionsFromOFX = (ofxContent: string): void => {
    const transactionRegex = /<STMTTRN>([\s\S]*?)<\/STMTTRN>/g;
    let match;

    let transactionsUpload: ITransacaoCreate[] = [];

    while ((match = transactionRegex.exec(ofxContent)) !== null) {
      const transactionBlock = match[1];

      const idMatch = /<FITID>(.*?)<\/FITID>/.exec(transactionBlock);
      const dateMatch = /<DTPOSTED>(.*?)<\/DTPOSTED>/.exec(transactionBlock);
      const amountMatch = /<TRNAMT>(.*?)<\/TRNAMT>/.exec(transactionBlock);
      const memoMatch = /<MEMO>(.*?)<\/MEMO>/.exec(transactionBlock);

      transactionsUpload.push({
        id: idMatch?.[1],
        tipo: parseFloat(amountMatch?.[1] || '0') < 0 ? 'Despesa' : 'Receita',
        data: dateMatch ? convertDate(dateMatch[1]) : 'Unknown',
        valor: parseFloat(amountMatch?.[1] || '0'),
        observacao: memoMatch ? processMemo(memoMatch[1]) : 'Unknown',

        categoriaId: categorias[0].id,
        foiRecebida: true,
        isParcela: false,
        repetir: false,
      });
    }

    setTransactions(transactionsUpload);
  };

  const handleBack = () => {
    setTransactions([]);
    setIsImportView(false);
    sendComponentToParent(
      <div>
        <Typography variant="h4">Importar Extrato</Typography>
      </div>
    );
  };

  const handleToggleSelectAll = () => {
    if (selectedTransactions.size === transactions.length) {
      setSelectedTransactions(new Set());
    } else {
      setSelectedTransactions(new Set(transactions.map((t) => t.id!)));
    }
  };

  const handleToggleTransaction = (transactionId: string) => {
    setSelectedTransactions((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(transactionId)) {
        newSet.delete(transactionId);
      } else {
        newSet.add(transactionId);
      }
      return newSet;
    });
  };

  const handleSave = () => {
    const selected = transactions.filter((t) => selectedTransactions.has(t.id!));
    console.log('Transações selecionadas:', selected);
    handleBack();
  };

  const handleAddClick = async (transaction: ITransacaoCreate) => {
    try {
      setLoadingTransactions((prev) => new Set(prev).add(transaction.id));
      await TransacoesService.create(transaction);
      setTransactions((prev) => prev.filter((t) => t.id !== transaction.id));
    } catch (error) {
      console.error('Erro ao adicionar transação:', error);
      alert('Não foi possível adicionar a transação. Tente novamente.');
    } finally {
      setLoadingTransactions((prev) => {
        const newSet = new Set(prev);
        newSet.delete(transaction.id);
        return newSet;
      });
    }
  };

  const handleCategoryChange = (transactionId: string, newCategoryId: string) => {
    setTransactions((prevTransactions) =>
      prevTransactions.map((transaction) =>
        transaction.id === transactionId ? { ...transaction, categoriaId: newCategoryId } : transaction
      )
    );
  };

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
      }}
    >
      {!isImportView ? (
        <>
          <Button
            component="label"
            fullWidth
            variant="outlined"
            sx={{
              padding: '1rem',
              fontSize: '1rem',
              fontWeight: 'bold',
              borderRadius: '8px',
              color: '#000',
              borderColor: '#ccc',
              '&:hover': { borderColor: '#aaa' },
            }}
          >
            Importar Arquivo OFX
            <input type="file" accept=".ofx" hidden onChange={handleFileUpload} />
          </Button>
        </>
      ) : (
        <>
          <Stack direction="row" justifyContent="space-around" alignItems="center" mb={2}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={selectedTransactions.size === transactions.length && transactions.length > 0}
                  onChange={handleToggleSelectAll}
                  sx={{
                    color: '#4caf50',
                    '&.Mui-checked': { color: '#4caf50' },
                  }}
                />
              }
              label="Marcar Todos"
            />
            <Button variant="contained" color="success" onClick={handleSave} disabled={selectedTransactions.size === 0}>
              Salvar Marcados
            </Button>
          </Stack>

          {transactions.map((transaction) => (
            <TransactionCard
              key={transaction.id}
              transaction={transaction}
              categorias={categorias}
              onCategoryChange={(transactionId, newCategoryId) => handleCategoryChange(transaction.id!, newCategoryId!)}
              selected={selectedTransactions.has(transaction.id!)}
              onToggle={() => handleToggleTransaction(transaction.id!)}
              onAddClick={(transacao) => handleAddClick(transacao)}
              loading={loadingTransactions.has(transaction.id!)}
            />
          ))}
        </>
      )}
    </form>
  );
};

export default UploadOFXForm;
