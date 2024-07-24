

import AppError from "../../errors/AppError";
import User from "../../models/User";
import AuthUserService from "./AuthUserService";


interface SerializedUser {
    name: string;
    firstName: string;
    secondName: string;
    email: string;
    password: string;
}

const SignUpUserService = async (user: SerializedUser) => {

    try {
        const { email } = await User.create(user);

        const { serializedUser, token, refreshToken } = await AuthUserService({
            email,
            password: user.password
        });

        return { token, user: serializedUser };
    } catch (err: any) {
        console.log(err);
        throw new AppError("Sign Up error", 403);
    }
}

export default SignUpUserService;
