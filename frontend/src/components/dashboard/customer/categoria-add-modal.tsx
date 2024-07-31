import * as React from 'react';
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
import { TransacoesService } from '@/services/api/transacoes/TransacoesService';
import { ICategoria, ICategoriaCreate } from '@/services/api/transacoes/ICategoria';
import { ITransacaoCreate } from '@/services/api/transacoes/ITransicaoCreate';
import { Plus as PlusIcon } from '@phosphor-icons/react/dist/ssr';
import { height, width } from '@mui/system';
import { ApiException } from '@/services/api/ApiException';


interface CategoriaAddModalProps {
    isOpen: boolean;
    setOpenModal: any;
    onCategoriaCreated: (categoria: ICategoria) => void; // eu nao quero tirar
}

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    maxWidth: '400px',
    minWidth: '350px',
    // height: 500,
    bgcolor: 'background.paper',
    borderRadius: '10px',
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
};

const styleBox = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
}

export default function CategoriaAddModal({ isOpen, setOpenModal, onCategoriaCreated }: CategoriaAddModalProps): React.JSX.Element {

    const [categoria, setCategoria] = React.useState<ICategoriaCreate>({ titulo: '' });

    const handleChangeValue = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCategoria({ titulo: event.target.value });
    };

    const handleSave = async () => {
        const response = await TransacoesService.createCategoria(categoria);

        if (response instanceof ApiException) {
            alert(response.message);
        } else {
            onCategoriaCreated(response);
        }

        setOpenModal(false);
    };

    return (
        <React.Fragment>
            <Modal
                open={isOpen}
                onClose={setOpenModal}
                aria-labelledby="parent-modal-title"
                aria-describedby="parent-modal-description"
            >
                <Box sx={{ ...style }}>
                    <h2 id="parent-modal-title">Nova Categoria</h2>
                    <Box sx={{ ...styleBox, gap: 1 }}>
                        <TextField
                            id="outlined-basic"
                            label="Categoria"
                            variant="outlined" sx={{ width: '100%' }}
                            onChange={handleChangeValue}
                        />
                        <Box sx={{ alignSelf: 'flex-end' }}>
                            <Button variant="contained" color="success" onClick={handleSave}>
                                Salvar
                            </Button>
                        </Box>
                    </Box>
                </Box>
            </Modal>
        </React.Fragment>
    );
}
