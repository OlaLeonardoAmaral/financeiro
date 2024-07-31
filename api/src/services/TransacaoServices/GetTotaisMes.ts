

import AppError from "../../errors/AppError";
import { Op, Sequelize } from "sequelize";
import Transacoes from "../../models/Transacoes";



const GetTotaisMes = async (userId: string) => {
    const startOfMonth = new Date();
    startOfMonth.setDate(1);
    startOfMonth.setHours(0, 0, 0, 0);

    const endOfMonth = new Date(startOfMonth);
    endOfMonth.setMonth(endOfMonth.getMonth() + 1);

    const totals = await Transacoes.findAll({
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
        },
        group: ['tipo'],
    });

    let totalReceita = 0;
    let totalDespesa = 0;

    totals.forEach((total: any) => {
        const totalValue = parseFloat(total.dataValues.total);
        total.tipo === 'Receita'
            ? totalReceita = totalValue
            : totalDespesa = totalValue;
    });


    const saldo = totalReceita - totalDespesa;

    return {
        totalReceita: totalReceita.toFixed(2),
        totalDespesa: totalDespesa.toFixed(2),
        saldo: saldo.toFixed(2)
    };
}

export default GetTotaisMes;
