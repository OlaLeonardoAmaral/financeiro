import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Stack from '@mui/material/Stack';
import type { SxProps } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { Receipt as ReceiptIcon } from '@phosphor-icons/react/dist/ssr/Receipt';
import { Wallet } from '@phosphor-icons/react/dist/ssr';
import Skeleton from '@mui/material/Skeleton';

export interface TotalProfitProps {
  sx?: SxProps;
  value?: string;
  loading: boolean;
}

export function TotalProfit({ value, sx, loading }: TotalProfitProps): React.JSX.Element {
  return (
    <Card sx={sx}>
      <CardContent>
        <Stack direction="row" sx={{ alignItems: 'flex-start', justifyContent: 'space-between' }} spacing={3}>
          <Stack spacing={1}>
            {loading
              ? (<>
                <Skeleton variant="text" animation="wave" width={200} height={30} />
                <Skeleton variant="text" animation="wave" width={200} height={50} />
              </>)
              : (<>
                <Typography color="text.secondary" variant="overline">
                  Total
                </Typography>
                <Typography variant="h4">{value}</Typography>
              </>)}
          </Stack>
          {loading
            ? (<Skeleton variant="circular" animation="wave" sx={{ minHeight: '50px', minWidth: '50px' }} />)
            : (
              <Avatar sx={{ backgroundColor: 'var(--mui-palette-primary-main)', height: '56px', width: '56px' }}>
                <Wallet fontSize="var(--icon-fontSize-lg)" />
              </Avatar>
            )}
        </Stack>
      </CardContent>
    </Card>
  );
}
