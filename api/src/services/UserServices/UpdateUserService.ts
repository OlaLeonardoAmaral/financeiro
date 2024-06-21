
import User from "../../models/User";
import AppError from "../../errors/AppError";


interface SerializedUser {
    name: string;
    profile: string;
    email: string;
    password: string;
}

const UpdateUserService = async (id: number, user: SerializedUser) => {
    const findUser = await User.findByPk(id);
    if (findUser == null) throw new AppError("Usuario não encontrado!");
    await User.update(user, { where: { id } });
    return await User.findByPk(id, {attributes: ["name", "profile", "email"]});
}

export default UpdateUserService;