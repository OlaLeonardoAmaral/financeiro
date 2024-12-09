import AppError from "../../errors/AppError";
import { Op, Sequelize } from "sequelize";
import Transacoes from "../../models/Transacoes";
import Parcelas from "../../models/Parcelas";

const GetTotaisMes = async (userId: string) => {
    const startOfMonth = new Date();
    startOfMonth.setDate(1);
    startOfMonth.setHours(0, 0, 0, 0);

    const endOfMonth = new Date(startOfMonth);
    endOfMonth.setMonth(endOfMonth.getMonth() + 1);

    // Busca as transações pagas
    const transacaoTotals = await Transacoes.findAll({
        attributes: [
            [Sequelize.fn('SUM', Sequelize.col('valor')), 'total'],
            'tipo',
        ],
        where: {
            userId,
            data: {
                [Op.gte]: startOfMonth,
                [Op.lte]: endOfMonth,
            },
            foiRecebida: true,
        },
        group: ['tipo'],
    });

    // Busca as parcelas pagas
    const parcelaTotals = await Parcelas.findAll({
        attributes: [
            [Sequelize.fn('SUM', Sequelize.col('valor')), 'total'],
            'tipo',
        ],
        where: {
            userId,
            data: {
                [Op.gte]: startOfMonth,
                [Op.lte]: endOfMonth,
            },
            foiRecebida: true,
        },
        group: ['tipo'],
    });

    let totalReceita = 0;
    let totalDespesa = 0;

    const combineTotals = (totals: any[]) => {
        totals.forEach((total: any) => {
            const totalValue = parseFloat(total.dataValues.total);
            if (total.tipo === 'Receita') {
                totalReceita += totalValue;
            } else {
                totalDespesa += totalValue;
            }
        });
    };

    combineTotals(transacaoTotals);
    combineTotals(parcelaTotals);

    const saldo = totalReceita - totalDespesa;

    return {
        totalReceita: totalReceita.toFixed(2),
        totalDespesa: totalDespesa.toFixed(2),
        saldo: saldo.toFixed(2),
    };
};

export default GetTotaisMes;