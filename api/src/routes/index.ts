import { Router } from "express";
import authRoutes from "./AuthRoutes";
import userRouters from "./UserRouters";

const routers = Router();

routers.use("/auth", authRoutes);
routers.use(userRouters);

export default routers;


