import { Sequelize, Op } from 'sequelize';
import Transacoes from '../../models/Transacoes';

interface SerializedTotaisCadaMes {
    month: string;
    totalReceita: number;
    totalDespesa: number;
    total: number;
}

const GetTotaisCadaMes = async (): Promise<SerializedTotaisCadaMes[]> => {
    const year = new Date().getFullYear();
    const startOfYear = new Date(year, 0, 1);
    const endOfYear = new Date(year + 1, 0, 1);

    const results = await Transacoes.findAll({
        attributes: [
            [Sequelize.fn('DATE_FORMAT', Sequelize.col('data'), '%Y-%m'), 'month'],
            [
                Sequelize.literal(
                    `SUM(CASE WHEN tipo = 'Receita' THEN valor ELSE 0 END)`
                ),
                'totalReceita',
            ],
            [
                Sequelize.literal(
                    `SUM(CASE WHEN tipo = 'Despesa' THEN valor ELSE 0 END)`
                ),
                'totalDespesa',
            ],
            [
                Sequelize.literal(
                    `SUM(CASE WHEN tipo = 'Receita' THEN valor ELSE 0 END) - SUM(CASE WHEN tipo = 'Despesa' THEN valor ELSE 0 END)`
                ),
                'total',
            ],
        ],
        where: {
            data: {
                [Op.gte]: startOfYear,
                [Op.lt]: endOfYear,
            },
        },
        group: [Sequelize.fn('DATE_FORMAT', Sequelize.col('data'), '%Y-%m')],
        order: [
            [
                Sequelize.fn(
                    'DATE_FORMAT',
                    Sequelize.col('data'),
                    '%Y-%m'
                ),
                'ASC',
            ],
        ],
        raw: true, 
    });

    return results.map((result: any) => ({
        month: result.month,
        totalReceita: parseFloat(result.totalReceita) || 0,
        totalDespesa: parseFloat(result.totalDespesa) || 0,
        total: parseFloat(result.total) || 0,
    }));
};

export default GetTotaisCadaMes;
