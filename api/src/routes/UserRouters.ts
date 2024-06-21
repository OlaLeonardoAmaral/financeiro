import { Router } from "express";
import isAuth from "../middleware/isAuth";

import * as UserController from "../controllers/UserController"

const router = Router();

// Buscar usuarios
router.get("/users", isAuth, UserController.index);

// Criar usuario "/user/register"
router.post("/user", isAuth, UserController.store);


// logar usuario
// router.post("/user/login", isAuth, UserController.userLogin);

router.delete("/user/:id", isAuth, UserController.remove);

router.get("/user/:id", isAuth, UserController.show);

router.put("/user/:id", isAuth, UserController.update);

export default router;
