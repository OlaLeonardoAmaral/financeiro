import { Router } from "express";
import isAuth from "../middleware/isAuth";
import * as UserController from "../controllers/UserController"

const router = Router();

router.get("/users", isAuth, UserController.index);
router.get("/user/:id", isAuth, UserController.show);
router.post("/user", isAuth, UserController.store);
router.put("/user/:id", isAuth, UserController.update);
router.delete("/user/:id", isAuth, UserController.remove);

export default router;
