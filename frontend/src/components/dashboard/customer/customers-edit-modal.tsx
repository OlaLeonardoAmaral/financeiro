import * as React from 'react';
import ReactDOM from 'react-dom';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import InputLabel from '@mui/material/InputLabel';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import { NumericFormat, NumericFormatProps } from 'react-number-format';

import { type ITransacao } from '@/services/api/transacoes/ITransacao';
import { TransacoesService } from '@/services/api/transacoes/TransacoesService';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  borderRadius: '10px',
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

interface CustomersAddModalProps {
  isOpen: boolean;
  setOpenModal: any;
  selectedConta: ITransacao;
  onEditCustomer: () => void;
}

interface CustomProps {
  onChange: (event: { target: { name: string; value: string } }) => void;
  name: string;
}

const NumericFormatCustom = React.forwardRef<NumericFormatProps, CustomProps>(
  function NumericFormatCustom(props, ref) {
    const { onChange, ...other } = props;

    return (
      <NumericFormat
        {...other}
        getInputRef={ref}
        onValueChange={(values: any) => {
          onChange({
            target: {
              name: props.name,
              value: values.value,
            },
          });
        }}
        thousandSeparator='.'
        decimalSeparator=','
        decimalScale={2}
        fixedDecimalScale
        prefix="R$"
        allowNegative={false}
      />
    );
  },
);


export default function CustomersEditModal({ isOpen, setOpenModal, selectedConta, onEditCustomer }: CustomersAddModalProps): React.JSX.Element {
  const [tipo, setTipo] = React.useState(selectedConta.tipo);
  const [categoria, setCategoria] = React.useState(selectedConta.categoria);

  const [values, setValues] = React.useState({
    id: selectedConta.id,
    textmask: '(100) 000-0000',
    valor: selectedConta.valor,
    observacao: selectedConta.observacao,
    data: selectedConta.data,
  });

  React.useEffect(() => {
    setTipo(selectedConta.tipo);
    setCategoria(selectedConta.categoria);
    setValues({
      id: selectedConta.id,
      textmask: '(100) 000-0000',
      valor: selectedConta.valor,
      observacao: selectedConta.observacao,
      data: selectedConta.data,
    });
  }, [selectedConta]);

  const handleChangeTipo = (event: SelectChangeEvent) => {
    setTipo(event.target.value as string);
  };

  const handleChangeCategoria = (event: SelectChangeEvent) => {
    setCategoria(event.target.value as string);
  };

  const handleChangeValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  // Omit<ITransacao, 'id'>

  const handleSave = () => {
    const formData: ITransacao = {
      id: values.id,
      tipo,
      categoria: categoria,
      observacao: values.observacao,
      data: values.data,
      valor: Number(values.valor),
    };


    TransacoesService.updateById(selectedConta.id, formData);


    setTimeout(() => {
      onEditCustomer();
      handleCancel();
    }, 1000)
  };

  const handleCancel = () => {
    setTipo('');
    setCategoria('');
    setValues({
      id: '',
      textmask: '(100) 000-0000',
      valor: 0.0,
      data: '',
      observacao: ''
    });
    setOpenModal(false);
  };

  const modalContent = (
    <Modal
      open={isOpen}
      onClose={setOpenModal}
      aria-labelledby="parent-modal-title"
      aria-describedby="parent-modal-description"
    >
      <Box sx={{ ...style, width: 800 }}>
        <h2 id="parent-modal-title">Editar</h2>
        <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid item xs={3}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Tipo</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={tipo}
                label="Tipo"
                onChange={handleChangeTipo}
              >
                <MenuItem value={'Receita'}>Receita</MenuItem>
                <MenuItem value={'Despesa'}>Despesa</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            {/* <TextField
              label="Descrição"
              fullWidth
              name="titulo"
              value={values.categoria}
              onChange={handleChangeValue}
            /> */}

            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Categoria</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={categoria}
                label="Categoria"
                onChange={handleChangeCategoria}
              >
                <MenuItem value={'Salario'}>Salario</MenuItem>
                <MenuItem value={'Conta de Luz'}>Conta de Luz</MenuItem>
              </Select>
            </FormControl>

          </Grid>
          <Grid item xs={3}>
            <TextField
              label="Valor"
              value={values.valor}
              onChange={handleChangeValue}
              name="valor"
              id="formatted-numberformat-input"
              InputProps={{
                inputComponent: NumericFormatCustom as any,
              }}
              variant="standard"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="outlined-multiline-static"
              label="Observações"
              multiline
              rows={4}
              fullWidth
              name="observacao"
              value={values.observacao}
              onChange={handleChangeValue}
            />
          </Grid>
          <Grid item xs={12}>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
              <Button variant="contained" color="error" onClick={handleCancel} >
                Cancelar
              </Button>
              <Button variant="contained" color="success" onClick={handleSave} >
                Salvar
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Modal>
  );

  return ReactDOM.createPortal(modalContent, document.body);
}
