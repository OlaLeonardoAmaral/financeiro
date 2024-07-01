

import AppError from "../../errors/AppError";
import Categorias from "../../models/Categorias";


interface SerializedCategoria { // isso aqui pode ser um DTO
    titulo: string;
}

const CreateCategoriaService = async (categoria: SerializedCategoria) => {
    try {
        const { titulo } = await Categorias.create(categoria);
        return {titulo };
    } catch (err: any) {
        console.log(err);
        throw new AppError("Create error", 403);
    }
}

export default CreateCategoriaService;
