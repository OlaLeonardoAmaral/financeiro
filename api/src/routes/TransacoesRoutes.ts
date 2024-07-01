import { Router } from "express";
import isAuth from "../middleware/isAuth";

import * as TransacaoController from "../controllers/TransacaoController";

const router = Router();

router.post("/categoria/add", TransacaoController.store);

export default router;
