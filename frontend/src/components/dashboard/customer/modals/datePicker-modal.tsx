import React from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { Dialog, DialogActions, Button } from '@mui/material';
import dayjs, { Dayjs } from 'dayjs';
import 'dayjs/locale/pt-br';

interface DatePickerModalProps {
  open: boolean;
  onClose: () => void;
  onDateSelect: (date: Date) => void;
  initialDate?: Date;
}

const DatePickerModal: React.FC<DatePickerModalProps> = ({
  open,
  onClose,
  onDateSelect,
  initialDate
}) => {
  const [selectedDate, setSelectedDate] = React.useState<Dayjs | null>(
    initialDate ? dayjs(initialDate) : dayjs()
  );

  const handleDateChange = (date: Dayjs | null) => {
    setSelectedDate(date);
  };

  const handleOk = () => {
    if (selectedDate) {
      onDateSelect(selectedDate.toDate());
      onClose();
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{
        style: {
          borderRadius: 16,
          padding: 0,
        },
      }}
    >
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pt-br">
        <DateCalendar
          value={selectedDate}
          onChange={handleDateChange}
          sx={{
            '& .MuiPickersDay-root.Mui-selected': {
              backgroundColor: '#4CAF50',
              '&:hover': {
                backgroundColor: '#45a049',
              },
            },
          }}
        />
      </LocalizationProvider>
      <DialogActions sx={{ padding: 2, justifyContent: 'space-between' }}>
        <Button
          onClick={onClose}
          sx={{
            color: '#4CAF50',
            '&:hover': {
              backgroundColor: 'rgba(76, 175, 80, 0.04)',
            },
          }}
        >
          CANCELAR
        </Button>
        <Button
          onClick={handleOk}
          sx={{
            color: '#4CAF50',
            '&:hover': {
              backgroundColor: 'rgba(76, 175, 80, 0.04)',
            },
          }}
        >
          OK
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DatePickerModal;