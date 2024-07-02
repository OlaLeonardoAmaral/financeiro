import AppError from "../../errors/AppError";
import Categorias from "../../models/Categorias";
import Transacoes from "../../models/Transacoes";

interface ListTransacaoServiceProps {
    page: number;
    limit: number;
}

const ListTransacaoService = async ({ page, limit }: ListTransacaoServiceProps) => {

    const offset = (page - 1) * limit;

    const { rows: transacoes, count: total } = await Transacoes.findAndCountAll({
        limit,
        offset,
        order: [['createdAt', 'DESC']],
        attributes: ['id', 'tipo', 'observacao', 'valor', 'createdAt', 'updatedAt'],
        include: [{
            model: Categorias,
            attributes: ['id', 'titulo']
        }]
    });
   
    return {
        transacoes,
        total,
        page,
        limit
    };
};

export default ListTransacaoService;
