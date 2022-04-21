import { Question } from "@prisma/client";
import { Request, Response } from "express";

export async function sendNewQuestion(req: Request, res: Response) {
  const dataQuestion: Question = req.body;

  console.log(dataQuestion);
  res.sendStatus(201);
}
