import { Router } from "express";
import isAuth from "../middleware/isAuth";

import * as TransacaoController from "../controllers/TransacaoController";

const router = Router();

router.get("/categoria", TransacaoController.findAllCategoria);
router.get("/list", TransacaoController.listTransacao);
router.get("/list/:id", TransacaoController.getTransacaoById);
router.get("/totaismes", TransacaoController.getTotalisMes);
router.post("/categoria/add", TransacaoController.createCategoria);
router.post("/add", TransacaoController.createTransacao);
router.put("/update/:id", TransacaoController.updateTransacao);
router.delete("/remove/:id", TransacaoController.deleteTransacao);

export default router;
