// app/dashboard/page.tsx
'use client';

import * as React from 'react';
import Grid from '@mui/material/Unstable_Grid2';

import { Budget } from '@/components/dashboard/overview/budget';
import { TotalCustomers } from '@/components/dashboard/overview/total-customers';
import { TotalProfit } from '@/components/dashboard/overview/total-profit';
import { DashboardDataProvider } from './dashboardDataProvider';
import { Report } from '@/components/dashboard/overview/report';

export default function Page(): React.JSX.Element {
  return (
    <DashboardDataProvider>
      {(data, loading) => (
        <Grid container spacing={8} columns={5}>

          <Grid lg={3} sm={6} xs={8}>
            <Budget trend="up" sx={{ height: '100%' }} value={data?.budget || ''} loading={loading} />
          </Grid>

          <Grid lg={3} sm={6} xs={8}>
            <TotalCustomers trend="down" sx={{ height: '100%' }} value={data?.totalCustomers || ''} loading={loading} />
          </Grid>

          <Grid lg={3} sm={6} xs={8}>
            <TotalProfit sx={{ height: '100%' }} value={data?.totalProfit} loading={loading} />
          </Grid>

          <Grid lg={9} md={6} xs={12} >
            <Report />
          </Grid>
        </Grid>
      )}
    </DashboardDataProvider>
  );
}
