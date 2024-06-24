import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import InputLabel from '@mui/material/InputLabel';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import { NumericFormat, NumericFormatProps } from 'react-number-format';
import { DespesasService } from '@/services/api/despesas/DespesasService';
import { ReceitasService } from '@/services/api/receitas/ReceitasService';
import { IContas } from '@/services/api/IContas';

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
    onAddCustomer: () => void;
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

export default function CustomersAddModal({ isOpen, setOpenModal, onAddCustomer}: CustomersAddModalProps): React.JSX.Element {
    const [tipoCad, setTipoCad] = React.useState('');

    const [values, setValues] = React.useState({
        textmask: '(100) 000-0000',
        numberformat: 0,
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
        const formData: Omit<IContas, 'id'> = {
            tipoCad,
            titulo: values.descricao,
            observacao: values.observacoes,
            valor: values.numberformat,
            data: new Date().toISOString()
        };

        if (tipoCad === 'Receita') {
            ReceitasService.create(formData);
        } else if (tipoCad === 'Despesa') {
            DespesasService.create(formData);
        }

        console.log(formData)

        onAddCustomer();

        // console.log(formData);
        handleCancel();
    };

    const handleCancel = () => {
        setTipoCad('');
        setValues({
            textmask: '(100) 000-0000',
            numberformat: 0,
            descricao: '',
            observacoes: ''
        });
        setOpenModal(false);
    };

    return (
        <div>
            <Modal
                open={isOpen}
                onClose={setOpenModal}
                aria-labelledby="parent-modal-title"
                aria-describedby="parent-modal-description"
            >
                <Box sx={{ ...style, width: 800 }}>
                    <h2 id="parent-modal-title">Cadastro</h2>
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
                            <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                                <Button variant="contained" color="error" onClick={handleCancel} >
                                    Sair
                                </Button>
                                <Button variant="contained" color="success" onClick={handleSave} >
                                    Salvar
                                </Button>
                            </Box>
                        </Grid>
                    </Grid>

                </Box>
            </Modal>
        </div>
    );
}
