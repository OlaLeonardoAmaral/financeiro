// components/DashboardDataProvider.tsx
'use client';

import { ApiException } from '@/services/api/ApiException';
import { EstatisticasService } from '@/services/api/estatisticas/EstatisticasService';
import * as React from 'react';
import { useState, useEffect } from 'react';
var numeral = require('numeral');

interface DashboardData {
    budget: string;
    totalCustomers: string;
    totalProfit: string;
    salesData: { name: string; data: number[] }[];
    trafficData: number[];
}

interface DashboardDataProviderProps {
    children: (data: DashboardData | undefined) => React.ReactNode;
}

const formatNumber = (num: number): string => {
    if (num >= 1000) {
        return numeral(num).format('0,0.00');
    } else {
        return numeral(num).format('R$0.0');
    }
};


export const DashboardDataProvider: React.FC<DashboardDataProviderProps> = ({ children }) => {
    const [data, setData] = useState<DashboardData | undefined>(undefined);


    useEffect(() => {

        const fetchData = async () => {

            const result = await EstatisticasService.getTotaisMes();


            if (result instanceof ApiException) {
                alert(result.message);
            } else {

                const totalReceitaMes = formatNumber(Number(result.totalReceita));
                const totalDespesaMes = formatNumber(Number(result.totalDespesa));
                const saldoMes = formatNumber(Number(result.saldo));
               
                const response = {
                    budget: `R$ ${totalReceitaMes}`,
                    totalCustomers: `R$ ${totalDespesaMes}`,
                    totalProfit: `R$ ${saldoMes}`,
                    salesData: [
                        { name: 'This year', data: [18, 16, 5, 8, 3, 14, 14, 16, 17, 19, 18, 20] },
                        { name: 'Last year', data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] },
                    ],
                    trafficData: [63, 15, 22],
                };

                setData(response);
            }
        };

        fetchData();
    }, []);

    return (
        <>
            {children(data)}
        </>
    );
};
