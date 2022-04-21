import { Router } from "express";
import tokenValideMiddleware from "../middlewares/tokenValidateMiddleware.js";
import * as questionController from "../controllers/questionController.js";

const questionRouter = Router();

questionRouter.post("/questions", questionController.sendNewQuestion);
questionRouter.post("/questions/:id/answers", questionController.sendAnswer);

export default questionRouter;
