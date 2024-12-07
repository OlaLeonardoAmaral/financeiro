
import { Router } from "express";
import isAuth from "../middleware/isAuth";

import * as ParcelaController from "../controllers/ParcelaController";

const router = Router();



router.put("/update/parcela/:id", isAuth, ParcelaController.updateParcela);
router.delete("/remove/parcela/:id", isAuth, ParcelaController.deleteParcela);

export default router;