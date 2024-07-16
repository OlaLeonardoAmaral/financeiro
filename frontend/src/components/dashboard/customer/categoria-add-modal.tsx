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
import { width } from '@mui/system';
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
    width: 400,
    bgcolor: 'background.paper',
    borderRadius: '10px',
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
};

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
            console.log(JSON.stringify(response));
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
                <Box sx={{ ...style, width: 500 }}>
                    <h2 id="parent-modal-title">Nova Categoria</h2>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <TextField
                            id="outlined-basic"
                            label="Categoria"
                            variant="outlined" sx={{ width: '20rem' }}
                            onChange={handleChangeValue}
                        />
                        <div>
                            <Button variant="contained" color="success" onClick={handleSave}>
                                Salvar
                            </Button>
                        </div>
                    </Box>
                </Box>
            </Modal>
        </React.Fragment>
    );
}
