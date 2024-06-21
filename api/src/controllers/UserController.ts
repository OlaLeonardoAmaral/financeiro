
import { Request, Response } from "express";

import CreateUserService from "../services/UserServices/CreateUserService";
import ListUsersService from "../services/UserServices/ListUsersService";
import DeleteUserService from "../services/UserServices/DeleteUserService";
import GetUserByIdService from "../services/UserServices/GetUserByIdService";
import UpdateUserService from "../services/UserServices/UpdateUserService";

import { getIO } from "../libs/socket";


type IndexQuery = {
    searchParam: string;
    pageNumber?: string;
    limit?: string | number;
};

// pageNumber e limit serão utilizados quando a paginação de usuários for criada

interface SerializedUser {
    id: Number;
    name: string;
    email: string;
    profile: string;
    password: string;
}


export const index = async (req: Request, res: Response): Promise<Response> => {
    const { searchParam } = req.query as IndexQuery;
    const users = await ListUsersService({ searchParam });
    return res.json({ users });
};

export const store = async (req: Request, res: Response): Promise<Response> => {
    const { name, email, profile, password } = req.body as SerializedUser;
    const user = await CreateUserService({ name, profile, email, password });
    return res.status(200).json(user);
}

export const show = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;
    const user = await GetUserByIdService(Number(id));
    return res.json(user);
}

export const update = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;
    const { name, email, profile, password } = req.body as SerializedUser;
    const user = await UpdateUserService(Number(id), { name, profile, email, password });
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