import { Router } from "express";
import tokenValideMiddleware from "../middlewares/tokenValidateMiddleware.js";
import * as questionController from "../controllers/questionController.js";

const questionRouter = Router();

questionRouter.post(
  "/questions",
  tokenValideMiddleware,
  questionController.sendNewQuestion
);

export default questionRouter;
