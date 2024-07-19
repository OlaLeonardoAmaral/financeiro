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
import { Trash } from '@phosphor-icons/react/dist/ssr';
import { borderRadius, color, display, fontWeight, shadows } from '@mui/system';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { TransacoesService } from '@/services/api/transacoes/TransacoesService';

const style = {
  display: 'flex',
  maxWidth: '16rem',
  height: '15rem',
  borderRadius: '20px',
  width: '800px',
  justifyContent: 'center',
  flexDirection: 'column',
};

const styleDialogActions = {
  justifyContent: 'center',
  gap: '5px',
  paddingBottom: '16px'
};

const styleButtonDelete = {
  backgroundColor: '#F11414',
  color: 'white',
  font: 'semibold',
  boxShadow: '2px 2px 8px -4px rgba(0, 0, 0, 0.5)',
  width: '6rem',
  padding: '6px 10px',
  borderRadius: '10px',
  '&:hover': {
    backgroundColor: '#F11414',
    boxShadow: '2px 2px 8px -4px rgba(0, 0, 0, 0.5)',
  }
}

const styleButtonCancel = {
  backgroundColor: '#F2F2F2',
  color: 'gray',
  fontWeight: '600',
  boxShadow: '2px 2px 8px -4px rgba(0, 0, 0, 0.5)',
  width: '6rem',
  padding: '6px 10px',
  borderRadius: '10px',
  '&:hover': {
    backgroundColor: '#F2F2F2',
    boxShadow: '2px 2px 8px -4px rgba(0, 0, 0, 0.5)',
  }
}

interface MessageModalProps {
  isOpen: boolean;
  setOpenModal: () => void;
  onDeleteCostumer: () => void;
  selectedId: string;
  // children: React.ReactNode;
}

export default function MessageModal({ isOpen, setOpenModal, onDeleteCostumer, selectedId }: MessageModalProps): React.JSX.Element {


  const handleClose = () => {
    setOpenModal();
  };

  const handleDelete = async () => {
    await TransacoesService.deleteById(selectedId);
    onDeleteCostumer();
    handleClose();
  }


  const modalContent = (
    <Dialog
      open={isOpen}
      onClose={setOpenModal}
      aria-labelledby="parent-modal-title"
      aria-describedby="parent-modal-description"
    >

      <Box sx={{ ...style, width: 800 }}>
        <DialogTitle
          style={{
            fontWeight: '800',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            paddingBottom: '0',
            paddingTop: '15px',
            fontSize: '20px',
            gap: '20px'
          }} id="draggable-dialog-title">
          <Trash size={60} color="#f20707" weight="fill" />
          Confirmar Exclusão
        </DialogTitle>

        <DialogContent
          sx={{
            paddingTop: '0',
            textAlign: 'center',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '0px 24px',
          }}>
          <DialogContentText>
            Tem certeza de que deseja excluir este item?
          </DialogContentText>
        </DialogContent>

        <DialogActions sx={{ ...styleDialogActions }}>
          <Button
            autoFocus
            onClick={handleDelete}
            sx={{ ...styleButtonDelete }}>
            Excluir
          </Button>
          <Button
            onClick={handleClose}
            sx={{ ...styleButtonCancel }}>
            Cancelar
          </Button>
        </DialogActions>
      </Box>
    </Dialog>

  );

  return ReactDOM.createPortal(modalContent, document.body);
};


