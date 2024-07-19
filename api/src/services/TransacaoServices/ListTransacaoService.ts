import AppError from "../../errors/AppError";
import Categorias from "../../models/Categorias";
import Transacoes from "../../models/Transacoes";
import { Op } from "sequelize";


interface ListTransacaoServiceProps {
    page: number;
    limit: number;
    categoria?: string;
}

const ListTransacaoService = async ({ page, limit, categoria }: ListTransacaoServiceProps) => {
    const offset = (page - 1) * limit;
    
    const { rows: transacoes, count: total } = await Transacoes.findAndCountAll({
        limit,
        offset,
        order: [['createdAt', 'DESC']],
        attributes: ['id', 'data', 'tipo', 'observacao', 'valor', 'createdAt', 'updatedAt'],
        include: [{
            model: Categorias,
            attributes: ['id', 'titulo'],
            where: categoria ? { titulo: { [Op.like]: `%${categoria}%` } } : undefined
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
