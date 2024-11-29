import AppError from "../../errors/AppError";
import Categorias from "../../models/Categorias";
import Transacoes from "../../models/Transacoes";
import { Op } from "sequelize";


interface ListTransacaoServiceProps {
    page: number;
    limit: number;
    categoria?: string;
}

const ListTransacaoService = async (
    userId: string,
    { page, limit, categoria, month, year }: ListTransacaoServiceProps & { month?: number; year?: number }
) => {
    const offset = (page - 1) * limit;

    const whereConditions: any = {
        userId,
    };


    if (month && year) {
        const startDate = new Date(year, month - 1, 1);
        const endDate = new Date(year, month, 0); 
        whereConditions.data = {
            [Op.between]: [startDate, endDate],
        };
    }

    const { rows: transacoes, count: total } = await Transacoes.findAndCountAll({
        limit,
        offset,
        order: [['data', 'DESC']],
        where: whereConditions,
        include: [{
            model: Categorias,
            where: categoria ? { titulo: { [Op.like]: `%${categoria}%` }, userId } : undefined,
        }],
    });

    return {
        transacoes,
        total,
        page,
        limit,
    };
};

export default ListTransacaoService;
