'use client';

import * as React from 'react';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Divider from '@mui/material/Divider';
import { alpha, useTheme } from '@mui/material/styles';
import type { SxProps } from '@mui/material/styles';
import { ArrowClockwise as ArrowClockwiseIcon } from '@phosphor-icons/react/dist/ssr/ArrowClockwise';
import { ArrowRight as ArrowRightIcon } from '@phosphor-icons/react/dist/ssr/ArrowRight';
import type { ApexOptions } from 'apexcharts';
import { EstatisticasService } from '@/services/api/estatisticas/EstatisticasService';
import Skeleton from '@mui/material/Skeleton';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import { Chart } from '@/components/core/chart';
import { ApiException } from '@/services/api/ApiException';
import { LoadingButton } from '@mui/lab';
import { RelatorioServices } from '@/services/api/relatorio/RelatorioService';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import PdfViewer from '../report/pdf-previewer';

export interface SalesProps {
  sx?: SxProps;
  loading: boolean;
}

export function Sales({ sx, loading }: SalesProps): React.JSX.Element {
  const chartOptions = useChartOptions();
  const [series, setSeries] = React.useState<{ name: string; data: number[] }[]>([]);
  const [selectedDateIni, setSelectedDateIni] = React.useState<dayjs.Dayjs | null>(null);
  const [selectedDateFim, setSelectedDateFim] = React.useState<dayjs.Dayjs | null>(null);
  const [pdfUrl, setPdfUrl] = React.useState<string | null>(null);
  const [isPdfViewerOpen, setIsPdfViewerOpen] = React.useState(false);
  const [loadingRel, setLoadingRel] = React.useState(false);

  const handleSync = async () => {
    const mesesAno = await EstatisticasService.getTotaisAnoPorMes();

    if (mesesAno instanceof ApiException) {
      alert(mesesAno.message);
    } else {
      const data = new Array(12).fill(0);

      mesesAno.forEach(mes => {
        const [ano, mesStr] = mes.month.split('-');
        const monthIndex = parseInt(mesStr, 10) - 1;
        data[monthIndex] = mes.total / 1000;
      });

      const updatedSeries = [
        {
          name: 'Esse ano',
          data,
        },
      ];

      setSeries(updatedSeries);
    }
  };

  const handleReport = async () => {
    setLoadingRel(true);
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
      setPdfUrl(url);
      setLoadingRel(false)
      setIsPdfViewerOpen(true);
    } catch (error) {
      console.error('Erro ao gerar relatório:', error);
    }
  }

  React.useEffect(() => {
    handleSync();
  }, [])


  return (
    <Card sx={sx}>
      <CardHeader
        action={
          <Button onClick={handleSync} color="inherit" size="small" startIcon={<ArrowClockwiseIcon fontSize="var(--icon-fontSize-md)" />}>
            Sincronizar
          </Button>
        }
        title="Vendas"
      />

      {loading
        ? (
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: "20px" }}>
            <Skeleton variant='rounded' animation='wave' width="90%" height="10rem" />
          </div>
        )
        : (
          <CardContent>
            <Chart height={350} options={chartOptions} series={series} type="bar" width="100%" />
          </CardContent>
        )}

      <Divider />

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
        <LoadingButton loading={loadingRel} onClick={handleReport} color="inherit" endIcon={<ArrowRightIcon fontSize="var(--icon-fontSize-md)" />} size="small">
          Relatório
        </LoadingButton>
      </CardActions>
      <PdfViewer open={isPdfViewerOpen} onClose={() => setIsPdfViewerOpen(false)} pdfUrl={pdfUrl || ''} />
    </Card>
  );
}

function useChartOptions(): ApexOptions {
  const theme = useTheme();

  return {
    chart: { background: 'transparent', stacked: false, toolbar: { show: false } },
    colors: [theme.palette.primary.main, alpha(theme.palette.primary.main, 0.25)],
    dataLabels: { enabled: false },
    fill: { opacity: 1, type: 'solid' },
    grid: {
      borderColor: theme.palette.divider,
      strokeDashArray: 2,
      xaxis: { lines: { show: false } },
      yaxis: { lines: { show: true } },
    },
    legend: { show: false },
    plotOptions: { bar: { columnWidth: '40px' } },
    stroke: { colors: ['transparent'], show: true, width: 2 },
    theme: { mode: theme.palette.mode },
    xaxis: {
      axisBorder: { color: theme.palette.divider, show: true },
      axisTicks: { color: theme.palette.divider, show: true },
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      labels: { offsetY: 5, style: { colors: theme.palette.text.secondary } },
    },
    yaxis: {
      labels: {
        formatter: (value) => (value > 0 ? `${value}K` : `${value}`),
        offsetX: -10,
        style: { colors: theme.palette.text.secondary },
      },
    },
  };
}

