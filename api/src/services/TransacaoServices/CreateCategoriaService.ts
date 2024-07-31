

import AppError from "../../errors/AppError";
import Categorias from "../../models/Categorias";


interface SerializedCategoria { // isso aqui pode ser um DTO
    titulo: string;
    userId: string;
}

const CreateCategoriaService = async (categoria: SerializedCategoria) => {
    try {
        const { id, titulo, userId } = await Categorias.create(categoria);
        return { id, titulo, userId };
    } catch (err: any) {
        console.log(err);
        throw new AppError("Create categoria error", 403);
    }
}

export default CreateCategoriaService;
