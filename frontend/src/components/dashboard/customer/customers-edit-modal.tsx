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

export default function CustomersEditModal({ isOpen, setOpenModal }: CustomersAddModalProps): React.JSX.Element {
  const [tipoCad, setTipoCad] = React.useState('');

  const [values, setValues] = React.useState({
    textmask: '(100) 000-0000',
    numberformat: '',
    descricao: '', 
    observacoes: '',
  });

  const handleChange = (event: SelectChangeEvent) => {
    setTipoCad(event.target.value as string);
  };

  const handleChangeValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  const handleSave = () => {
    const formData = {
      tipoCad,
      descricao: values.descricao,
      valor: values.numberformat,
      observacoes: values.observacoes,
      dataHora: new Date().toLocaleString()
    };
    console.log(formData);
    handleCancel();
  };

  const handleCancel = () => {
    setTipoCad('');
    setValues({
      textmask: '(100) 000-0000',
      numberformat: '',
      descricao: '',
      observacoes: ''
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
                value={tipoCad}
                label="Tipo"
                onChange={handleChange}
              >
                <MenuItem value={'Receita'}>Receita</MenuItem>
                <MenuItem value={'Despesa'}>Despesa</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <TextField 
              label="Descrição" 
              fullWidth
              name="descricao"
              value={values.descricao}
              onChange={handleChangeValue}
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              label="Valor"
              value={values.numberformat}
              onChange={handleChangeValue}
              name="numberformat"
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
              name="observacoes"
              value={values.observacoes}
              onChange={handleChangeValue}
            />
          </Grid>
          <Grid item xs={12}>
            <Box sx={{display: 'flex', justifyContent: 'flex-end', gap: '10px'}}>
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
