import * as React from 'react';
import Button from '@mui/material/Button';
import CardActions from '@mui/material/CardActions';
import { ArrowRight as ArrowRightIcon } from '@phosphor-icons/react/dist/ssr/ArrowRight';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { RelatorioServices } from '@/services/api/relatorio/RelatorioService';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';


export function Report(): React.JSX.Element {

    const [selectedDateIni, setSelectedDateIni] = React.useState<dayjs.Dayjs | null>(null);
    const [selectedDateFim, setSelectedDateFim] = React.useState<dayjs.Dayjs | null>(null);


    const handleDownload = async () => {
        try {
            const formattedDateIni = selectedDateIni?.format('DD/MM/YYYY');
            const formattedDateFim = selectedDateFim?.format('DD/MM/YYYY');
            setSelectedDateIni(null);
            setSelectedDateFim(null);

            if (formattedDateIni === undefined || formattedDateFim === undefined) {
                throw new Error('Datas vazias');
            }

            const blob = await RelatorioServices.listAll(formattedDateIni, formattedDateFim);
            const url = window.URL.createObjectURL(new Blob([blob], { type: 'application/pdf' }));

            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `relatorio_${formattedDateIni}_${formattedDateFim}.pdf`);

            document.body.appendChild(link);
            link.click();

            link.parentNode?.removeChild(link);

            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error('Erro ao gerar relatório:', error);
        }
    };



    return (
        <CardActions sx={{ justifyContent: 'space-around' }}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                    label="Início"
                    value={selectedDateIni}
                    format='DD/MM/YYYY'
                    onChange={(newDate) => setSelectedDateIni(newDate)} />

                <DatePicker
                    label="Fim"
                    value={selectedDateFim}
                    format='DD/MM/YYYY'
                    onChange={(newDate) => setSelectedDateFim(newDate)} />
            </LocalizationProvider>
            <Button onClick={handleDownload} color="inherit" endIcon={<ArrowRightIcon fontSize="var(--icon-fontSize-md)" />} size="small">
                Relatório
            </Button>
        </CardActions>
    )
}