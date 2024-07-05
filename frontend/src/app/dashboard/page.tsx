// app/dashboard/page.tsx
'use client';

import * as React from 'react';
import Grid from '@mui/material/Unstable_Grid2';

import { Budget } from '@/components/dashboard/overview/budget';
import { TotalCustomers } from '@/components/dashboard/overview/total-customers';
import { TotalProfit } from '@/components/dashboard/overview/total-profit';
import { Sales } from '@/components/dashboard/overview/sales';
import { Traffic } from '@/components/dashboard/overview/traffic';
import { DashboardDataProvider } from './dashboardDataProvider';

export default function Page(): React.JSX.Element {
  return (
    <DashboardDataProvider>
      {(data) => data ? (
        <Grid container spacing={12} columns={9}>
          <Grid lg={3} sm={6} xs={12}>
            <Budget diff={12} trend="up" sx={{ height: '100%' }} value={data.budget} />
          </Grid>
          
          <Grid lg={3} sm={6} xs={12}>
            <TotalCustomers diff={16} trend="down" sx={{ height: '100%' }} value={data.totalCustomers} />
          </Grid>

          <Grid lg={3} sm={6} xs={12}>
            <TotalProfit sx={{ height: '100%' }} value={data.totalProfit} />
          </Grid>

          <Grid lg={8} xs={12} sx={{
            '@media (min-width: 1200px)': {
              width: 'calc(100% * 5 / var(--Grid-columns))',
            },
          }}>
            <Sales
              chartSeries={data.salesData}
              sx={{ height: '100%' }}
            />
          </Grid>

          <Grid lg={4} md={6} xs={12}>
            <Traffic chartSeries={data.trafficData} labels={['Protesto', 'Registro de imovel', 'Notas']} sx={{ height: '100%' }} />
          </Grid>
        </Grid>
      ) : null}
    </DashboardDataProvider>
  );
}
