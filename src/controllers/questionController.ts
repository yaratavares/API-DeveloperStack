import { Request, Response } from "express";
import questionService from "../services/questionService.js";

interface DataQuestion {
  question: string;
  tags: string[];
}

export async function sendNewQuestion(req: Request, res: Response) {
  const { question, tags }: DataQuestion = req.body;
  const userId: number = res.locals.user;

  if (!question || !tags) {
    return res.sendStatus(422);
  }

  await questionService.createQuestionAndTags(userId, question, tags);

  res.sendStatus(201);
}

export async function sendAnswer(req: Request, res: Response) {
  const answer: string = req.body.answer;
  const userId: number = res.locals.user;
  const { id } = req.params;

  if (!answer || !id.match(/^[0-9]/)) {
    return res.sendStatus(422);
  }

  await questionService.createNewAnswer(Number(id), userId, answer);

  res.sendStatus(200);
}
