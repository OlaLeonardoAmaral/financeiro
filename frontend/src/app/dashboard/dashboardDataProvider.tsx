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
        return numeral(num).format('0.00');
    }
};

export const DashboardDataProvider: React.FC<DashboardDataProviderProps> = ({ children }) => {
    const [data, setData] = useState<DashboardData | undefined>(undefined);

    const fetchInitialData = async () => {
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

            const salesData = [
                {
                    name: 'This year',
                    data,
                },
                { name: 'Last year', data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] },
            ];

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
                    salesData,
                    trafficData: [63, 15, 22],
                };

                setData(response);
            }
        }
    };

    useEffect(() => {
        fetchInitialData();
    }, []);

    return <>{children(data)}</>;
};
