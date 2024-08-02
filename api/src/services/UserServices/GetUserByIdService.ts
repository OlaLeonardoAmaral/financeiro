

import AppError from "../../errors/AppError";
import User from "../../models/User";

const GetUserByIdService = async (id: string) => {
    const user = await User.findByPk(id);

    if (user == null) throw new AppError("Usuario não encontrado!");
    return user;
}

export default GetUserByIdService;