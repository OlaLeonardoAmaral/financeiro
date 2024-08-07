import { Router } from "express";
import isAuth from "../middleware/isAuth";

import { printReport } from "../controllers/ReportController";
const router = Router();

router.get("/printrepo", isAuth, printReport);


export default router;
