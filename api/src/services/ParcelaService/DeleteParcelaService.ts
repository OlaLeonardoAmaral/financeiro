

import AppError from "../../errors/AppError";
import Parcelas from "../../models/Parcelas";



const DeleteParcelaService = async (id: string, userId: string) => {
    const parcela = await Parcelas.findOne({ where: { id, userId } });
    if (!parcela) throw new AppError('Parcela não encontrada!');
    Parcelas.destroy({ where: { id, userId } });
}

export default DeleteParcelaService;
