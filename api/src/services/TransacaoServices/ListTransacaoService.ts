import AppError from "../../errors/AppError";
import Categorias from "../../models/Categorias";
import Transacoes from "../../models/Transacoes";
import { Op } from "sequelize";


interface ListTransacaoServiceProps {
    page: number;
    limit: number;
    categoria?: string;
}

const ListTransacaoService = async (userId: string, { page, limit, categoria }: ListTransacaoServiceProps) => {
    const offset = (page - 1) * limit;

    const { rows: transacoes, count: total } = await Transacoes.findAndCountAll({
        limit,
        offset,
        order: [['createdAt', 'DESC']],
        where: { userId },
        include: [{
            model: Categorias,
            where: categoria ? { titulo: { [Op.like]: `%${categoria}%` }, userId } : undefined
        }],
    });

    return {
        transacoes,
        total,
        page,
        limit
    };
};

export default ListTransacaoService;
