

import AppError from "../../errors/AppError";
import User from "../../models/User";


interface SerializedUser {
    name: string;
    firstName: string;
    secondName: string;
    email: string;
    password: string;
}

const CreateUserService = async (user: SerializedUser) => {
    try {
        const { name, email, firstName, secondName, passwordHash } = await User.create(user);
        return { name, email,  firstName, secondName, passwordHash };
    } catch (err: any) {
        console.log(err);
        throw new AppError("Create error", 403);
    }
}

export default CreateUserService;
