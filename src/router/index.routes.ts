import { Router } from "express";
import tokenValideMiddleware from "../middlewares/tokenValidateMiddleware.js";
import authRouter from "./authRouter.js";
import questionRouter from "./questionRouter.js";

const router = Router();

router.use(authRouter);
router.use(tokenValideMiddleware, questionRouter);

export default router;
