import { Router } from "express";
import isAuth from "../middleware/isAuth";

import * as TransacaoController from "../controllers/TransacaoController";

const router = Router();

router.get("/categoria", isAuth, TransacaoController.findAllCategoria);
router.get("/list", isAuth, TransacaoController.listTransacao);
router.get("/list/:id", isAuth, TransacaoController.getTransacaoById);
router.get("/totaismes", isAuth, TransacaoController.getTotaisMes);
router.get("/totaiscadames", isAuth, TransacaoController.getTotaisCadaMes);

router.post("/categoria/add", isAuth, TransacaoController.createCategoria);
router.post("/add", isAuth, TransacaoController.createTransacao);

router.put("/update/:id", isAuth, TransacaoController.updateTransacao);

router.delete("/remove/:id", isAuth, TransacaoController.deleteTransacao);

export default router;
