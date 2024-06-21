

import AppError from "../../errors/AppError";
import User from "../../models/User";

const DeleteUserService = async (id : number) => {
    const user = await User.findByPk(id);
    if(!user) throw new AppError('Usuario não encontrado!');
    User.destroy({ where: { id } })
}
export default DeleteUserService;