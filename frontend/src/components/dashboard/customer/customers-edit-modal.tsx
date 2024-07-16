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

import { ITransacaoUpdate } from '@/services/api/transacoes/ITransicaoUpdate';
import { ITransacao } from '@/services/api/transacoes/ITransacao';
import { TransacoesService } from '@/services/api/transacoes/TransacoesService';
import { ICategoria } from '@/services/api/transacoes/ICategoria';
import { ApiException } from '@/services/api/ApiException';
import { Plus as PlusIcon } from '@phosphor-icons/react/dist/ssr';
import CategoriaAddModal from './categoria-add-modal';

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

interface CustomersEditModalProps {
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


export default function CustomersEditModal({ isOpen, setOpenModal, selectedConta, onEditCustomer }: CustomersEditModalProps): React.JSX.Element {
  const [tipo, setTipo] = React.useState(selectedConta.tipo);
  const [categoria, setCategoria] = React.useState(selectedConta.categoria.id);
  const [categorias, setCategorias] = React.useState<ICategoria[]>([]);
  const [openModalAddCategoria, setOpenModalAddCategoria] = React.useState(false);
  const [categoriaId, setCategoriaId] = React.useState('');

  const handleAddCategoria = () => {
    setOpenModalAddCategoria(true);
  }

  const handleCategoriaCreated = (newCategoria: ICategoria) => {
    categorias.push(newCategoria);
    setCategoriaId(newCategoria.id);
};

  const fetchCategorias = () => {
    TransacoesService.listAllCategorias()
      .then((result) => {
        if (result instanceof ApiException) {
          alert(result.message);
        } else {
          setCategorias(result);
        }
      })
      .catch((error) => alert(error.message))
  };

  const [values, setValues] = React.useState({
    textmask: '(100) 000-0000',
    valor: selectedConta.valor,
    observacao: selectedConta.observacao,
  });

  React.useEffect(() => {
    fetchCategorias();

    setTipo(selectedConta.tipo);
    setCategoria(selectedConta.categoria.id);
    setValues({
      textmask: '(100) 000-0000',
      valor: selectedConta.valor,
      observacao: selectedConta.observacao,
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

  const handleSave = async () => {

    const formData: ITransacaoUpdate = {
      tipo,
      categoriaId: categoria,
      observacao: values.observacao,
      valor: Number(values.valor),
    };

    await TransacoesService.updateById(selectedConta.id, formData);
    onEditCustomer();
    handleCancel();
  };

  const handleCancel = () => {
    setTipo('');
    setCategoria('');
    setValues({
      textmask: '(100) 000-0000',
      valor: 0.0,
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
            <Box sx={{ display: 'flex' }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Categoria</InputLabel>
                <Select
                  sx={{ borderRadius: '8px 0 0 8px' }}
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={categoria}
                  label="Categoria"
                  onChange={handleChangeCategoria}
                >
                  {categorias.map(categoria => {
                    return <MenuItem value={categoria.id} key={categoria.id}>{categoria.titulo}</MenuItem>
                  })};
                </Select>
              </FormControl>
              <Button onClick={handleAddCategoria} variant="contained" size="small" sx={{ borderRadius: '0 8px 8px 0' }}>
                <PlusIcon size={20} weight="bold" />
              </Button>
            </Box>
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
        <CategoriaAddModal
        isOpen={openModalAddCategoria} 
        setOpenModal={() => setOpenModalAddCategoria(!openModalAddCategoria)} 
        onCategoriaCreated={handleCategoriaCreated}/> 
       
      </Box>
    </Modal>
  );

  return ReactDOM.createPortal(modalContent, document.body);
}
