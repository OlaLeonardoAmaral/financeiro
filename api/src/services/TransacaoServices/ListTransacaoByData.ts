
import { Op } from "sequelize";
import Categorias from "../../models/Categorias";
import Transacoes from "../../models/Transacoes";
import { parse, endOfDay } from "date-fns";


const ListTransacaoByDataService = async (userId: string, startDate: string, endDate: string) => {
    const start = parse(startDate, 'dd/MM/yyyy', new Date());
    const end = endOfDay(parse(endDate, 'dd/MM/yyyy', new Date()));

    const transacoes = await Transacoes.findAll({
        where: {
            userId,
            data: {
                [Op.gte]: start,
                [Op.lte]: end
            },
        },
        order: [['data', 'DESC']],
        include: [{ model: Categorias }],
    })

    return transacoes;
};

export default ListTransacaoByDataService;
