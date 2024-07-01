
import { Request, Response } from "express";

import CreateCategoriaService from "../services/TransacaoServices/CreateCategoriaService";

interface SerializedCategoria {
    titulo: string;
}

export const store = async (req: Request, res: Response): Promise<Response> => {
    const { titulo } = req.body as SerializedCategoria;
    const categoria = await CreateCategoriaService({ titulo });
    return res.status(200).json(categoria);
}
