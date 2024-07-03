

import AppError from "../../errors/AppError";
import Categorias from "../../models/Categorias";

const ListCategoriaService = async () => {
    try {
        const categorias = await Categorias.findAll({
            attributes: ['id', 'titulo']
        });
        return categorias;
    } catch (err: any) {
        console.log(err);
        throw new AppError("find all error", 403);
    }
}

export default ListCategoriaService;
