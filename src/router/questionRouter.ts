import { Router } from "express";
import * as questionController from "../controllers/questionController.js";

const questionRouter = Router();

questionRouter.post("/questions", questionController.sendNewQuestion);
questionRouter.post("/questions/:id/answers", questionController.sendAnswer);
questionRouter.get("/questions/:id", questionController.selectOneQuestion);
questionRouter.get("/questions/", questionController.selectAllQuestions);

export default questionRouter;
