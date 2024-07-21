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
    trafficData: number[];
}

interface DashboardDataProviderProps {
    children: (data: DashboardData | undefined, loading: boolean) => React.ReactNode;
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
    const [loading, setLoading] = useState<boolean>(true);

    const fetchInitialData = async () => {
        setLoading(true);
        const result = await EstatisticasService.getTotaisMes();

        if (result instanceof ApiException) {
            alert(result.message);
        } else {
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
                    trafficData: [63, 15, 22],
                };

                setData(response);
                setLoading(false);
            }
        }
    };

    useEffect(() => {
        fetchInitialData();
    }, []);

    return <>{children(data, loading)}</>;
};
