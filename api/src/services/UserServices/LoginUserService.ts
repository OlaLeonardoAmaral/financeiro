
import User from "../../models/User";
import AppError from "../../errors/AppError";
require('dotenv').config();
import jwt from 'jsonwebtoken';


interface SerializedUser {
    email: string;
    password: string;
}

const LoginUserService = async (user: SerializedUser) => {
    const email = user.email;
    const password = user.password;
    const secret = process.env.SECRET;

    const userExist = await User.findOne({ where: { email } })
    if (userExist === null) throw new AppError("Usuário ou senha incorreta", 404);

    const checkPassword = await userExist.checkPassword(password);
    if (!checkPassword) throw new AppError("Usuário ou senha incorreta", 403);

    const token = jwt.sign(
        {
            id: userExist.id,
        },
        String(secret),
        {
            noTimestamp: true
        }
    )
    return { accessToken: token, user: user }
}

export default LoginUserService;