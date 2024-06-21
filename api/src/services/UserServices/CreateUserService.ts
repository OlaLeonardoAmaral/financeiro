

import AppError from "../../errors/AppError";
import User from "../../models/User";


interface SerializedUser {
    name: string;
    profile: string;
    email: string;
    password: string;
}

const CreateUserService = async (user: SerializedUser) => {
    try {
        const { name, email, profile, passwordHash } = await User.create(user);
        return { name, email, profile, passwordHash };
    } catch (err: any) {
        console.log(err);
        throw new AppError("Create error", 403);
    }
}

export default CreateUserService;
