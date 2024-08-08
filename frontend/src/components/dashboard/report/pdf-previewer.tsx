
import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import { X } from '@phosphor-icons/react';
import { Button } from '@mui/material';

interface PdfViewerProps {
    open: boolean;
    onClose: () => void;
    pdfUrl: string;
}

const PdfViewer: React.FC<PdfViewerProps> = ({ open, onClose, pdfUrl }) => {
    return (
        <Dialog fullScreen open={open} onClose={onClose}>
            <DialogContent sx={{ p: 0, m: 0 }}>
                <div style={{display: 'flex', justifyContent: 'flex-end'}}>
                    <Button onClick={onClose} color="inherit" endIcon={<X size={32} />} size="small" />
                </div>
                <iframe src={pdfUrl} width="100%" height="100%" title="Relatório PDF" />
            </DialogContent>
        </Dialog>
    );
};

export default PdfViewer;
