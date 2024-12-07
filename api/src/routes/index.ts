import { Router } from "express";
import authRoutes from "./AuthRoutes";
import userRouters from "./UserRouters";
import transacoesRouters from "./TransacoesRoutes";
import parcelasRoutes from "./ParcelasRoutes";
import reportRouters from "./ReportRoutes";


const routers = Router();

routers.use("/auth", authRoutes);
routers.use(userRouters);
routers.use("/transacoes", transacoesRouters);
routers.use("/transacoes", parcelasRoutes);
routers.use(reportRouters);


export default routers;


