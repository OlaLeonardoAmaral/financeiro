import { Sequelize, Op } from "sequelize";
import User from "../../models/User";

interface Request {
    searchParam?: string;
}

const ListUsersService = async ({ searchParam = "", }: Request): Promise<User[]> => {

    let whereCondition = {
        [Op.or]: [
            {
                "$User.name$": Sequelize.where(
                    Sequelize.fn("LOWER", Sequelize.col("User.name")),
                    "LIKE",
                    `%${searchParam.toLowerCase()}%`
                )
            },
            { email: { [Op.like]: `%${searchParam.toLowerCase()}%` } }
        ]
    };


    return await User.findAll({
        where: whereCondition,
        order: [["createdAt", "DESC"]],
    });
}

export default ListUsersService;