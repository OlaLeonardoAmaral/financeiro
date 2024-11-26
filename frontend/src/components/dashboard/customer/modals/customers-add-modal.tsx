import { ICategoria } from '@/services/api/transacoes/ICategoria';
import { ITransacaoCreate } from '@/services/api/transacoes/ITransicaoCreate';
import { TransacoesService } from '@/services/api/transacoes/TransacoesService';
import LoadingButton from '@mui/lab/LoadingButton';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import Grid from '@mui/material/Grid';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Modal from '@mui/material/Modal';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import { Plus as PlusIcon } from '@phosphor-icons/react/dist/ssr';
import * as React from 'react';
import { IMaskInput } from 'react-imask';
import { NumericFormat, NumericFormatProps } from 'react-number-format';
import CategoriaAddModal from './categoria-add-modal';


const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    maxWidth: 550,
    minWidth: 380,
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
    categorias: ICategoria[];
    refreshTable: () => void;
    onCategoriaCreated: (newCategoria: ICategoria) => void;
}

interface CustomProps {
    onChange: (event: { target: { name: string; value: string } }) => void;
    name: string;
}

const TextMaskCustom = React.forwardRef<HTMLInputElement, CustomProps>(
    function TextMaskCustom(props, ref) {
        const { onChange, ...other } = props;
        return (
            <IMaskInput
                {...other}
                mask="00/00/0000"
                definitions={{
                    '0': /[0-9]/,
                }}
                inputRef={ref}
                onAccept={(value: any) => onChange({ target: { name: props.name, value } })}
                overwrite
            />
        );
    },
);

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

const getCurrentDateFormatted = () => {
    const date = new Date();
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Janeiro é 0!
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
};

export default function CustomersAddModal({ isOpen, setOpenModal, categorias, refreshTable, onCategoriaCreated }: CustomersAddModalProps): React.JSX.Element {
    const [tipo, setTipo] = React.useState('');
    const [categoriaId, setCategoriaId] = React.useState('');
    const [openModalAddCategoria, setOpenModalAddCategoria] = React.useState(false);
    const [loading, setLoading] = React.useState(false);

    const handleAddCategoria = () => {
        setOpenModalAddCategoria(true);
    }

    const handleCategoriaCreated = (newCategoria: ICategoria) => {
        onCategoriaCreated(newCategoria);
        setCategoriaId(newCategoria.id);
    };

    const [values, setValues] = React.useState({
        textmask: getCurrentDateFormatted(),
        numberformat: '',
        observacoes: '',
    });

    const handleChangeTipo = (event: SelectChangeEvent) => {
        setTipo(event.target.value as string);
    };

    const handleChangeCategoria = (event: SelectChangeEvent) => {
        setCategoriaId(event.target.value as string);
    };

    const handleChangeValue = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValues({
            ...values,
            [event.target.name]: event.target.value,
        });
    };


    const handleSave = async () => {
        setLoading(true);
        const formData: ITransacaoCreate = {
            tipo,
            categoriaId,
            observacao: values.observacoes,
            valor: parseFloat(values.numberformat),
            data: values.textmask
        };

        await TransacoesService.create(formData);
        
        setLoading(false);
        refreshTable();
        handleCancel();
    };

    const handleCancel = () => {
        setTipo('');
        setCategoriaId('');
        setValues({
            textmask: getCurrentDateFormatted(),
            numberformat: '',
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
                <Box sx={{ ...style }}>
                    <h2 id="parent-modal-title">Cadastro</h2>
                    <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                        <Grid item lg={6} sm={6} xs={12}>
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


                        <Grid item lg={6} sm={6} xs={12}>
                            <FormControl fullWidth variant="outlined">
                                <TextField
                                    label="Data"
                                    value={values.textmask}
                                    onChange={handleChangeValue}
                                    name="textmask"
                                    id="formatted-text-mask-input"
                                    variant="outlined"
                                    fullWidth
                                    InputProps={{
                                        inputComponent: TextMaskCustom as any,
                                    }}
                                />
                            </FormControl>
                        </Grid>


                        <Grid item lg={6} sm={6} xs={12}>
                            <Box sx={{ display: 'flex' }}>
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">Categoria</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={categoriaId}
                                        label="Categoria"
                                        onChange={handleChangeCategoria}
                                        sx={{ borderRadius: '8px 0 0 8px' }}
                                    >
                                        {categorias.map(categoria => {
                                            return <MenuItem value={categoria.id} key={categoria.id}>{categoria.titulo}</MenuItem>
                                        })};
                                    </Select>
                                </FormControl>
                                <Button
                                    onClick={handleAddCategoria}
                                    variant="contained"
                                    size="small"
                                    sx={{ borderRadius: '0 8px 8px 0' }}>
                                    <PlusIcon size={20} weight="bold" />
                                </Button>
                            </Box>
                        </Grid>
                        <Grid item lg={6} sm={6} xs={12}>
                            <TextField
                                label="Valor"
                                value={values.numberformat}
                                onChange={handleChangeValue}
                                name="numberformat"
                                id="formatted-numberformat-input"
                                variant="outlined"
                                fullWidth
                                InputProps={{
                                    inputComponent: NumericFormatCustom as any,
                                }}
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
                                    Cancelar
                                </Button>

                                <LoadingButton
                                    loading={loading}
                                    variant="contained"
                                    color="success"
                                    onClick={handleSave} >
                                    Salvar
                                </LoadingButton>

                            </Box>
                        </Grid>
                    </Grid>
                    <CategoriaAddModal
                        isOpen={openModalAddCategoria}
                        setOpenModal={() => setOpenModalAddCategoria(!openModalAddCategoria)}
                        onCategoriaCreated={handleCategoriaCreated}
                    />
                </Box>
            </Modal>
        </div>
    );
}


