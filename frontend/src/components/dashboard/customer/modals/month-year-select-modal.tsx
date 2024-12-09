import React, { useEffect, useState } from 'react';
import {
    Box,
    Modal,
    Typography,
    IconButton,
    Button,
} from '@mui/material';
import { LessThan, GreaterThan } from '@phosphor-icons/react';
import { MonthCalendar, YearCalendar, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';


const modalStyles = {
    position: 'absolute' as const,
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    borderRadius: 2,
    p: 4,
};

const buttonGroupStyles = {
    mt: 3,
    display: 'flex',
    justifyContent: 'space-between',
};

const headerContainerStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'background.paper',
    padding: '16px',
    borderRadius: '8px',
    boxShadow: 2,
    marginBottom: 2,
};

const headerIconButtonStyle = {
    backgroundColor: 'primary.main',
    color: 'common.white',
    '&:hover': {
        backgroundColor: 'primary.dark',
    },
};

const headerButtonStyle = {
    fontSize: '18px',
    fontWeight: 'bold',
    textTransform: 'none',
    color: 'text.primary',
    '&:hover': {
        color: 'primary.main',
    },
};

interface MonthYearSelectorModalProps {
    open: boolean;
    currentMonth: number;
    currentYear: number;
    onClose: () => void;
    onSelect: (month: number, year: number) => void;
}

export const MonthYearSelectorModal: React.FC<MonthYearSelectorModalProps> = ({
    open,
    currentMonth,
    currentYear,
    onClose,
    onSelect,
}) => {
    const [selectedMonth, setSelectedMonth] = useState(currentMonth);
    const [selectedYear, setSelectedYear] = useState(currentYear);
    const [isYearModalOpen, setIsYearModalOpen] = useState(false);

    useEffect(() => {
        setSelectedMonth(currentMonth);
    }, [currentMonth]);

    useEffect(() => {
        setSelectedYear(currentYear);
    }, [currentYear]);


    const handleMonthChange = (newMonth: Date | null | any) => {
        if (newMonth && newMonth instanceof Date) {
            setSelectedMonth(newMonth.getMonth() + 1);
        } else if (newMonth && typeof newMonth === 'object' && 'month' in newMonth) {
            setSelectedMonth(newMonth.month() + 1);
        } else {
            console.warn('Formato de data inesperado:', newMonth);
        }
    };

    const handleYearChange = (newYear: Date | null | any) => {
        if (newYear && newYear instanceof Date) {
            setSelectedYear(newYear.getFullYear());
        } else if (newYear && typeof newYear === 'object' && 'year' in newYear) {
            setSelectedYear(newYear.year());
        } else {
            console.warn('Formato de data inesperado:', newYear);
        }

        setIsYearModalOpen(false);
    };

    const handleConfirm = () => {
        onSelect(selectedMonth, selectedYear);
        onClose();
    };

    const toggleYearModal = () => {
        setIsYearModalOpen(!isYearModalOpen);
    };

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pt-br">
            <Modal open={open} onClose={onClose} aria-labelledby="month-year-selector">
                <Box sx={{ ...modalStyles }}>
                    <Box sx={{ ...headerContainerStyle }}>
                        <IconButton
                            onClick={() => setSelectedYear((prev) => prev - 1)}
                            sx={{ ...headerIconButtonStyle }}
                        >
                            <LessThan size={24} />
                        </IconButton>
                        <Button
                            variant="text"
                            onClick={toggleYearModal}
                            sx={headerButtonStyle}
                        >
                            {selectedYear}
                        </Button>
                        <IconButton
                            onClick={() => setSelectedYear((prev) => prev + 1)}
                            sx={{ ...headerIconButtonStyle }}
                        >
                            <GreaterThan size={24} />
                        </IconButton>
                    </Box>

                    <MonthCalendar
                        onChange={handleMonthChange}
                        defaultValue={dayjs(`${selectedYear}-${selectedMonth}`)}
                    />

                    <Box sx={buttonGroupStyles}>
                        <Button variant="outlined" onClick={onClose}>
                            Cancelar
                        </Button>
                        <Button variant="contained" onClick={handleConfirm}>
                            Confirmar
                        </Button>
                    </Box>
                </Box>
            </Modal>

            <Modal open={isYearModalOpen} onClose={toggleYearModal} aria-labelledby="year-selector">
                <Box sx={modalStyles}>
                    <Typography variant="h6" textAlign="center" mb={2}>
                        Selecione o Ano
                    </Typography>
                    <YearCalendar
                        onChange={handleYearChange}
                        defaultValue={dayjs(`${selectedYear}-${selectedMonth}`)}
                    />
                </Box>
            </Modal>
        </LocalizationProvider>
    );
};