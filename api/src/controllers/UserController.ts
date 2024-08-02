
import { Request, Response } from "express";

import CreateUserService from "../services/UserServices/CreateUserService";
import ListUsersService from "../services/UserServices/ListUsersService";
import DeleteUserService from "../services/UserServices/DeleteUserService";
import GetUserByIdService from "../services/UserServices/GetUserByIdService";
import UpdateUserService from "../services/UserServices/UpdateUserService";

import { getIO } from "../libs/socket";
import SignUpUserService from "../services/UserServices/SignUpUserService";


type IndexQuery = {
    searchParam: string;
    pageNumber?: string;
    limit?: string | number;
};

interface SerializedUser {
    id: string;
    name: string;
    email: string;
    firstName: string;
    secondName: string;
    password: string;
}


export const index = async (req: Request, res: Response): Promise<Response> => {
    const { searchParam } = req.query as IndexQuery;
    const users = await ListUsersService({ searchParam });
    return res.json({ users });
};

export const store = async (req: Request, res: Response): Promise<Response> => {
    const { name, email, firstName, secondName, password } = req.body as SerializedUser;
    const user = await SignUpUserService({ name, firstName, secondName, email, password });
    return res.status(200).json(user);
}

export const show = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;
    const user = await GetUserByIdService(id);
    const { name, email, firstName, secondName } = user;
    return res.json({user: {id, name, email, firstName, secondName }});
}

export const update = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;
    const { name, email, firstName, secondName, password } = req.body as SerializedUser;
    const user = await UpdateUserService(id, { name, email, firstName, secondName, password });
    const io = getIO();
    io.emit("user", { action: "update", user });
    return res.json(user);
}


export const remove = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;
    await DeleteUserService(Number(id));
    const io = getIO();
    io.emit("user", { action: "delete", id });
    return res.status(200).json({ message: "User deleted" });
}