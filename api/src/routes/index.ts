import { Router } from "express";
import authRoutes from "./AuthRoutes";
import userRouters from "./UserRouters";
import transacoesRouters from "./TransacoesRoutes";

const routers = Router();

// routers.use("/auth", authRoutes);
// routers.use(userRouters);
routers.use("/transacoes", transacoesRouters);


export default routers;


