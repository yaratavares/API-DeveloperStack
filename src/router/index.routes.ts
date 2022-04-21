import { Router } from "express";
import authRouter from "./authRouter.js";
import questionRouter from "./questionRouter.js";

const router = Router();

router.use(authRouter);
router.use(questionRouter);

export default router;
