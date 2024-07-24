
import User from "../../models/User";
import AppError from "../../errors/AppError";


interface SerializedUser {
    name: string;
    firstName: string;
    secondName: string;
    email: string;
    password: string;
}

const UpdateUserService = async (id: string, user: SerializedUser) => {
    const findUser = await User.findByPk(id);
    if (findUser == null) throw new AppError("Usuario não encontrado!");
    await User.update(user, { where: { id } });
    return await User.findByPk(id, {attributes: ["name", "profile", "email"]});
}

export default UpdateUserService;