

import AppError from "../../errors/AppError";
import Categorias from "../../models/Categorias";

const ListCategoriaService = async (userId: string) => {
    try {
        const categorias = await Categorias.findAll({
            where: { userId }
        });
        return categorias;
    } catch (err: any) {
        console.log(err);
        throw new AppError("find all error", 403);
    }
}

export default ListCategoriaService;
